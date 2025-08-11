
import React from 'react';
import { FaHeart, FaShieldAlt, FaGlobeAmericas, FaUserCheck, FaRing, FaStar, FaUsers, FaComments } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    {
      title: "Smart Matching Algorithm",
      icon: <FaHeart className="w-8 h-8" />,
      description: "Our AI-powered matching system connects you with highly compatible partners based on deep personality analysis and preferences.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "100% Verified Profiles",
      icon: <FaUserCheck className="w-8 h-8" />,
      description: "Every profile undergoes rigorous verification including ID, education, and employment verification for complete authenticity.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Global Network",
      icon: <FaGlobeAmericas className="w-8 h-8" />,
      description: "Connect with premium matches across 50+ countries through our expansive international matrimonial network.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Advanced Privacy",
      icon: <FaShieldAlt className="w-8 h-8" />,
      description: "Bank-level security with customizable privacy controls. Your information is protected with end-to-end encryption.",
      gradient: "from-purple-500 to-violet-500"
    }
  ];

  const stats = [
    { number: "2M+", label: "Happy Couples", icon: FaHeart },
    { number: "15M+", label: "Registered Users", icon: FaUsers },
    { number: "50+", label: "Countries", icon: FaGlobeAmericas },
    { number: "4.8", label: "App Rating", icon: FaStar }
  ];

  const successStories = [
    {
      names: "Sarah & Ahmed",
      image: "/api/placeholder/80/80",
      story: "We found each other through this amazing platform and couldn't be happier. The matching algorithm is incredibly accurate!",
      location: "Dubai, UAE",
      date: "Married 2023"
    },
    {
      names: "Fatima & Hassan",
      image: "/api/placeholder/80/80", 
      story: "The verification process gave us complete confidence. We're now blessed with a beautiful family and couldn't be more grateful.",
      location: "London, UK",
      date: "Married 2022"
    },
    {
      names: "Aisha & Omar",
      image: "/api/placeholder/80/80",
      story: "From first conversation to wedding day - this platform made our love story possible. Highly recommended for serious seekers!",
      location: "Toronto, Canada", 
      date: "Married 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      
      {/* Hero Section with Enhanced Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 125 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            >
              <FaRing className="w-5 h-5 mr-2 text-pink-300" />
              <span className="text-sm font-medium">India's Most Trusted Matrimony Platform</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                Perfect Life Partner
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join millions of success stories. Our AI-powered platform connects hearts with precision, 
              helping you find your ideal match based on compatibility, values, and life goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 min-w-[240px]"
              >
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 min-w-[240px]"
              >
                Browse Profiles
              </motion.button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map(({ number, label, icon: Icon }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 text-pink-300" />
                  <div className="text-3xl md:text-4xl font-bold mb-1">{number}</div>
                  <div className="text-purple-200 text-sm font-medium">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section with Modern Cards */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Niqah</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our comprehensive approach to finding your ideal life partner through cutting-edge technology and personalized service.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ title, icon, description, gradient }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-200 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className={`bg-gradient-to-r ${gradient} text-white p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-purple-700 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed text-sm">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories with Enhanced Design */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-pink-900/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Love Stories That Inspire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real couples who found their perfect match and started their beautiful journey together
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map(({ names, story, location, date }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <FaHeart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{names}</h3>
                  <div className="flex items-center justify-center text-sm text-gray-500 space-x-4">
                    <span>{location}</span>
                    <span>•</span>
                    <span>{date}</span>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic text-center leading-relaxed">
                  "{story}"
                </blockquote>
                <div className="flex justify-center mt-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Journey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Love</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, secure, and personalized approach to finding your life partner
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-purple-200 to-pink-200 transform -translate-y-1/2"></div>
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center group relative"
            >
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                Create Your Profile
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Build a comprehensive profile with photos, preferences, and life goals. Our verification team ensures authenticity.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center group relative"
            >
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                Discover Matches
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI algorithm analyzes compatibility factors and presents you with highly compatible verified profiles.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center group relative"
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                Start Your Journey
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with your matches through secure messaging and video calls. Begin your beautiful love story.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action with Premium Design */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to Find Your 
              <span className="block bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                Soulmate?
              </span>
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join millions of happy couples who found their perfect match. Your love story is just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-700 px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 shadow-2xl transition-all duration-300 min-w-[250px]"
              >
                Get Started Today
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 min-w-[250px]"
              >
                Watch Success Stories
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
