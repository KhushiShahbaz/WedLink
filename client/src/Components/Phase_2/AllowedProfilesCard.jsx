
import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiEye, FiShield, FiSettings, FiCheck, FiX } from 'react-icons/fi';

const AllowedProfilesCard = ({ allowedProfiles, onToggleProfile, loading }) => {
  if (!allowedProfiles || allowedProfiles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiUsers className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Allowed Profiles</h3>
        <p className="text-gray-500">No profiles have been granted access yet</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500"
    >
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <FiShield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Allowed Profiles</h2>
              <p className="text-white/80">Manage profile access permissions</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-white font-semibold">{allowedProfiles.length} Profiles</span>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-4">
          {allowedProfiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300 group/item"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                  <FiUsers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover/item:text-purple-700 transition-colors duration-300">
                    {profile.name || 'Profile'}
                  </h3>
                  <p className="text-sm text-gray-500">{profile.email || 'No email provided'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {profile.isAllowed ? (
                  <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
                    <FiCheck className="w-4 h-4" />
                    <span className="text-sm font-medium">Allowed</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
                    <FiX className="w-4 h-4" />
                    <span className="text-sm font-medium">Blocked</span>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onToggleProfile(profile.id)}
                  disabled={loading}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    profile.isAllowed
                      ? 'bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800'
                      : 'bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    profile.isAllowed ? 'Block' : 'Allow'
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200"
        >
          <div className="flex items-center space-x-3 mb-3">
            <FiSettings className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Access Control</h3>
          </div>
          <p className="text-sm text-blue-700 leading-relaxed">
            Manage which profiles can view your information. You can allow or block access for specific users at any time.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex gap-3 mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <FiCheck className="w-5 h-5" />
            <span>Allow All</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <FiX className="w-5 h-5" />
            <span>Block All</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AllowedProfilesCard;
