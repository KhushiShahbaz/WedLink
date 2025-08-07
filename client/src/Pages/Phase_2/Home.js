
import React from 'react';
import { FaHeart, FaShieldAlt, FaGlobeAmericas, FaUserCheck } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      title: "Smart Matching",
      icon: <FaHeart className="w-8 h-8" />,
      description: "Our advanced algorithm matches you with compatible partners based on your preferences, values, and lifestyle choices."
    },
    {
      title: "Verified Profiles",
      icon: <FaUserCheck className="w-8 h-8" />,
      description: "Every profile goes through our comprehensive verification process to ensure authenticity and safety for all members."
    },
    {
      title: "Global Network",
      icon: <FaGlobeAmericas className="w-8 h-8" />,
      description: "Connect with potential matches from around the world through our extensive global matrimonial network."
    },
    {
      title: "Privacy & Security",
      icon: <FaShieldAlt className="w-8 h-8" />,
      description: "Your privacy is our priority. Advanced security measures protect your personal information at all times."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-marriagePink to-pink-100 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-marriageHotPink/5 to-marriageRed/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Perfect Match
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-marriageHotPink to-marriageRed">
                Awaits You
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join our premium matrimonial platform where meaningful connections are made and lifelong partnerships begin.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-marriageHotPink to-marriageRed text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
                Find Your Match
              </button>
              <button className="border-2 border-marriageHotPink text-marriageHotPink px-10 py-4 rounded-full text-lg font-semibold hover:bg-marriageHotPink hover:text-white transition-all duration-300">
                Browse Profiles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our comprehensive approach to finding your ideal life partner.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ title, icon, description }, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-marriageHotPink/30 transition-all duration-500 transform hover:-translate-y-3"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-marriageHotPink to-marriageRed text-white p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-marriageHotPink transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gradient-to-r from-marriagePink/30 to-pink-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real couples who found their perfect match through our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-marriageHotPink to-marriageRed rounded-full mx-auto mb-6 flex items-center justify-center">
                <FaHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sarah & Ahmed</h3>
              <p className="text-gray-600 italic">"We found each other through this amazing platform and couldn't be happier. Thank you for bringing us together!"</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-marriageHotPink to-marriageRed rounded-full mx-auto mb-6 flex items-center justify-center">
                <FaHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fatima & Hassan</h3>
              <p className="text-gray-600 italic">"The verification process gave us confidence. We're now happily married with beautiful children!"</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-marriageHotPink to-marriageRed rounded-full mx-auto mb-6 flex items-center justify-center">
                <FaHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Aisha & Omar</h3>
              <p className="text-gray-600 italic">"From first message to wedding day - this platform made our love story possible. Highly recommended!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-marriageHotPink to-marriageRed text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Soulmate?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of happy couples who found their perfect match. Your love story starts here.
          </p>
          <button className="bg-white text-marriageHotPink px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 hover:scale-105 transform transition-all duration-300 shadow-2xl">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
