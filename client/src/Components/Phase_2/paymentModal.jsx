
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDollarSign, FiCreditCard, FiShield, FiCheck } from 'react-icons/fi';
import { Button } from '../Layout/Button';

export const PaymentRequestModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!amount || amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Please provide a description';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ amount: parseFloat(amount), description });
      setAmount('');
      setDescription('');
      setErrors({});
    }
  };

  const predefinedAmounts = [500, 1000, 2500, 5000];

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
            className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full mx-4 overflow-hidden"
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
                    <h2 className="text-2xl font-bold text-white">Payment Request</h2>
                    <p className="text-white/80">Secure payment processing</p>
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
              {/* Security Badge */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
                  <FiShield className="w-4 h-4" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Payment Amount (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiDollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                      errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-purple-300'
                    }`}
                    placeholder="Enter amount"
                    min="1"
                  />
                </div>
                {errors.amount && (
                  <p className="mt-2 text-sm text-red-600">{errors.amount}</p>
                )}

                {/* Quick Amount Selection */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Quick Select:</p>
                  <div className="flex flex-wrap gap-2">
                    {predefinedAmounts.map((preset) => (
                      <motion.button
                        key={preset}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setAmount(preset.toString())}
                        className="px-4 py-2 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-lg text-sm font-medium transition-all duration-200"
                      >
                        ₹{preset}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Payment Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 resize-none ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-purple-300'
                  }`}
                  placeholder="Describe what this payment is for..."
                  rows="3"
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Payment Features */}
              <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                <div className="flex items-center space-x-3 mb-3">
                  <FiCreditCard className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-800">Payment Features</h3>
                </div>
                <div className="space-y-2">
                  {[
                    'Secure encrypted transactions',
                    'Instant payment confirmation',
                    'Multiple payment methods',
                    '24/7 customer support'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FiCheck className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-purple-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
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
                      <FiDollarSign className="w-5 h-5" />
                      <span>Send Request</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
