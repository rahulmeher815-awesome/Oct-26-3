import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sprout, Lock, Mail, User, MapPin, Sparkles } from 'lucide-react';

interface FarmerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const FarmerAuthModal: React.FC<FarmerAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login'
}) => {
  const { loginFarmer, registerFarmer } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleFillDemo = (demoType: 'ramesh' | 'sunita') => {
    if (demoType === 'ramesh') {
      setEmail('ramesh.patel@gmail.com');
      setPassword('farmer123');
      setFullName('Ramesh Patel');
      setLocation('Ludhiana, Punjab');
    } else {
      setEmail('sunita.devi@gmail.com');
      setPassword('farmer123');
      setFullName('Sunita Devi');
      setLocation('Nashik, Maharashtra');
    }
    setFormError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        setFormError('Please enter both email and password.');
        return;
      }
      const ok = loginFarmer(email, password);
      if (ok) {
        onClose();
      }
    } else {
      // Register validation
      if (!fullName.trim() || !email.trim() || !password.trim() || !location.trim()) {
        setFormError('Please fill in all required fields (Full name, Email, Password, Location).');
        return;
      }
      if (password.length < 4) {
        setFormError('Password should be at least 4 characters for testing.');
        return;
      }

      registerFarmer({
        fullName: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
        location: location.trim(),
        phone: phone.trim() || '+91 98000 00000'
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-stone-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-600/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs">
              <Sprout className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Farmer Portal</h3>
              <p className="text-xs text-emerald-100/90">
                {mode === 'login' ? 'Sign in to access your consultations' : 'Create your farmer account'}
              </p>
            </div>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Quick Demo Login:
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleFillDemo('ramesh')}
                className="px-2 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-medium text-[11px] transition-colors"
              >
                Ramesh (Punjab)
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('sunita')}
                className="px-2 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-medium text-[11px] transition-colors"
              >
                Sunita (MH)
              </button>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setFormError('');
            }}
            className={`flex-1 py-3 text-sm font-semibold text-center border-b-2 transition-colors ${
              mode === 'login'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Farmer Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setFormError('');
            }}
            className={`flex-1 py-3 text-sm font-semibold text-center border-b-2 transition-colors ${
              mode === 'register'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            New Farmer Registration
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
              {formError}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Harpreet Singh"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="farmer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Location (District, State) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ludhiana, Punjab"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Mobile Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-98"
          >
            {mode === 'login' ? 'Sign In as Farmer' : 'Complete Farmer Registration'}
          </button>

          <p className="text-[11px] text-center text-stone-500 pt-1">
            Demo data stored safely in your browser's local storage.
          </p>
        </form>
      </div>
    </div>
  );
};
