import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Award, Lock, Mail, User, GraduationCap, Briefcase, IndianRupee, Sparkles, BookOpen } from 'lucide-react';
import { CROP_LIST } from '../../data/seedData';

interface ExpertAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const ExpertAuthModal: React.FC<ExpertAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login'
}) => {
  const { loginExpert, registerExpert } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [qualification, setQualification] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experienceYears, setExperienceYears] = useState<number>(8);
  const [selectedCrops, setSelectedCrops] = useState<string[]>(['Wheat', 'Rice (Paddy)', 'Tomato']);
  const [consultationFee, setConsultationFee] = useState<number>(400);
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [languages, setLanguages] = useState('Hindi, English');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleFillDemo = (demoType: 'rajesh' | 'anita') => {
    if (demoType === 'rajesh') {
      setEmail('rajesh.sharma@krishiconnect.in');
      setPassword('expert123');
      setFullName('Dr. Rajesh Sharma');
      setQualification('Ph.D. Plant Pathology (IARI, New Delhi)');
      setSpecialization('Plant Pathology & Crop Disease Control');
    } else {
      setEmail('anita.deshmukh@krishiconnect.in');
      setPassword('expert123');
      setFullName('Dr. Anita Deshmukh');
      setQualification('Ph.D. Entomology (PAU Ludhiana)');
      setSpecialization('Integrated Pest Management (IPM) & Entomology');
    }
    setFormError('');
  };

  const toggleCrop = (crop: string) => {
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter((c) => c !== crop));
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        setFormError('Please enter both email and password.');
        return;
      }
      const ok = loginExpert(email, password);
      if (ok) {
        onClose();
      }
    } else {
      // Register validation
      if (!fullName.trim() || !email.trim() || !password.trim() || !qualification.trim() || !specialization.trim()) {
        setFormError('Please complete all required fields.');
        return;
      }
      if (selectedCrops.length === 0) {
        setFormError('Please select at least one crop you can advise on.');
        return;
      }
      if (consultationFee <= 0) {
        setFormError('Please specify a valid consultation fee in INR (₹).');
        return;
      }

      registerExpert({
        fullName: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
        qualification: qualification.trim(),
        specialization: specialization.trim(),
        experienceYears: Number(experienceYears) || 5,
        crops: selectedCrops,
        consultationFee: Number(consultationFee) || 400,
        bio: bio.trim() || 'Agricultural specialist dedicated to evidence-based farm advisory.',
        avatarUrl:
          avatarUrl.trim() ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        languages: languages.split(',').map((l) => l.trim()).filter(Boolean)
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-stone-100 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-700/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs">
              <Award className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Agricultural Expert Portal</h3>
              <p className="text-xs text-emerald-100/90">
                {mode === 'login' ? 'Sign in to review farmer queries and requests' : 'Register your scientific expertise'}
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
                onClick={() => handleFillDemo('rajesh')}
                className="px-2 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-medium text-[11px] transition-colors"
              >
                Dr. Rajesh
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('anita')}
                className="px-2 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-medium text-[11px] transition-colors"
              >
                Dr. Anita
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
            Expert Sign In
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
            Expert Registration
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
              {formError}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Full Name (with Prefix) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Harish Chandra"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="expert@krishiconnect.in"
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Educational Qualifications <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ph.D. Agronomy, M.Sc. Agriculture"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Specialization <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Plant Pathology"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Years of Experience <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Consultation Fee (₹ INR) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    min="100"
                    max="5000"
                    step="50"
                    required
                    placeholder="400"
                    value={consultationFee}
                    onChange={(e) => setConsultationFee(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">Demonstration fee displayed to farmers (simulated).</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Crops You Advise On <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap gap-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl max-h-32 overflow-y-auto">
                  {CROP_LIST.map((crop) => {
                    const isSelected = selectedCrops.includes(crop);
                    return (
                      <button
                        type="button"
                        key={crop}
                        onClick={() => toggleCrop(crop)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                          isSelected
                            ? 'bg-emerald-700 border-emerald-700 text-white'
                            : 'bg-white border-stone-300 text-stone-700 hover:border-emerald-500'
                        }`}
                      >
                        {crop} {isSelected ? '✓' : '+'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Professional Biography
                </label>
                <textarea
                  rows={2}
                  placeholder="Share your research background, institution, and advisory expertise..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl transition-all shadow-md shadow-emerald-800/20 active:scale-98"
          >
            {mode === 'login' ? 'Sign In as Expert' : 'Register Expert Account'}
          </button>

          <p className="text-[11px] text-center text-stone-500 pt-1">
            Demonstration accounts are saved securely in browser localStorage.
          </p>
        </form>
      </div>
    </div>
  );
};
