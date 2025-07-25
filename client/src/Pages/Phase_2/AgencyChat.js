import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchMessages, sendMessage, clearMessages, GetSession, ReadMessages } from '../../slice/AgencyChatSlice';
import { getSocket, disconnectSocket } from '../../socket';
import { FiDollarSign, FiFileText } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import MatchmakingForm from './MatchMakingForm';
import  { PaymentRequestModal } from '../../Components/Phase_2/paymentModal';

const AgencyChat = ({ isAdmin, agencyId, userId, disableSend }) => {
  const dispatch = useDispatch();
  const { sessions, messages } = useSelector((state) => state.chat);
  const { user } = useAuth()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [requestingDetails, setRequestingDetails] = useState(false);
  const messagesEndRef = useRef(null); // ✅ ref to scroll into view
  const [showModal, setShowModal] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const[requestingPayment,setRequestingPayment]=useState(false)
  const[paymentConfirmation,setPaymentConfirmation]=useState(false)
  useEffect(() => {
    if (agencyId && user?.id && user?.role === 'user') {
      dispatch(GetSession({ agencyId, userId: user.id }))
        .unwrap()
        .then((session) => {
          setSelectedSession(session); // ✅ Auto-select
        });
    } else if (agencyId && userId && user?.role === 'agency') {
      dispatch(GetSession({ agencyId, userId }))
        .unwrap()
        .then((session) => {
          setSelectedSession(session); // ✅ Auto-select
        });
    }
  }, [agencyId, user]);
  useEffect(() => {
    dispatch(ReadMessages({ sessionId: selectedSession?._id, reader: user?.role }))
      .unwrap()
      .then((session) => {
        // setCandidates(session);
        setLoading(false); // ✅ update loading
      })
      .catch((err) => {
        setError("Failed to fetch sessions");
        setLoading(false); // ✅ also update on error
      });

  }, [dispatch]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Setup socket
  useEffect(() => {
    if (!selectedSession) return;

    const s = getSocket();
    setSocket(s);

    s.emit('joinSession', { sessionId: selectedSession._id }); // ✅ Join new session
    dispatch(fetchMessages({ sessionId: selectedSession._id }));

    s.on('newMessage', (msg) => {
      if (msg.sessionId === selectedSession._id) {
        dispatch(fetchMessages({ sessionId: selectedSession._id }));
      }
    });

    return () => {
      disconnectSocket();
      dispatch(clearMessages());
    };
  }, [selectedSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = async (e) => {
    e.preventDefault();
    // if (!chatInput|| !selectedSession) return;
    const payload = {
      sessionId: selectedSession?._id || '',
      sender: user?.role,
      type: 'text',
      text: chatInput,
    };
    await dispatch(sendMessage(payload));
    setChatInput('');
  };

  const handleRequestDetails = async () => {
    if (user?.role === 'agency') {
      setRequestingDetails(true);

      
        const payload = {
          sessionId: selectedSession._id,
          sender: 'agency',
          type: 'requestForm',
          text: 'Please fill out the matchmaking form.'
        };
        await dispatch(sendMessage(payload));
      

      setTimeout(() => setRequestingDetails(false), 1000);
    }
  };


  const handleRequestPayment = async (paymentDetails) => {
    setRequestingPayment(true);

    const paymentMessage = `Payment Request: ${paymentDetails.currency}${paymentDetails.amount} for "${paymentDetails.description}" Matchmaking Process ` +
      (paymentDetails.dueDate ? ` (Due by ${new Date(paymentDetails.dueDate).toLocaleDateString()})
      After sending payment You need to share confirmation message
      ` : '');

    const payload = {
      sessionId: selectedSession._id,
      sender: 'agency',
      type: 'paymentRequest',
      text: paymentMessage,
      formData: {
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        description: paymentDetails.description,
        dueDate: paymentDetails.dueDate,
        status: 'pending'
      }
    };

    try {
      await dispatch(sendMessage(payload));
      setShowPayment(false);
    } catch (error) {
      console.error('Failed to send payment request:', error);
    } finally {
      setRequestingPayment(false);
    }
  };


  return (
    <div className="p-0 md:p-4 w-full md:gap-6">
      {/* Chat area */}
      <div className="w-full dark:bg-gray-800 bg-white rounded-3xl shadow h-full">
        <div className="px-6 py-4 border-b border-marriagePink/30 flex items-center gap-3 sticky top-0 z-10 rounded-t-3xl">
          {selectedSession && (
            <>
              <div className="min-w-0 flex flex-col">
                <div className="font-bold text-white truncate text-lg">
                  {selectedSession.userId?.name || 'Anonymous User'}
                </div>
                <div className="text-xs text-white/80 truncate"> {selectedSession.userId?.email}</div>
              </div>
              {(user.role === 'user' ) &&
                (<button
                  className="ml-auto p-2 rounded-full bg-white text-green-600 hover:bg-green-100 transition shadow"
                  title="Payment Confirmation"
                  disabled={paymentConfirmation}
                  onClick={() => setPaymentConfirmation(true)}
                >
                  <FiDollarSign className="text-xl" />
                </button>)}
              {(user.role === 'agency' ) &&
                (<button
                  className="ml-auto p-2 rounded-full bg-white text-green-600 hover:bg-green-100 transition shadow"
                  title="Request Payment"
                  disabled={requestingPayment}
                  onClick={() => setShowPayment(true)}
                >
                  <FiDollarSign className="text-xl" />
                </button>)}
              {(user.role === 'agency') && (<button
                className=" p-2 rounded-full bg-white text-marriageHotPink hover:bg-marriagePink hover:text-white transition shadow"
                title="Request Form"
                disabled={requestingDetails}
                onClick={handleRequestDetails}
              >
                <FiFileText className="text-xl" />
              </button>)}
            </>
          )}
        </div>


        <div className="h-[70vh] lg:h-[60vh] overflow-y-auto px-4 py-4 custom-scrollbar">
          {selectedSession ? (
            messages.length === 0 ? (
              <div className="text-gray-400 text-center mt-8">No messages yet.</div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`mb-3 flex ${msg.sender === user?.role ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                    <div
                      className={`relative max-w-[75%] px-4 py-2 rounded-2xl shadow-lg ${msg.sender === user?.role
                        ? 'bg-marriageHotPink text-white rounded-br-none mr-2'
                        : 'bg-white text-marriageHotPink border border-marriagePink rounded-bl-none ml-2'}`}
                    >
                      <div className="whitespace-pre-line break-words text-base">
                        {msg.type === 'formResponse' ? (
                          <pre>{JSON.stringify(JSON.parse(msg.formData), null, 2)}</pre>
                        ) : msg.type === 'requestForm' ? (
                          <a onClick={() => setShowModal(true)} className='cursor-pointer text-'>{msg.text}</a>
                        ) : (
                          msg.text
                        )}
                      </div>
                      <div className="text-xs text-right mt-1 opacity-60">
                        {msg.sender === 'agency' ? 'You' : 'User'} — {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )
          ) : (
            <div className="text-gray-400 flex-1 flex items-center justify-center">Select a chat to view messages</div>
          )}
        </div>

        <form className="flex gap-2 items-end mt-auto dark:bg-gray-800 px-6 py-4 border-t border-marriagePink/30 bg-white sticky bottom-0 rounded-b-3xl">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full border-2 border-marriagePink focus:ring-2 focus:ring-marriageHotPink focus:outline-none bg-white text-marriageHotPink shadow"
            placeholder={disableSend ? 'Sending disabled' : 'Type your message...'}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={disableSend}
          />
          <button
            onClick={handleSend}
            // type="submit"
            className="px-4 py-2 rounded-full bg-marriageHotPink text-white font-bold hover:bg-marriageRed transition shadow text-lg"
            // disabled={disableSend}
            title="Send"
          >
            Send
          </button>
        </form>
        {showPayment  && <PaymentRequestModal
         onClose={() => setShowPayment(false)}
         onRequestPayment={handleRequestPayment}
         isLoading={requestingPayment}
         savedAccounts={savedAccounts}
         />}
        {(showModal && user.role==='user') && <MatchmakingForm onClose={() => setShowModal(false)} selectedSession={selectedSession} />}
      </div>
    </div>
  );
};

export default AgencyChat;


const savedAccounts = [
  {
    accountTitle: 'Khushi Shahbaz',
    accountNumber: '12345678901234',
    bankName: 'Meezan Bank',
  },
  {
    accountTitle: 'Ali Raza',
    accountNumber: '09876543211234',
    bankName: 'HBL',
  },
];
