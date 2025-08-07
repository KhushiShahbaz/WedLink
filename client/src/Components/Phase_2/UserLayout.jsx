
import { Footer } from "../Layout/Footer";
import { NavBar } from "../Layout/navbar";

const UserLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
    <NavBar />
    <main className="mx-auto relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </main>
    <Footer/>
  </div>
);

export default UserLayout;
