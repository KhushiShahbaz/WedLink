
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  fetchProfileByuserId,
  deleteProfile,
} from '../../slice/userProfile';
import { getPreferences } from '../../slice/matchMakingSlice';
import { fetchPaymentByUserId } from '../../slice/AgencyChatSlice';
import {
  FiUser, FiMail, FiPhone, FiCalendar, FiBook, FiEdit2,
  FiTrash2, FiTrendingUp, FiHeart, FiMapPin, FiBriefcase,
  FiDollarSign, FiEye, FiLock, FiUnlock, FiSettings,
  FiShield, FiCamera, FiStar, FiAward
} from 'react-icons/fi';
import defaultProfilePic from '../../assets/profile.jfif';
import { Button } from '../../Components/Layout/Button';
import PreferenceCard from '../../Components/Phase_2/preferenceCard';
import { PaymentCard } from '../../Components/Phase_2/paymentDetail';
import ConfirmationModal from '../../Components/Phase_2/ConfirmationModal';
import LoadingSpinner from '../../Components/Layout/Loading';
import PaidUsersVisibilityModal from '../../Components/Phase_2/VisibilityModal';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { 
  fetchProfileVisibility, 
  privateProfileVisibilty, 
  publicProfileVisibilty 
} from '../../slice/profileVisibilitySlice';

const ProfilePageUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  
  const [profile, setProfile] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [visibilityModalOpen, setVisibilityModalOpen] = useState(false);
  const [visibility, setVisibility] = useState('private');
  const [visibilityLoading, setVisibilityLoading] = useState(false);

  const fetchVisibility = async () => {
    try {
      const result = await dispatch(fetchProfileVisibility()).unwrap();
      if (result?.visibility) {
        setVisibility(result.visibility);
      }
    } catch (error) {
      console.error('Failed to fetch visibility:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileResult, preferencesResult, paymentResult] = await Promise.all([
          dispatch(fetchProfileByuserId(userId)).unwrap(),
          dispatch(getPreferences()).unwrap(),
          dispatch(fetchPaymentByUserId(userId)).unwrap(),
        ]);
        
        setProfile(profileResult);
        setPreferences(preferencesResult);
        setPayment(paymentResult);
        
        // Only fetch visibility if it's the current user's profile
        if (user?.id === userId || user?.userId === userId) {
          await fetchVisibility();
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, dispatch, user]);

  const handleDeleteProfile = async () => {
    try {
      await dispatch(deleteProfile()).unwrap();
      toast.success('Profile deleted successfully');
      navigate('/phase2/profile/form');
    } catch (error) {
      toast.error('Failed to delete profile');
    }
    setDeleteModalOpen(false);
  };

  const handleVisibilityUpdate = async (newVisibility) => {
    setVisibilityLoading(true);
    try {
      if (newVisibility === 'public') {
        await dispatch(publicProfileVisibilty()).unwrap();
      } else {
        await dispatch(privateProfileVisibilty()).unwrap();
      }
      setVisibility(newVisibility);
      toast.success(`Profile visibility updated to ${newVisibility}`);
      setVisibilityModalOpen(false);
    } catch (error) {
      toast.error('Failed to update visibility');
    } finally {
      setVisibilityLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md mx-4"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiUser className="w-10 h-10 text-purple-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/phase2')} className="bg-gradient-to-r from-purple-500 to-pink-500">
            Go Back Home
          </Button>
        </motion.div>
      </div>
    );
  }

  const isOwnProfile = user?.id === userId || user?.userId === userId;

  const personalInfo = [
    { label: 'Full Name', value: profile.name, icon: FiUser, color: 'from-blue-500 to-indigo-500' },
    { label: 'Age', value: profile.age ? `${profile.age} years` : 'Not specified', icon: FiCalendar, color: 'from-green-500 to-emerald-500' },
    { label: 'Education', value: profile.education || 'Not specified', icon: FiBook, color: 'from-purple-500 to-violet-500' },
    { label: 'Occupation', value: profile.occupation || 'Not specified', icon: FiBriefcase, color: 'from-orange-500 to-red-500' },
    { label: 'Income', value: profile.income || 'Not specified', icon: FiDollarSign, color: 'from-pink-500 to-rose-500' },
    { label: 'Location', value: profile.address || 'Not specified', icon: FiMapPin, color: 'from-teal-500 to-cyan-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8"
        >
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="relative flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl bg-white">
                  <img
                    src={profile.profilePicture || defaultProfilePic}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isOwnProfile && (
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg">
                    <FiCamera className="w-5 h-5 text-purple-600" />
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="text-center lg:text-left flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{profile.name}</h1>
                <p className="text-white/80 text-lg mb-4">{profile.occupation || 'Professional'}</p>
                
                {/* Status Badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
                    {visibility === 'public' ? (
                      <FiUnlock className="w-4 h-4 text-white" />
                    ) : (
                      <FiLock className="w-4 h-4 text-white" />
                    )}
                    <span className="text-white text-sm font-medium">
                      {visibility === 'public' ? 'Public Profile' : 'Private Profile'}
                    </span>
                  </div>
                  <div className="bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
                    <FiShield className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">Verified</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {isOwnProfile && (
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/phase2/profile/form`)}
                      className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-200 flex items-center space-x-2"
                    >
                      <FiEdit2 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setVisibilityModalOpen(true)}
                      className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-200 flex items-center space-x-2"
                    >
                      <FiSettings className="w-4 h-4" />
                      <span>Privacy</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                  <FiUser className="w-6 h-6" />
                  <span>Personal Information</span>
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {personalInfo.map(({ label, value, icon: Icon, color }, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{label}</h3>
                        <p className="text-gray-900 font-medium">{value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bio Section */}
                {profile.bio && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100"
                  >
                    <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center space-x-2">
                      <FiHeart className="w-5 h-5" />
                      <span>About Me</span>
                    </h3>
                    <p className="text-purple-700 leading-relaxed">{profile.bio}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Preferences Section */}
            {preferences && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <PreferenceCard 
                  preferences={preferences} 
                  onEdit={() => navigate('/phase2/match-making')}
                />
              </motion.div>
            )}
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-8">
            
            {/* Payment Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <PaymentCard payment={payment} />
            </motion.div>

            {/* Profile Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <FiTrendingUp className="w-5 h-5" />
                <span>Profile Stats</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <FiEye className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Profile Views</span>
                  </div>
                  <span className="font-bold text-blue-900">142</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <FiHeart className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Interests</span>
                  </div>
                  <span className="font-bold text-green-900">23</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <FiStar className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-800">Rating</span>
                  </div>
                  <span className="font-bold text-purple-900">4.8/5</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            {isOwnProfile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setDeleteModalOpen(true)}
                    className="w-full flex items-center space-x-3 p-4 text-left hover:bg-red-50 rounded-2xl transition-colors duration-200 group"
                  >
                    <FiTrash2 className="w-5 h-5 text-red-500 group-hover:text-red-600" />
                    <span className="font-medium text-red-600 group-hover:text-red-700">Delete Profile</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteProfile}
        title="Delete Profile"
        message="Are you sure you want to delete your profile? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />

      <PaidUsersVisibilityModal
        isOpen={visibilityModalOpen}
        onClose={() => setVisibilityModalOpen(false)}
        onUpdateVisibility={handleVisibilityUpdate}
        currentVisibility={visibility}
        loading={visibilityLoading}
      />
    </div>
  );
};

export default ProfilePageUser;
