
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiX, FiMapPin, FiPhone, FiMail, FiClock, FiUsers, FiStar, FiMessageCircle, FiShield, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

import { fetchAgencyById } from '../../slice/agencySlice';
import { fetchSessions } from '../../slice/AgencyChatSlice';
import AgencyChat from './AgencyChat';
import { useAuth } from '../../context/AuthContext';
import AllowedProfiles from '../../Components/Phase_2/AllowedProfilesCard';

const AgencyDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const result = await dispatch(fetchAgencyById(id));
        const agencyData = result.payload?.data;

        if (result.payload?.message?.includes('Profile not found') || !agencyData) {
          setError('Agency profile not found');
          return;
        }

        setAgency(agencyData);

        if (agencyData.userId) {
          try {
            const sessions = await dispatch(fetchSessions({ role: 'user', id: user?.id })).unwrap();
            setUnreadCount(sessions[0]?.unreadCount || 0);
          } catch {
            setError("Failed to fetch sessions");
          }
        }
      } catch (err) {
        setError(err?.message || 'Failed to load agency profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id, dispatch]);

  const toggleChat = () => {
    if (!showChat && unreadCount > 0) setUnreadCount(0);
    setShowChat(!showChat);
  };

  const getVerificationBadge = () => {
    if (!agency?.isVerified) return null;
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="flex items-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-lg"
      >
        <FiShield className="w-5 h-5 mr-2" />
        <span className="font-semibold">Verified Agency</span>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading agency profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center max-w-md mx-4"
        >
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Oops!</h2>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </motion.div>
      </div>
    );
  }

  if (!agency) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center max-w-md mx-4"
        >
          <div className="text-gray-400 text-6xl mb-4">🏢</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Agency Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300">The requested agency profile does not exist</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Cover Image */}
          <div className="relative h-80 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-40"></div>
            
            {/* Agency Logo */}
            <div className="absolute -bottom-16 left-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-700 bg-white dark:bg-gray-700 shadow-2xl overflow-hidden"
              >
                <img
                  src={agency.images?.[0] ? `http://localhost:5000/${agency.images[0]}` : 'https://via.placeholder.com/150'}
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                  className="w-full h-full object-cover"
                  alt={`${agency.name} logo`}
                />
              </motion.div>
            </div>

            {/* Verification Badge */}
            <div className="absolute top-6 right-6">
              {getVerificationBadge()}
            </div>
          </div>

          {/* Agency Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
              <div className="mb-6 lg:mb-0">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-bold text-gray-900 dark:text-white mb-3"
                >
                  {agency.name}
                </motion.h1>
                
                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300 mb-4">
                  <div className="flex items-center">
                    <FiMapPin className="w-5 h-5 mr-2 text-purple-500" />
                    <span>{agency.address?.city}, {agency.address?.country}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="w-5 h-5 mr-2 text-purple-500" />
                    <span>{agency.yearOfExp}+ years experience</span>
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="w-5 h-5 mr-2 text-purple-500" />
                    <span>500+ successful matches</span>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-6">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-600 dark:text-gray-300 font-semibold">4.9 (127 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleChat}
                  className="relative flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
                >
                  <FiMessageCircle className="w-5 h-5 mr-2" />
                  Start Conversation
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <FiPhone className="w-5 h-5 mr-2" />
                  Contact
                </motion.button>
              </div>
            </div>

            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About Us</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {agency.description || agency.profile || 'No description available'}
              </p>
            </motion.div>

            {/* Contact Info Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiPhone className="w-5 h-5 mr-2 text-purple-500" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <FiPhone className="w-4 h-4 mr-3" />
                    <span>{agency.contactNo || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <FiMail className="w-4 h-4 mr-3" />
                    <span>{agency.email || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <FiClock className="w-4 h-4 mr-3" />
                    <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FiMapPin className="w-5 h-5 mr-2 text-purple-500" />
                  Location
                </h3>
                <div className="text-gray-600 dark:text-gray-300 space-y-1">
                  <p>{agency.address?.street}</p>
                  <p>{agency.address?.city}, {agency.address?.state}</p>
                  <p>{agency.address?.country} - {agency.address?.zipCode}</p>
                </div>
              </div>
            </motion.div>

            {/* Gallery Section */}
            {agency.images?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {agency.images.map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="group relative rounded-2xl overflow-hidden h-64 bg-gray-100 dark:bg-gray-700 cursor-pointer"
                    >
                      <img
                        src={`http://localhost:5000/${img}`}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Allowed Profiles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <AllowedProfiles agencyId={agency.userId} />
        </motion.div>

        {/* Chat Modal */}
        {showChat && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Chat with {agency.name}</h3>
                <button
                  onClick={toggleChat}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                >
                  <FiX className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <AgencyChat agencyUserId={agency.userId} onClose={toggleChat} />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencyDetail;
