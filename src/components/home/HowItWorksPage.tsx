import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  HelpCircle,
  FileQuestion,
  Search,
  CalendarCheck,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Database,
  CheckCircle2
} from 'lucide-react';

interface HowItWorksPageProps {
  onOpenFarmerAuth: () => void;
  onOpenExpertAuth: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onOpenFarmerAuth,
  onOpenExpertAuth
}) => {
  const { setActiveView } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
          Workflow & Guidelines
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
          How KrishiConnect Works
        </h1>
        <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base">
          KrishiConnect connects Indian farmers directly with specialized agricultural scientists to diagnose crop diseases, manage pests, and maximize crop yields.
        </p>
      </div>

      {/* Two Tracks: Farmer Journey & Expert Journey */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Farmer Journey */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
              🌾
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900">For Farmers</h2>
              <p className="text-xs text-stone-500">Get timely diagnosis and treatment plans</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Register or Sign In</h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Sign in with your name and location (district/state). You can also use one of the pre-filled demo accounts (Ramesh or Sunita) for fast evaluation.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Post a Crop Question</h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Select your crop (Rice, Wheat, Tomato, Potato, Cotton, etc.), specify the problem category (Pest, Disease, Deficiency), and write down symptoms. You can upload an image or select a sample photo.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Book an Expert Consultation</h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Filter by your crop to find specialists like Plant Pathologists or Entomologists. Choose an open date and time slot.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                4
              </span>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Exchange Advice in Messaging Room</h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Once your appointment is confirmed, discuss symptoms, recommended chemical or biological sprays, and dosage instructions.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenFarmerAuth}
            className="w-full py-2.5 px-4 rounded-xl text-center text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-2xs"
          >
            Start as Farmer
          </button>
        </div>

        {/* Expert Journey */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-lg">
              🔬
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900">For Agricultural Experts</h2>
              <p className="text-xs text-stone-500">Provide research-backed crop advisory</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Create Expert Profile</h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Input your degrees (M.Sc., Ph.D.), specialization, years of experience, supported crops, and consultation fee in INR (₹).
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Answer Public Farmer Queries</h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Browse the public questions feed. Farmers describe crop symptoms; you can prescribe scientific remedies directly on their post.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Review Booking Requests</h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Accept or decline incoming booking requests with details on the crop and farmer location.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                4
              </span>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Manage Appointments & Fees</h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Update your consultation fees anytime from your profile dashboard and chat with booked farmers.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenExpertAuth}
            className="w-full py-2.5 px-4 rounded-xl text-center text-sm font-semibold text-teal-900 bg-teal-100 hover:bg-teal-200 transition-colors shadow-2xs"
          >
            Start as Agricultural Expert
          </button>
        </div>
      </div>

      {/* College Project Architecture Highlight */}
      <div className="bg-emerald-950 text-emerald-100 p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 text-amber-300 text-sm font-bold">
          <Database className="w-5 h-5" /> LocalStorage Persistence Architecture
        </div>
        <h3 className="text-2xl font-bold text-white">
          Self-Contained College Demonstration
        </h3>
        <p className="text-sm text-emerald-200/90 leading-relaxed">
          In compliance with the project specifications, this website avoids external paid cloud databases or third-party APIs. All registration records, appointments, time slot conflict checks, and message exchanges persist in the user's browser localStorage.
        </p>
        <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 bg-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Double Booking Prevention
          </span>
          <span className="flex items-center gap-1.5 bg-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Past Date Validation
          </span>
          <span className="flex items-center gap-1.5 bg-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dynamic Crop Filtering
          </span>
          <span className="flex items-center gap-1.5 bg-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> GitHub Pages Compatible
          </span>
        </div>
      </div>
    </div>
  );
};
