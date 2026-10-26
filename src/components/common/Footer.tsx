import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, RotateCcw, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, role, resetAllDemoData, setFilterByCrop } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Krishi<span className="text-emerald-400">Connect</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Connecting Indian farmers with certified agricultural experts for rapid crop diagnosis, scientific pest control, and personalized consultation.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950 border border-emerald-800 text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Academic College Project
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveView(role === 'guest' ? 'home' : 'dashboard')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {role === 'guest' ? 'Home' : 'Dashboard'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('experts')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Agricultural Experts Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('how-it-works')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  How KrishiConnect Works
                </button>
              </li>
            </ul>
          </div>

          {/* Crops Supported */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Popular Crops
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['Wheat', 'Rice (Paddy)', 'Cotton', 'Tomato', 'Potato', 'Maize (Corn)', 'Soybean', 'Chili'].map((crop) => (
                <button
                  key={crop}
                  onClick={() => {
                    setFilterByCrop(crop);
                    setActiveView('experts');
                  }}
                  className="text-xs px-2 py-1 rounded bg-stone-800 text-stone-300 hover:bg-emerald-900 hover:text-emerald-200 transition-colors"
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Demonstration Notice & Reset */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Demonstration Storage
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              All accounts, expert profiles, crop queries, and appointments are stored in your browser's <strong className="text-stone-200">localStorage</strong> for demonstration purposes. No real payment or backend server is required.
            </p>
            <button
              onClick={() => {
                if (window.confirm('Reset all demo data back to default sample records?')) {
                  resetAllDemoData();
                }
              }}
              className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              Reset Demonstration Data
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} KrishiConnect. Developed for Academic Project Demonstration.</p>
          <p className="flex items-center gap-1">
            Built with React, TypeScript & Vite
          </p>
        </div>
      </div>
    </footer>
  );
};
