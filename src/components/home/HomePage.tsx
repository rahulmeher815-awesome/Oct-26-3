import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  Users,
  CalendarCheck,
  CheckCircle,
  HelpCircle,
  Award,
  ArrowRight,
  ShieldAlert,
  Search,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { CROP_LIST } from '../../data/seedData';

interface HomePageProps {
  onOpenFarmerAuth: () => void;
  onOpenExpertAuth: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenFarmerAuth, onOpenExpertAuth }) => {
  const { setActiveView, experts, setSelectedExpertForView, setSelectedExpertForBooking, setFilterByCrop } = useApp();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-green-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-green-500/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs">
            <Sprout className="w-4 h-4 text-emerald-300" />
            <span>Academic Demonstration Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Krishi<span className="text-emerald-300">Connect</span>
          </h1>

          <p className="text-lg sm:text-2xl font-medium text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Connecting Farmers with Agricultural Experts
          </p>

          <p className="text-sm sm:text-base text-emerald-200/90 max-w-2xl mx-auto leading-relaxed">
            Get personalized scientific guidance for crop diseases, pest infestations, nutrient deficiencies, and irrigation. Book consultations with qualified agricultural scientists.
          </p>

          {/* TWO PRIMARY BUTTONS AS EXPLICITLY REQUIRED IN FEATURE 1 */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenFarmerAuth}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-base shadow-lg shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <span>Continue as Farmer</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenExpertAuth}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-base shadow-lg shadow-black/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 border border-emerald-200"
            >
              <span>Continue as Agricultural Expert</span>
              <Award className="w-5 h-5 text-emerald-700" />
            </button>
          </div>

          {/* Quick Stats Banner */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-300">6+</p>
              <p className="text-xs text-emerald-100 font-medium">Demonstration Scientists</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-300">15+</p>
              <p className="text-xs text-emerald-100 font-medium">Major Indian Crops</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-300">100%</p>
              <p className="text-xs text-emerald-100 font-medium">Local Browser Storage</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-300">Direct</p>
              <p className="text-xs text-emerald-100 font-medium">Consultation Messaging</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW PLATFORM WORKS SECTION (REQUIRED IN FEATURE 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            How It Works
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Simple 3-Step Process for Farmers & Experts
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Designed specifically for farmers to easily describe crop troubles and receive timely agricultural remedies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-lg mb-5 border border-emerald-200">
              1
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">Ask or Search Expert</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Farmers post crop symptoms (with optional photos) or browse the directory of specialized plant pathologists, entomologists, and agronomists.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-lg mb-5 border border-emerald-200">
              2
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">Book an Appointment</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Choose an available date and time slot with the expert. The conflict-prevention engine ensures no double bookings occur.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-lg mb-5 border border-emerald-200">
              3
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">Get Scientific Advice</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Once accepted, use the consultation messaging room to discuss remedies, dosage, spray schedules, and preventive measures.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED CROPS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-950">Supported Crops</h2>
              <p className="text-sm text-emerald-800">
                Filter agricultural specialists by the specific crop you are cultivating:
              </p>
            </div>
            <button
              onClick={() => setActiveView('experts')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-white px-3.5 py-2 rounded-xl border border-emerald-200 shadow-2xs hover:bg-emerald-100 transition-colors flex items-center gap-1"
            >
              <span>View All Experts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { name: 'Wheat', icon: '🌾', count: '4 Specialists' },
              { name: 'Rice (Paddy)', icon: '🌱', count: '4 Specialists' },
              { name: 'Cotton', icon: '☁️', count: '3 Specialists' },
              { name: 'Tomato', icon: '🍅', count: '4 Specialists' },
              { name: 'Potato', icon: '🥔', count: '3 Specialists' },
              { name: 'Maize (Corn)', icon: '🌽', count: '3 Specialists' }
            ].map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  setFilterByCrop(c.name);
                  setActiveView('experts');
                }}
                className="bg-white p-4 rounded-xl border border-emerald-200 hover:border-emerald-500 hover:shadow-md transition-all text-center group cursor-pointer"
              >
                <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">{c.icon}</div>
                <p className="font-bold text-stone-900 text-sm group-hover:text-emerald-700 transition-colors">
                  {c.name}
                </p>
                <p className="text-[11px] text-stone-500">{c.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DEMONSTRATION EXPERTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Demonstration Profiles
            </div>
            <h2 className="text-3xl font-extrabold text-stone-900">Featured Agricultural Experts</h2>
            <p className="text-sm text-stone-600">
              Browse qualified scientists ready to assist with crop diagnosis.
            </p>
          </div>
          <button
            onClick={() => setActiveView('experts')}
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            Explore all {experts.length} experts <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experts.slice(0, 3).map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-emerald-300 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={exp.avatarUrl}
                    alt={exp.fullName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-100 shrink-0"
                  />
                  <div>
                    <div className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold tracking-wide uppercase mb-1">
                      Demo Profile
                    </div>
                    <h3 className="text-lg font-bold text-stone-900">{exp.fullName}</h3>
                    <p className="text-xs text-emerald-700 font-semibold">{exp.specialization}</p>
                    <p className="text-xs text-stone-500">{exp.experienceYears} Years Exp.</p>
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{exp.bio}</p>

                <div>
                  <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                    Crops:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {exp.crops.slice(0, 3).map((c) => (
                      <span
                        key={c}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700"
                      >
                        {c}
                      </span>
                    ))}
                    {exp.crops.length > 3 && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-500">
                        +{exp.crops.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 block">Consultation Fee</span>
                  <span className="text-base font-extrabold text-stone-900">₹{exp.consultationFee}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedExpertForView(exp)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-xl text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setSelectedExpertForBooking(exp);
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-2xs"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* College Project Disclaimer Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-stone-100 border border-stone-300/80 flex flex-col sm:flex-row items-center gap-4 text-stone-700 text-sm">
          <ShieldAlert className="w-8 h-8 text-amber-600 shrink-0" />
          <div className="flex-1">
            <h4 className="font-bold text-stone-900">Academic College Demonstration Notice</h4>
            <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
              KrishiConnect is developed as a student college project. All farmer accounts, scientific advisors, crop cases, and fee structures represent demonstration data stored exclusively in the browser's localStorage. No real financial transactions or live tele-health calls are made.
            </p>
          </div>
          <div className="shrink-0 flex gap-2">
            <button
              onClick={onOpenFarmerAuth}
              className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-2 rounded-xl transition-colors"
            >
              Farmer Login
            </button>
            <button
              onClick={onOpenExpertAuth}
              className="text-xs font-bold text-stone-900 bg-stone-200 hover:bg-stone-300 px-3 py-2 rounded-xl transition-colors"
            >
              Expert Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
