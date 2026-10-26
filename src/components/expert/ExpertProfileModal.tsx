import React from 'react';
import { useApp } from '../../context/AppContext';
import { ExpertProfile } from '../../types';
import {
  X,
  GraduationCap,
  Briefcase,
  Languages,
  Calendar,
  Star,
  ShieldAlert,
  IndianRupee,
  Sprout,
  CheckCircle2
} from 'lucide-react';

interface ExpertProfileModalProps {
  expert: ExpertProfile | null;
  onClose: () => void;
  onBook: (expert: ExpertProfile) => void;
}

export const ExpertProfileModal: React.FC<ExpertProfileModalProps> = ({
  expert,
  onClose,
  onBook
}) => {
  if (!expert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden my-6">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-green-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={expert.avatarUrl}
              alt={expert.fullName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white/20 shadow-md"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/20 text-emerald-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-300" /> Demonstration Expert Profile
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">{expert.fullName}</h2>
              <p className="text-emerald-200 text-sm font-medium">{expert.specialization}</p>
              <div className="flex items-center gap-3 pt-1 text-xs text-emerald-100">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-300" /> {expert.experienceYears} Years Experience
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> {expert.rating} ({expert.reviewCount} Reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Qualifications & Fees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wider mb-1">
                <GraduationCap className="w-4 h-4 text-emerald-600" /> Educational Qualifications
              </div>
              <p className="text-sm font-bold text-stone-900">{expert.qualification}</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                <IndianRupee className="w-4 h-4 text-emerald-700" /> Consultation Fee
              </div>
              <p className="text-xl font-extrabold text-emerald-950">
                ₹{expert.consultationFee}{' '}
                <span className="text-xs font-normal text-emerald-700">per 30-min session</span>
              </p>
            </div>
          </div>

          {/* Biography */}
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
              Professional Biography & Scientific Background
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed bg-white border border-stone-200 p-4 rounded-xl">
              {expert.bio}
            </p>
          </div>

          {/* Supported Crops */}
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-emerald-600" /> Crops Specialized In
            </h4>
            <div className="flex flex-wrap gap-2">
              {expert.crops.map((crop) => (
                <span
                  key={crop}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200 flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {crop}
                </span>
              ))}
            </div>
          </div>

          {/* Languages spoken */}
          {expert.languages && expert.languages.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-stone-500" /> Languages Spoken for Consultation
              </h4>
              <div className="flex flex-wrap gap-2">
                {expert.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Demonstration Notice */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
            <strong>Demonstration Notice:</strong> This profile is realistic sample data for academic demonstration purposes only. Consultations and messages are simulated through browser localStorage.
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBook(expert);
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Book Consultation (₹{expert.consultationFee})
          </button>
        </div>
      </div>
    </div>
  );
};
