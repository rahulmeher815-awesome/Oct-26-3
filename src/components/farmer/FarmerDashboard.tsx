import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  HelpCircle,
  Calendar,
  User,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ArrowRight,
  Sprout,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface FarmerDashboardProps {
  onOpenAskQuestion: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ onOpenAskQuestion }) => {
  const {
    farmer,
    questions,
    bookings,
    setActiveView,
    setFilterByCrop,
    setSelectedExpertForBooking,
    experts,
    setActiveChatBooking
  } = useApp();

  if (!farmer) return null;

  // Filter queries for this farmer
  const farmerQuestions = questions.filter((q) => q.farmerId === farmer.id);
  const farmerBookings = bookings.filter((b) => b.farmerId === farmer.id);
  const pendingOrConfirmedBookings = farmerBookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'pending'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-800 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Farmer Dashboard
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Welcome back, {farmer.fullName}!
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>Farm Location: <strong>{farmer.location}</strong></span>
          </p>

          <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl leading-relaxed">
            Connect with agricultural scientists, submit crop disease queries, and manage your field consultations with ease.
          </p>
        </div>

        {/* Decorative backdrop leaf */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 text-emerald-700/30 pointer-events-none">
          <Sprout className="w-64 h-64" />
        </div>
      </div>

      {/* 4 MAIN DASHBOARD OPTIONS (REQUIRED IN FEATURE 3) */}
      <div>
        <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
          <span>Quick Actions</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Option 1: Find an Agricultural Expert */}
          <button
            onClick={() => setActiveView('experts')}
            className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Search className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-700 transition-colors">
                Find an Agricultural Expert
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Search scientists by crop (Rice, Wheat, Tomato, etc.) or specialty.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Browse Experts</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Option 2: Ask an Agricultural Question */}
          <button
            onClick={onOpenAskQuestion}
            className="group bg-white p-6 rounded-2xl border border-emerald-300 ring-2 ring-emerald-500/10 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-700 transition-colors">
                Ask an Agricultural Question
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Upload symptoms & photos to receive expert diagnostic advice.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Post New Problem</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Option 3: My Appointments */}
          <button
            onClick={() => setActiveView('appointments')}
            className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6 text-amber-700" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-700 transition-colors">
                  My Appointments
                </h3>
                {pendingOrConfirmedBookings.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-200 text-amber-900">
                    {pendingOrConfirmedBookings.length}
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Track consultation bookings, scheduled dates, and messages.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>View Bookings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Option 4: My Profile */}
          <button
            onClick={() => setActiveView('profile')}
            className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <User className="w-6 h-6 text-stone-700" />
              </div>
              <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-700 transition-colors">
                My Profile
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Update your farmer name, location, and mobile contact details.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Edit Details</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* UPCOMING CONSULTATION QUICK BANNER (if any) */}
      {pendingOrConfirmedBookings.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-900 uppercase">Upcoming Consultation:</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  pendingOrConfirmedBookings[0].status === 'confirmed'
                    ? 'bg-emerald-200 text-emerald-950'
                    : 'bg-amber-200 text-amber-950'
                }`}>
                  {pendingOrConfirmedBookings[0].status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm font-bold text-stone-900">
                {pendingOrConfirmedBookings[0].expertName} • {pendingOrConfirmedBookings[0].cropName}
              </p>
              <p className="text-xs text-stone-600">
                Date: {pendingOrConfirmedBookings[0].date} ({pendingOrConfirmedBookings[0].timeSlot})
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveChatBooking(pendingOrConfirmedBookings[0])}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Open Chat Room
            </button>
            <button
              onClick={() => setActiveView('appointments')}
              className="px-3 py-2 bg-white text-emerald-800 border border-emerald-300 text-xs font-bold rounded-xl hover:bg-emerald-100 transition-colors"
            >
              All Appointments
            </button>
          </div>
        </div>
      )}

      {/* MY ASKED AGRICULTURAL QUESTIONS SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-stone-900">My Crop Questions & Diagnostics</h2>
            <p className="text-xs text-stone-500">
              Questions you have submitted for agricultural review (persisted in localStorage).
            </p>
          </div>
          <button
            onClick={onOpenAskQuestion}
            className="text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5" /> Ask Another Question
          </button>
        </div>

        {farmerQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-800">You haven't asked any crop questions yet</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Have issues with your wheat, rice, tomato, cotton, or potato crops? Describe the symptoms and get expert advice.
            </p>
            <button
              onClick={onOpenAskQuestion}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Ask First Question
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {farmerQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-sm">
                      {q.cropName}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700">
                      {q.problemCategory}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-stone-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(q.createdAt).toLocaleDateString()}
                    </span>
                    {q.status === 'answered' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Answered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Awaiting Expert Advice
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className={`${q.photoUrl ? 'md:col-span-3' : 'md:col-span-4'} space-y-2`}>
                    <div>
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                        Problem Description:
                      </h4>
                      <p className="text-sm text-stone-800 leading-relaxed mt-0.5">
                        {q.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                        Symptoms Observed:
                      </h4>
                      <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-100 mt-0.5">
                        {q.symptoms}
                      </p>
                    </div>
                  </div>

                  {q.photoUrl && (
                    <div className="md:col-span-1">
                      <img
                        src={q.photoUrl}
                        alt={`${q.cropName} issue`}
                        className="w-full h-32 object-cover rounded-xl border border-stone-200"
                      />
                    </div>
                  )}
                </div>

                {/* Expert answers section */}
                {q.answers.length > 0 ? (
                  <div className="pt-3 border-t border-stone-100 space-y-2">
                    <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Recommendations from Agricultural Specialists:
                    </h5>
                    {q.answers.map((ans) => (
                      <div
                        key={ans.id}
                        className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 text-sm text-stone-800 space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                          <span>{ans.expertName} ({ans.expertSpecialization})</span>
                          <span className="text-[10px] text-emerald-700 font-normal">
                            {new Date(ans.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-stone-800 leading-relaxed font-medium">
                          {ans.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-100">
                    <span>Agricultural scientists will review and post remedy recommendations shortly.</span>
                    <button
                      onClick={() => {
                        setFilterByCrop(q.cropName);
                        setActiveView('experts');
                      }}
                      className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      Find specialists for {q.cropName} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
