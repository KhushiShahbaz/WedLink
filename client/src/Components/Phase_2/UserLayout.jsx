import { Footer } from "../Layout/Footer";
import { NavBar } from "../Layout/navbar";

const UserLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative overflow-hidden">
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
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 to-pink-50/20"></div>
      </div>
    </div>

    <main className="relative z-10 min-h-screen">
      {children}
    </main>

    <Footer/>
  </div>
);

export default UserLayout;