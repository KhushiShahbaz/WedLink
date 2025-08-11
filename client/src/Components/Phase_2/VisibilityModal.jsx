import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiEye, FiEyeOff, FiUsers, FiLock, FiUnlock } from 'react-icons/fi';

const PaidUsersVisibilityModal = ({
  isOpen,
  onClose,
  onUpdateVisibility,
  currentVisibility,
  loading
}) => {
  const [selectedVisibility, setSelectedVisibility] = useState(currentVisibility || 'private');

  const visibilityOptions = [
    {
      id: 'public',
      title: 'Public Profile',
      description: 'Your profile is visible to all users and agencies',
      icon: FiEye,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      benefits: [
        'Maximum visibility to potential matches',
        'Agencies can view your complete profile',
        'Increased chances of receiving proposals',
        'Access to premium matchmaking services'
      ]
    },
    {
      id: 'private',
      title: 'Private Profile',
      description: 'Your profile is hidden from public view',
      icon: FiEyeOff,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
      benefits: [
        'Complete privacy and discretion',
        'Only you can control who sees your profile',
        'Share profile only with selected individuals',
        'Enhanced security and personal control'
      ]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateVisibility(selectedVisibility);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 max-w-2xl w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <FiUsers className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Profile Visibility</h2>
                    <p className="text-white/80">Control who can see your profile</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <FiX className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {visibilityOptions.map((option, index) => {
                  const Icon = option.icon;
                  const isSelected = selectedVisibility === option.id;

                  return (
                    <motion.label
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`block cursor-pointer group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                        isSelected
                          ? `${option.borderColor} bg-gradient-to-r ${option.bgColor}`
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Radio Button */}
                          <div className="flex-shrink-0 mt-1">
                            <input
                              type="radio"
                              name="visibility"
                              value={option.id}
                              checked={isSelected}
                              onChange={(e) => setSelectedVisibility(e.target.value)}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              isSelected
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-gray-300 group-hover:border-purple-300 dark:border-gray-600 dark:group-hover:border-purple-400'
                            }`}>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2 h-2 bg-white rounded-full"
                                />
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center shadow-lg`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{option.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{option.description}</p>
                              </div>
                            </div>

                            {/* Benefits */}
                            <div className="mt-4">
                              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Benefits:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {option.benefits.map((benefit, benefitIndex) => (
                                  <div key={benefitIndex} className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full dark:bg-gray-500"></div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      {isSelected && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${option.color}`}
                        />
                      )}
                    </motion.label>
                  );
                })}
              </div>

              {/* Current Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 dark:from-blue-900 dark:to-indigo-900 dark:border-blue-800"
              >
                <div className="flex items-center space-x-2 mb-2">
                  {currentVisibility === 'public' ? (
                    <FiUnlock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <FiLock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                  <span className="font-semibold text-blue-800 dark:text-blue-200">
                    Current Status: {currentVisibility === 'public' ? 'Public' : 'Private'}
                  </span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {currentVisibility === 'public'
                    ? 'Your profile is currently visible to all users and agencies.'
                    : 'Your profile is currently hidden from public view.'
                  }
                </p>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 mt-8"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading || selectedVisibility === currentVisibility}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <FiUsers className="w-5 h-5" />
                      <span>Update Visibility</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaidUsersVisibilityModal;