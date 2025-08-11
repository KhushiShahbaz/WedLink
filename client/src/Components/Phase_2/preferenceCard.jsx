import React from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiHeart, FiMapPin, FiBook, FiBriefcase } from 'react-icons/fi';

const PreferenceCard = ({ preferences, onEdit }) => {
  const preferenceItems = [
    { 
      label: 'Age Range', 
      value: `${preferences?.ageRangeMin || 'Not specified'} - ${preferences?.ageRangeMax || 'Not specified'} years`,
      icon: FiHeart,
      color: 'from-pink-500 to-rose-500'
    },
    { 
      label: 'Education', 
      value: preferences?.education || 'Not specified',
      icon: FiBook,
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      label: 'Profession', 
      value: preferences?.profession || 'Not specified',
      icon: FiBriefcase,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      label: 'Location', 
      value: preferences?.location || 'Not specified',
      icon: FiMapPin,
      color: 'from-purple-500 to-violet-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-2xl transition-all duration-500"
    >
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Partner Preferences</h2>
            <p className="text-purple-100">Your ideal match criteria</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 border border-white/30"
          >
            <FiEdit2 className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preferenceItems.map(({ label, value, icon: Icon, color }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group/item flex items-center space-x-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-200 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-1">{label}</h3>
                <p className="text-gray-900 dark:text-gray-100 font-medium truncate group-hover/item:text-purple-700 transition-colors duration-300">
                  {value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        {preferences?.additionalRequirements && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border border-purple-100 dark:border-gray-600"
          >
            <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300 uppercase tracking-wide mb-2">Additional Requirements</h3>
            <p className="text-purple-700 dark:text-purple-200 leading-relaxed">{preferences.additionalRequirements}</p>
          </motion.div>
        )}

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Update Preferences
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PreferenceCard;