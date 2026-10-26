import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, MapPin, Mail, Phone, Calendar, Save, CheckCircle2 } from 'lucide-react';
import { saveFarmer } from '../../utils/storage';

export const FarmerProfileView: React.FC = () => {
  const { farmer, showToast } = useApp();

  const [fullName, setFullName] = useState(farmer?.fullName || '');
  const [email] = useState(farmer?.email || '');
  const [location, setLocation] = useState(farmer?.location || '');
  const [phone, setPhone] = useState(farmer?.phone || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!farmer) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !location.trim()) {
      showToast('Name and Location are required.', 'error');
      return;
    }

    const updated = {
      ...farmer,
      fullName: fullName.trim(),
      location: location.trim(),
      phone: phone.trim()
    };

    saveFarmer(updated);
    setIsSaved(true);
    showToast('Farmer profile details updated successfully.', 'success');
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-4 pb-6 border-b border-stone-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 font-extrabold text-2xl flex items-center justify-center border border-emerald-300">
            {farmer.fullName[0] || 'F'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-900">{farmer.fullName}</h2>
            <p className="text-sm text-stone-500 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-4 h-4 text-emerald-600" /> {farmer.location}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Email Address (Login ID)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-100 border border-stone-200 rounded-xl text-stone-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Farm Location (District, State)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
            <strong>Demonstration Account Note:</strong> Profile changes are persisted in browser localStorage and will remain available after reloading.
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2"
            >
              {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {isSaved ? 'Changes Saved!' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
