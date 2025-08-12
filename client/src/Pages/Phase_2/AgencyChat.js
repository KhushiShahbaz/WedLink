
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  fetchMessages, 
  sendMessage, 
  clearMessages, 
  GetSession, 
  ReadMessages, 
  createPayment, 
  updatePayment, 
  fetchLatestPayment 
} from '../../slice/AgencyChatSlice';
import { getSocket, disconnectSocket } from '../../socket';
import { 
  FiDollarSign, 
  FiFileText, 
  FiSend, 
  FiPaperclip, 
  FiPhone, 
  FiVideo, 
  FiMoreVertical,
  FiUser,
  FiClock,
  FiCheck,
  FiCheckCircle
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import MatchmakingForm from './MatchMakingForm';
import { PaymentRequestModal } from '../../Components/Phase_2/paymentModal';
import { createAccount } from '../../slice/savedAccountsSlice';
import { UploadProofModal } from '../../Components/Phase_2/proofModal';
import { PaymentVerificationModal } from '../../Components/Phase_2/paymentVerificationModal';
import VideoCall from '../../Components/Phase_2/VideoCall';
import AudioCall from '../../Components/Phase_2/AudioCall';
import { toast } from 'react-toastify';

const AgencyChat = ({ candidateId, candidateName, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  
  const { messages, loading } = useSelector(state => state.agencyChat);
  
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [matchmakingModalOpen, setMatchmakingModalOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const [audioCallOpen, setAudioCallOpen] = useState(false);

  useEffect(() => {
    if (candidateId) {
      dispatch(clearMessages());
      dispatch(fetchMessages(candidateId));
      
      // Setup socket connection
      const socket = getSocket();
      if (socket) {
        socket.emit('join_room', { roomId: candidateId });
        
        socket.on('connect', () => setSocketConnected(true));
        socket.on('disconnect', () => setSocketConnected(false));
        
        socket.on('new_message', (message) => {
          dispatch(fetchMessages(candidateId));
        });
      }
    }

    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off('new_message');
        socket.off('connect');
        socket.off('disconnect');
      }
    };
  }, [candidateId, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sendingMessage) return;

    setSendingMessage(true);
    try {
      await dispatch(sendMessage({
        receiverId: candidateId,
        content: newMessage,
        messageType: 'text'
      })).unwrap();
      
      setNewMessage('');
      const socket = getSocket();
      if (socket) {
        socket.emit('send_message', {
          roomId: candidateId,
          content: newMessage,
          senderId: user.id
        });
      }
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handlePaymentRequest = async (paymentData) => {
    try {
      await dispatch(createPayment(paymentData)).unwrap();
      toast.success('Payment request sent successfully');
      setPaymentModalOpen(false);
    } catch (error) {
      toast.error('Failed to send payment request');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
      
      {/* Chat Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <FiUser className="w-6 h-6 text-white" />
              </div>
              {socketConnected && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{candidateName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {socketConnected ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setAudioCallOpen(true)}
              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-colors duration-200"
              title="Start Audio Call"
            >
              <FiPhone className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setVideoCallOpen(true)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors duration-200"
              title="Start Video Call"
            >
              <FiVideo className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors duration-200"
            >
              <FiMoreVertical className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
            >
              ×
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-4"
      >
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPaymentModalOpen(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <FiDollarSign className="w-4 h-4" />
            <span>Request Payment</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMatchmakingModalOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <FiFileText className="w-4 h-4" />
            <span>Matchmaking Form</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setProofModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <FiPaperclip className="w-4 h-4" />
            <span>Upload Proof</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
              <FiUser className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Start the conversation</h3>
            <p className="text-gray-500">Send a message to begin chatting with {candidateName}</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((message, index) => {
              const isOwn = message.senderId === user?.id;
              const showDate = index === 0 || 
                formatDate(message.createdAt) !== formatDate(messages[index - 1]?.createdAt);
              
              return (
                <div key={message._id}>
                  {/* Date Separator */}
                  {showDate && (
                    <div className="flex justify-center my-4">
                      <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                  )}
                  
                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                      isOwn 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                    }`}>
                      <p className="break-words">{message.content}</p>
                      <div className={`flex items-center justify-end space-x-1 mt-2 ${
                        isOwn ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{formatTime(message.createdAt)}</span>
                        {isOwn && (
                          <div className="flex space-x-1">
                            {message.read ? (
                              <FiCheckCircle className="w-3 h-3" />
                            ) : (
                              <FiCheck className="w-3 h-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4"
      >
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows="1"
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 p-1 text-gray-400 hover:text-purple-600 transition-colors duration-200"
              >
                <FiPaperclip className="w-5 h-5" />
              </button>
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={!newMessage.trim() || sendingMessage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {sendingMessage ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <FiSend className="w-5 h-5" />
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Modals */}
      <PaymentRequestModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSubmit={handlePaymentRequest}
        loading={false}
      />

      <UploadProofModal
        isOpen={proofModalOpen}
        onClose={() => setProofModalOpen(false)}
        onUpload={(proof) => {
          setSelectedProof(proof);
          setVerificationModalOpen(true);
        }}
      />

      <PaymentVerificationModal
        isOpen={verificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
        proof={selectedProof}
        onVerify={() => {
          setVerificationModalOpen(false);
          setProofModalOpen(false);
        }}
      />

      {matchmakingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <MatchmakingForm onClose={() => setMatchmakingModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Video Call Component */}
      <VideoCall
        isOpen={videoCallOpen}
        onClose={() => setVideoCallOpen(false)}
        recipientId={candidateId}
        recipientName={candidateName}
        isInitiator={true}
      />

      {/* Audio Call Component */}
      <AudioCall
        isOpen={audioCallOpen}
        onClose={() => setAudioCallOpen(false)}
        recipientId={candidateId}
        recipientName={candidateName}
        isInitiator={true}
      />
    </div>
  );
};

export default AgencyChat;
