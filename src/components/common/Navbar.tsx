import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  User,
  LogOut,
  Calendar,
  HelpCircle,
  Users,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  FileQuestion,
  FileText
} from 'lucide-react';

interface NavbarProps {
  onOpenFarmerAuth: () => void;
  onOpenExpertAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFarmerAuth, onOpenExpertAuth }) => {
  const {
    role,
    farmer,
    expert,
    activeView,
    setActiveView,
    logout,
    quickSwitchToDemo,
    setIsAskQuestionModalOpen,
    bookings,
    questions
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  // Counts for badges
  const pendingRequestsCount = bookings.filter((b) => b.status === 'pending').length;
  const openQuestionsCount = questions.filter((q) => q.status === 'open').length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200/80 shadow-xs">
      {/* Demo helper banner for college evaluators */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-semibold text-emerald-200">College Demo Mode:</span>
          <span className="hidden sm:inline text-emerald-200/90">
            Quickly switch perspectives to test both Farmer & Expert features:
          </span>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => quickSwitchToDemo('farmer1')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              role === 'farmer' && farmer?.fullName === 'Ramesh Patel'
                ? 'bg-amber-400 text-stone-900 font-bold'
                : 'bg-emerald-800 hover:bg-emerald-700 text-white'
            }`}
          >
            🌾 Farmer (Ramesh)
          </button>
          <button
            onClick={() => quickSwitchToDemo('farmer2')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              role === 'farmer' && farmer?.fullName === 'Sunita Devi'
                ? 'bg-amber-400 text-stone-900 font-bold'
                : 'bg-emerald-800 hover:bg-emerald-700 text-white'
            }`}
          >
            👩‍🌾 Farmer (Sunita)
          </button>
          <button
            onClick={() => quickSwitchToDemo('expert1')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              role === 'expert' && expert?.fullName === 'Dr. Rajesh Sharma'
                ? 'bg-amber-400 text-stone-900 font-bold'
                : 'bg-emerald-800 hover:bg-emerald-700 text-white'
            }`}
          >
            🔬 Expert (Dr. Rajesh)
          </button>
          <button
            onClick={() => quickSwitchToDemo('expert2')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              role === 'expert' && expert?.fullName === 'Dr. Anita Deshmukh'
                ? 'bg-amber-400 text-stone-900 font-bold'
                : 'bg-emerald-800 hover:bg-emerald-700 text-white'
            }`}
          >
            🐛 Expert (Dr. Anita)
          </button>
          <button
            onClick={() => quickSwitchToDemo('guest')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              role === 'guest'
                ? 'bg-stone-200 text-stone-900 font-bold'
                : 'bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200'
            }`}
          >
            🌐 Guest View
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveView(role === 'guest' ? 'home' : 'dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-emerald-950 flex items-center gap-1.5">
                Krishi<span className="text-emerald-600">Connect</span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium hidden sm:block">
                Connecting Farmers with Agricultural Experts
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {role === 'guest' && (
              <>
                <button
                  onClick={() => setActiveView('home')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeView === 'home'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveView('experts')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeView === 'experts'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  Find Experts
                </button>
                <button
                  onClick={() => setActiveView('how-it-works')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeView === 'how-it-works'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  How It Works
                </button>
              </>
            )}

            {role === 'farmer' && (
              <>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeView === 'dashboard'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveView('experts')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeView === 'experts'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  Find Experts
                </button>
                <button
                  onClick={() => setIsAskQuestionModalOpen(true)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200 transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4 text-emerald-700" />
                  Ask Question
                </button>
                <button
                  onClick={() => setActiveView('appointments')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    activeView === 'appointments'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  My Appointments
                </button>
              </>
            )}

            {role === 'expert' && (
              <>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeView === 'dashboard'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveView('requests')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    activeView === 'requests'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Appointment Requests
                  {pendingRequestsCount > 0 && (
                    <span className="bg-amber-500 text-stone-900 text-xs font-bold px-1.5 py-0.2 rounded-full">
                      {pendingRequestsCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveView('questions')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    activeView === 'questions'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  <FileQuestion className="w-4 h-4" />
                  Farmer Questions
                  {openQuestionsCount > 0 && (
                    <span className="bg-emerald-600 text-white text-xs font-bold px-1.5 py-0.2 rounded-full">
                      {openQuestionsCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveView('profile')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    activeView === 'profile'
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  <User className="w-4 h-4" />
                  My Profile
                </button>
              </>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {role === 'guest' ? (
              <>
                <button
                  onClick={onOpenFarmerAuth}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs"
                >
                  Continue as Farmer
                </button>
                <button
                  onClick={onOpenExpertAuth}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-all shadow-sm shadow-emerald-700/20 active:scale-95"
                >
                  Continue as Agricultural Expert
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 pl-3 border-l border-stone-200">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm border border-emerald-300">
                    {role === 'farmer' ? (farmer?.fullName?.[0] || 'F') : (expert?.fullName?.[0] || 'E')}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-stone-900 leading-tight">
                      {role === 'farmer' ? farmer?.fullName : expert?.fullName}
                    </p>
                    <p className="text-[11px] text-stone-500 capitalize">
                      {role === 'farmer' ? `Farmer • ${farmer?.location?.split(',')[0] || 'India'}` : 'Agricultural Expert'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-1">
            {role === 'guest' ? (
              <>
                <button
                  onClick={() => {
                    setActiveView('home');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setActiveView('experts');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  Find Agricultural Experts
                </button>
                <button
                  onClick={() => {
                    setActiveView('how-it-works');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  How It Works
                </button>
                <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onOpenFarmerAuth();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-center text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200"
                  >
                    Continue as Farmer
                  </button>
                  <button
                    onClick={() => {
                      onOpenExpertAuth();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-center text-sm font-semibold text-white bg-emerald-700 shadow-sm"
                  >
                    Continue as Agricultural Expert
                  </button>
                </div>
              </>
            ) : role === 'farmer' ? (
              <>
                <div className="p-3 bg-emerald-50 rounded-xl mb-2 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-emerald-950">{farmer?.fullName}</p>
                    <p className="text-xs text-emerald-700">Farmer • {farmer?.location}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-semibold text-rose-700 hover:underline flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
                <button
                  onClick={() => {
                    setActiveView('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  Farmer Dashboard
                </button>
                <button
                  onClick={() => {
                    setActiveView('experts');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  Find Experts
                </button>
                <button
                  onClick={() => {
                    setIsAskQuestionModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-emerald-800 bg-emerald-100/70"
                >
                  Ask Crop Question
                </button>
                <button
                  onClick={() => {
                    setActiveView('appointments');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  My Appointments
                </button>
                <button
                  onClick={() => {
                    setActiveView('profile');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  My Profile
                </button>
              </>
            ) : (
              <>
                <div className="p-3 bg-emerald-50 rounded-xl mb-2 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-emerald-950">{expert?.fullName}</p>
                    <p className="text-xs text-emerald-700">{expert?.specialization}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-semibold text-rose-700 hover:underline flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
                <button
                  onClick={() => {
                    setActiveView('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  Expert Dashboard
                </button>
                <button
                  onClick={() => {
                    setActiveView('requests');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  Appointment Requests ({pendingRequestsCount})
                </button>
                <button
                  onClick={() => {
                    setActiveView('questions');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  Farmer Questions ({openQuestionsCount})
                </button>
                <button
                  onClick={() => {
                    setActiveView('profile');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100"
                >
                  My Profile & Fees
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
