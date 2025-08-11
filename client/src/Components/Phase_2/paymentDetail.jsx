import React from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiCalendar, FiDollarSign, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

export const PaymentCard = ({ payment }) => {
  if (!payment) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCreditCard className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Payment History</h3>
        <p className="text-gray-500">You haven't made any payments yet</p>
      </motion.div>
    );
  }

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        color: 'from-green-500 to-emerald-500',
        bgColor: 'from-green-50 to-emerald-50',
        textColor: 'text-green-700',
        icon: FiCheckCircle
      },
      pending: {
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'from-yellow-50 to-orange-50',
        textColor: 'text-yellow-700',
        icon: FiClock
      },
      failed: {
        color: 'from-red-500 to-rose-500',
        bgColor: 'from-red-50 to-rose-50',
        textColor: 'text-red-700',
        icon: FiAlertCircle
      }
    };
    return configs[status] || configs.pending;
  };

  const statusConfig = getStatusConfig(payment.status);
  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
    >
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${statusConfig.color} p-6 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Payment Details</h2>
            <p className="text-white/80">Transaction Information</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <FiCreditCard className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <div className={`bg-gradient-to-r ${statusConfig.bgColor} px-6 py-3 rounded-full flex items-center space-x-2 border border-opacity-20`}>
            <StatusIcon className={`w-5 h-5 ${statusConfig.textColor}`} />
            <span className={`font-semibold capitalize ${statusConfig.textColor}`}>{payment.status}</span>
          </div>
        </div>

        {/* Payment Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center space-x-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 hover:bg-gradient-to-r hover:from-purple-50/50 dark:hover:from-purple-800/50 hover:to-pink-50/50 dark:hover:to-pink-800/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <FiDollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">Amount</h3>
              <p className="text-xl font-bold text-gray-900 dark:text-white">₹{payment.amount}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 hover:bg-gradient-to-r hover:from-purple-50/50 dark:hover:from-purple-800/50 hover:to-pink-50/50 dark:hover:to-pink-800/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <FiCalendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">Date</h3>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {new Date(payment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Transaction ID */}
        {payment.transactionId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="p-4 bg-gradient-to-r from-gray-50 dark:from-gray-700 to-gray-100 dark:to-gray-600 rounded-2xl border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-2">Transaction ID</h3>
            <p className="text-gray-900 dark:text-gray-200 font-mono text-sm break-all">{payment.transactionId}</p>
          </motion.div>
        )}

        {/* Description */}
        {payment.description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 p-4 bg-gradient-to-r from-purple-50 dark:from-purple-800/50 to-pink-50 dark:to-pink-800/50 rounded-2xl border border-purple-100 dark:border-purple-700"
          >
            <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300 uppercase tracking-wide mb-2">Description</h3>
            <p className="text-purple-700 dark:text-purple-200 leading-relaxed">{payment.description}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};