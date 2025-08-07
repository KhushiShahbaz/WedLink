
import React, { useState } from 'react';
import { LoginModal } from '../Components/loginModal';
import CoverPage from './CoverPage';
import { Footer } from '../Components/Layout/Footer';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Global Matrimonial Platform",
      description: "Connect with potential matches from around the world with our comprehensive global network and advanced matching algorithms."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
          <path d="M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      title: "Free Registration",
      description: "Join our platform without any registration fees. Start your journey to find your perfect match today at no cost."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Screening and Validation",
      description: "Our comprehensive verification process ensures authentic profiles and a safe, trustworthy environment for all members."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Data Security and Privacy",
      description: "Your personal information is protected with industry-leading security measures and strict privacy controls."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-marriagePink via-pink-100 to-rose-100">
        <div className="absolute inset-0 bg-gradient-to-r from-marriageHotPink/10 to-marriageRed/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Find Your
              <span className="bg-gradient-to-r from-marriageHotPink to-marriageRed bg-clip-text text-transparent ml-4">
                Perfect Match
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful couples who found their soulmate through our trusted matrimonial platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-marriageHotPink to-marriageRed text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transform transition-all duration-300 min-w-[200px]"
              >
                Start Your Journey
              </button>
              <button className="border-2 border-marriageHotPink text-marriageHotPink px-8 py-4 rounded-full text-lg font-semibold hover:bg-marriageHotPink hover:text-white transition-all duration-300 min-w-[200px]">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-marriageHotPink/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-marriageRed/20 rounded-full blur-xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a comprehensive platform designed to help you find meaningful connections with complete security and trust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-marriageHotPink/30 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-marriageHotPink to-marriageRed text-white rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-marriagePink to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-marriageRed mb-2">10,000+</div>
              <div className="text-gray-700 font-semibold">Happy Couples</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-marriageRed mb-2">50,000+</div>
              <div className="text-gray-700 font-semibold">Verified Profiles</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-marriageRed mb-2">95%</div>
              <div className="text-gray-700 font-semibold">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to find your perfect match
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-marriageHotPink to-marriageRed text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Create Profile</h3>
              <p className="text-gray-600">Sign up and create your detailed profile with photos and preferences</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-marriageHotPink to-marriageRed text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Find Matches</h3>
              <p className="text-gray-600">Browse through verified profiles and find your compatible matches</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-marriageHotPink to-marriageRed text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Start Connection</h3>
              <p className="text-gray-600">Connect with your matches and start meaningful conversations</p>
            </div>
          </div>
        </div>
      </section>

      <CoverPage />
      <Footer />
      
      {/* Login Modal */}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
};

export default Home;
