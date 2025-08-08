
import { Footer } from "../Layout/Footer";
import { NavBar } from "../Layout/navbar";

const UserLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-hidden">
    <NavBar />
    
    {/* Enhanced background decorative elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      
      {/* Geometric patterns */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-purple-200/50 rounded-2xl rotate-12 animate-float"></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 border border-pink-200/50 rounded-full animate-pulse-slow"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239333ea%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
    </div>

    <main className="relative z-10 min-h-screen">
      {children}
    </main>
    
    <Footer/>
  </div>
);

export default UserLayout;
