
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiAlertCircle, FiDollarSign, FiCalendar, FiUser, FiFileText } from 'react-icons/fi';

export const PaymentVerificationModal = ({ 
  isOpen, 
  onClose, 
  onVerify, 
  paymentData, 
  loading 
}) => {
  const [verificationStatus, setVerificationStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!verificationStatus) {
      setErrors({ status: 'Please select a verification status' });
      return;
    }

    setErrors({});
    onVerify({
      status: verificationStatus,
      notes: notes.trim(),
      paymentId: paymentData?.id
    });
  };

  const statusOptions = [
    {
      value: 'verified',
      label: 'Verified',
      description: 'Payment has been confirmed and verified',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      icon: FiCheck
    },
    {
      value: 'rejected',
      label: 'Rejected',
      description: 'Payment verification failed or was declined',
      color: 'from-red-500 to-rose-500',
      bgColor: 'from-red-50 to-rose-50',
      borderColor: 'border-red-200',
      icon: FiX
    },
    {
      value: 'pending',
      label: 'Under Review',
      description: 'Payment requires additional verification',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
      icon: FiAlertCircle
    }
  ];

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
            className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <FiDollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Payment Verification</h2>
                    <p className="text-white/80">Review and verify payment details</p>
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
            <div className="p-6">
              {/* Payment Details */}
              {paymentData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200"
                >
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
                    <FiFileText className="w-5 h-5" />
                    <span>Payment Information</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <FiDollarSign className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-700">Amount</p>
                        <p className="text-lg font-bold text-blue-900">₹{paymentData.amount}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <FiCalendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-700">Date</p>
                        <p className="text-blue-900">{new Date(paymentData.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    {paymentData.userId && (
                      <div className="flex items-center space-x-3">
                        <FiUser className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-700">User ID</p>
                          <p className="text-blue-900">{paymentData.userId}</p>
                        </div>
                      </div>
                    )}
                    
                    {paymentData.transactionId && (
                      <div className="flex items-center space-x-3">
                        <FiFileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-700">Transaction ID</p>
                          <p className="text-blue-900 font-mono text-sm">{paymentData.transactionId}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Verification Status */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Verification Status
                  </label>
                  <div className="space-y-3">
                    {statusOptions.map((option, index) => {
                      const Icon = option.icon;
                      const isSelected = verificationStatus === option.value;
                      
                      return (
                        <motion.label
                          key={option.value}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className={`block cursor-pointer rounded-2xl border-2 transition-all duration-300 ${
                            isSelected 
                              ? `${option.borderColor} bg-gradient-to-r ${option.bgColor}` 
                              : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                          }`}
                        >
                          <div className="p-4">
                            <div className="flex items-center space-x-4">
                              <input
                                type="radio"
                                name="verificationStatus"
                                value={option.value}
                                checked={isSelected}
                                onChange={(e) => setVerificationStatus(e.target.value)}
                                className="sr-only"
                              />
                              
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                isSelected 
                                  ? 'border-purple-500 bg-purple-500' 
                                  : 'border-gray-300'
                              }`}>
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2 h-2 bg-white rounded-full"
                                  />
                                )}
                              </div>
                              
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center shadow-lg`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              
                              <div>
                                <h3 className="font-semibold text-gray-900">{option.label}</h3>
                                <p className="text-sm text-gray-600">{option.description}</p>
                              </div>
                            </div>
                          </div>
                        </motion.label>
                      );
                    })}
                  </div>
                  {errors.status && (
                    <p className="mt-2 text-sm text-red-600">{errors.status}</p>
                  )}
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Verification Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 resize-none"
                    placeholder="Add any additional notes about the verification..."
                    rows="4"
                  />
                </div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FiCheck className="w-5 h-5" />
                        <span>Submit Verification</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
