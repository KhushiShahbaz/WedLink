import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { createPreferences } from '../../slice/matchMakingSlice';
import { 
  FiHeart, 
  FiX, 
  FiUser, 
  FiMapPin, 
  FiBook, 
  FiBriefcase, 
  FiCalendar,
  FiCheck,
  FiArrowRight
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const MatchMakingForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [preferences, setPreferences] = useState({
    ageRangeMin: '',
    ageRangeMax: '',
    education: '',
    profession: '',
    location: '',
    additionalRequirements: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!preferences.ageRangeMin) newErrors.ageRangeMin = 'Minimum age is required';
      if (!preferences.ageRangeMax) newErrors.ageRangeMax = 'Maximum age is required';
      if (preferences.ageRangeMin && preferences.ageRangeMax && 
          parseInt(preferences.ageRangeMin) >= parseInt(preferences.ageRangeMax)) {
        newErrors.ageRangeMax = 'Maximum age must be greater than minimum age';
      }
    }

    if (currentStep === 2) {
      if (!preferences.education) newErrors.education = 'Education preference is required';
      if (!preferences.profession) newErrors.profession = 'Profession preference is required';
    }

    if (currentStep === 3) {
      if (!preferences.location) newErrors.location = 'Location preference is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setLoading(true);
    try {
      await dispatch(createPreferences(preferences)).unwrap();
      toast.success('Preferences saved successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCalendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Age Preferences</h3>
              <p className="text-gray-600 dark:text-gray-400">What age range are you looking for?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Minimum Age
                </label>
                <input
                  type="number"
                  name="ageRangeMin"
                  value={preferences.ageRangeMin}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 ${
                    errors.ageRangeMin ? 'border-red-300 bg-red-50 dark:bg-red-900 dark:border-red-700' : 'border-gray-200 focus:border-purple-300 dark:focus:border-purple-500'
                  }`}
                  placeholder="e.g., 25"
                  min="18"
                  max="100"
                />
                {errors.ageRangeMin && (
                  <p className="mt-2 text-sm text-red-600">{errors.ageRangeMin}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Maximum Age
                </label>
                <input
                  type="number"
                  name="ageRangeMax"
                  value={preferences.ageRangeMax}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 ${
                    errors.ageRangeMax ? 'border-red-300 bg-red-50 dark:bg-red-900 dark:border-red-700' : 'border-gray-200 focus:border-purple-300 dark:focus:border-purple-500'
                  }`}
                  placeholder="e.g., 35"
                  min="18"
                  max="100"
                />
                {errors.ageRangeMax && (
                  <p className="mt-2 text-sm text-red-600">{errors.ageRangeMax}</p>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBook className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Education & Career</h3>
              <p className="text-gray-600 dark:text-gray-400">What are your educational and professional preferences?</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
                  <FiBook className="w-4 h-4" />
                  <span>Education Level</span>
                </label>
                <select
                  name="education"
                  value={preferences.education}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 ${
                    errors.education ? 'border-red-300 bg-red-50 dark:bg-red-900 dark:border-red-700' : 'border-gray-200 focus:border-purple-300 dark:focus:border-purple-500'
                  }`}
                >
                  <option value="">Select education level</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Professional Degree">Professional Degree</option>
                </select>
                {errors.education && (
                  <p className="mt-2 text-sm text-red-600">{errors.education}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
                  <FiBriefcase className="w-4 h-4" />
                  <span>Profession</span>
                </label>
                <input
                  type="text"
                  name="profession"
                  value={preferences.profession}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 ${
                    errors.profession ? 'border-red-300 bg-red-50 dark:bg-red-900 dark:border-red-700' : 'border-gray-200 focus:border-purple-300 dark:focus:border-purple-500'
                  }`}
                  placeholder="e.g., Software Engineer, Doctor, Teacher"
                />
                {errors.profession && (
                  <p className="mt-2 text-sm text-red-600">{errors.profession}</p>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Location & Additional</h3>
              <p className="text-gray-600 dark:text-gray-400">Where would you like your partner to be from?</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
                  <FiMapPin className="w-4 h-4" />
                  <span>Preferred Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={preferences.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 ${
                    errors.location ? 'border-red-300 bg-red-50 dark:bg-red-900 dark:border-red-700' : 'border-gray-200 focus:border-purple-300 dark:focus:border-purple-500'
                  }`}
                  placeholder="e.g., Karachi, Lahore, Islamabad"
                />
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Additional Requirements (Optional)
                </label>
                <textarea
                  name="additionalRequirements"
                  value={preferences.additionalRequirements}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all duration-200 dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Any additional preferences or requirements..."
                />
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full mx-4">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <FiHeart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Partner Preferences</h2>
              <p className="text-white/80">Tell us about your ideal match</p>
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

      {/* Progress Bar */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Step {step} of {totalSteps}</span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6">
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrev}
            disabled={step === 1}
            className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Previous
          </motion.button>

          {step < totalSteps ? (
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <span>Next</span>
              <FiArrowRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4" />
                  <span>Save Preferences</span>
                </>
              )}
            </motion.button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MatchMakingForm;