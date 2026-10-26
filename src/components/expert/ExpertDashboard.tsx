import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExpertProfile, AppointmentBooking } from '../../types';
import { CROP_LIST } from '../../data/seedData';
import {
  Award,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileQuestion,
  User,
  IndianRupee,
  GraduationCap,
  Briefcase,
  Save,
  MessageSquare,
  Sparkles,
  MapPin,
  Send,
  AlertCircle
} from 'lucide-react';

export const ExpertDashboard: React.FC = () => {
  const {
    expert,
    bookings,
    questions,
    changeBookingStatus,
    saveExpertDetails,
    submitAnswer,
    setActiveChatBooking,
    activeView,
    setActiveView
  } = useApp();

  // Active sub-tab in expert dashboard
  const [expertTab, setExpertTab] = useState<'overview' | 'requests' | 'questions' | 'profile'>(
    activeView === 'requests'
      ? 'requests'
      : activeView === 'questions'
      ? 'questions'
      : activeView === 'profile'
      ? 'profile'
      : 'overview'
  );

  // Profile editing local states
  const [fullName, setFullName] = useState(expert?.fullName || '');
  const [qualification, setQualification] = useState(expert?.qualification || '');
  const [specialization, setSpecialization] = useState(expert?.specialization || '');
  const [experienceYears, setExperienceYears] = useState(expert?.experienceYears || 10);
  const [consultationFee, setConsultationFee] = useState(expert?.consultationFee || 400);
  const [bio, setBio] = useState(expert?.bio || '');
  const [selectedCrops, setSelectedCrops] = useState<string[]>(expert?.crops || []);
  const [profileSaved, setProfileSaved] = useState(false);

  // Answering farmer question state
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [answerDraft, setAnswerDraft] = useState('');

  if (!expert) return null;

  // Bookings specifically for this expert
  const myBookings = bookings.filter((b) => b.expertId === expert.id);
  const pendingRequests = myBookings.filter((b) => b.status === 'pending');
  const confirmedAppointments = myBookings.filter((b) => b.status === 'confirmed');

  // Toggle crop selection
  const handleToggleCrop = (crop: string) => {
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter((c) => c !== crop));
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  // Save profile changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !qualification.trim() || !specialization.trim()) {
      return;
    }
    const updated: ExpertProfile = {
      ...expert,
      fullName: fullName.trim(),
      qualification: qualification.trim(),
      specialization: specialization.trim(),
      experienceYears: Number(experienceYears) || 5,
      consultationFee: Number(consultationFee) || 400,
      bio: bio.trim(),
      crops: selectedCrops
    };

    saveExpertDetails(updated);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  // Submit expert advice on a farmer question
  const handleSendAnswer = (questionId: string) => {
    if (!answerDraft.trim()) return;
    const ok = submitAnswer(questionId, answerDraft.trim());
    if (ok) {
      setAnswerDraft('');
      setActiveQuestionId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            Agricultural Expert Portal
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {expert.fullName}
          </h1>

          <p className="text-emerald-200 text-sm sm:text-base font-medium">
            {expert.specialization} • {expert.qualification}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-emerald-100">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg">
              <Briefcase className="w-3.5 h-3.5 text-amber-300" /> {expert.experienceYears} Years Research & Advisory
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg">
              <IndianRupee className="w-3.5 h-3.5 text-amber-300" /> Current Fee: ₹{expert.consultationFee}
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-emerald-300" /> {confirmedAppointments.length} Confirmed Sessions
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setExpertTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            expertTab === 'overview'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Upcoming Appointments ({confirmedAppointments.length})</span>
        </button>

        <button
          onClick={() => setExpertTab('requests')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            expertTab === 'requests'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Booking Requests</span>
          {pendingRequests.length > 0 && (
            <span className="bg-amber-400 text-stone-900 text-xs font-extrabold px-2 py-0.2 rounded-full">
              {pendingRequests.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setExpertTab('questions')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            expertTab === 'questions'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <FileQuestion className="w-4 h-4" />
          <span>Farmer Questions ({questions.length})</span>
        </button>

        <button
          onClick={() => setExpertTab('profile')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            expertTab === 'profile'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Edit Profile & Fee</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & UPCOMING CONFIRMED APPOINTMENTS */}
      {expertTab === 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-stone-900">Confirmed Appointments</h2>
            <span className="text-xs text-stone-500 font-medium">
              Ready for consultation messaging
            </span>
          </div>

          {confirmedAppointments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-800">No confirmed appointments right now</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Pending requests accepted by you will appear here with instant consultation chat rooms.
              </p>
              {pendingRequests.length > 0 && (
                <button
                  onClick={() => setExpertTab('requests')}
                  className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl"
                >
                  Review {pendingRequests.length} Pending Booking Requests
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {confirmedAppointments.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-xs font-bold text-emerald-800 px-2.5 py-0.5 rounded-lg bg-emerald-100">
                      Crop: {b.cropName}
                    </span>
                    <span className="text-xs font-extrabold text-stone-900">Fee: ₹{b.fee}</span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-stone-900">{b.farmerName}</h4>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {b.farmerLocation}
                    </p>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-xs">
                    <span className="text-stone-400 font-bold uppercase tracking-wider block mb-0.5">
                      Problem Summary:
                    </span>
                    <p className="text-stone-700">{b.problemDescription}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
                    <span className="font-semibold flex items-center gap-1 text-emerald-900">
                      <Calendar className="w-3.5 h-3.5" /> {b.date} ({b.timeSlot})
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-end">
                    <button
                      onClick={() => setActiveChatBooking(b)}
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <MessageSquare className="w-4 h-4" /> Open Consultation Chat Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: BOOKING REQUESTS (ACCEPT / DECLINE) */}
      {expertTab === 'requests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Consultation Booking Requests</h2>
              <p className="text-xs text-stone-500">
                Review farmer crop cases and decide whether to accept or decline.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
              {pendingRequests.length} Pending
            </span>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-bold text-stone-800">All caught up!</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No new pending booking requests. When farmers book a slot with you, it will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendingRequests.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-amber-200 ring-2 ring-amber-400/20 p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        New Request • {b.id}
                      </span>
                      <h3 className="text-lg font-bold text-stone-900 mt-1">
                        {b.farmerName} • <span className="text-emerald-700">{b.cropName} Crop</span>
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Proposed Fee</span>
                      <span className="text-lg font-extrabold text-stone-900">₹{b.fee}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                      <span className="text-stone-400 font-bold uppercase block mb-1">Farmer Location</span>
                      <p className="font-bold text-stone-800">{b.farmerLocation}</p>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                      <span className="text-stone-400 font-bold uppercase block mb-1">Requested Date</span>
                      <p className="font-bold text-stone-800">{b.date}</p>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                      <span className="text-stone-400 font-bold uppercase block mb-1">Time Slot</span>
                      <p className="font-bold text-stone-800">{b.timeSlot}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                      Problem Description Provided by Farmer:
                    </h4>
                    <p className="text-sm text-stone-800 bg-stone-50 p-3 rounded-xl border border-stone-100 leading-relaxed">
                      {b.problemDescription}
                    </p>
                  </div>

                  {/* Accept / Decline Action Buttons */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        if (window.confirm('Decline this consultation request?')) {
                          changeBookingStatus(b.id, 'declined');
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" /> Decline Request
                    </button>
                    <button
                      onClick={() => {
                        changeBookingStatus(b.id, 'confirmed');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-md shadow-emerald-700/20 active:scale-95 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Accept Consultation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FARMER QUESTIONS FEED */}
      {expertTab === 'questions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Farmer Questions Community Feed</h2>
              <p className="text-xs text-stone-500">
                Provide scientific remedies, pesticide recommendations, and dosage for farmer cases.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {questions.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4"
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
                  <div className="text-xs text-stone-500">
                    Asked by <strong>{q.farmerName}</strong> ({q.farmerLocation}) on{' '}
                    {new Date(q.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className={`${q.photoUrl ? 'md:col-span-3' : 'md:col-span-4'} space-y-2`}>
                    <div>
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                        Problem Description:
                      </h4>
                      <p className="text-sm text-stone-800 leading-relaxed mt-0.5">{q.description}</p>
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

                {/* Existing Answers */}
                {q.answers.length > 0 && (
                  <div className="pt-3 border-t border-stone-100 space-y-2">
                    <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Answers Posted:
                    </h5>
                    {q.answers.map((ans) => (
                      <div
                        key={ans.id}
                        className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs text-stone-800 space-y-1"
                      >
                        <div className="font-bold text-emerald-950 flex justify-between">
                          <span>{ans.expertName}</span>
                          <span className="text-stone-400 font-normal">
                            {new Date(ans.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p>{ans.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Provide Expert Advice Box */}
                {activeQuestionId === q.id ? (
                  <div className="pt-3 border-t border-stone-100 space-y-2">
                    <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Write Scientific Recommendation:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify chemical/biological treatment, formulation, dosage per acre/liter, and safety precautions..."
                      value={answerDraft}
                      onChange={(e) => setAnswerDraft(e.target.value)}
                      className="w-full p-3 text-xs bg-stone-50 border border-emerald-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setActiveQuestionId(null);
                          setAnswerDraft('');
                        }}
                        className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSendAnswer(q.id)}
                        className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-2xs"
                      >
                        <Send className="w-3.5 h-3.5" /> Publish Advice
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-end">
                    <button
                      onClick={() => {
                        setActiveQuestionId(q.id);
                        setAnswerDraft('');
                      }}
                      className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Answer this Crop Question
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: EDIT PROFILE & FEE */}
      {expertTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h2 className="text-xl font-bold text-stone-900">Edit Expert Profile & Fee</h2>
            <p className="text-xs text-stone-500">
              Update your research background, consultation pricing, and supported crops. Changes are saved in localStorage.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Email Address (Login ID)
                </label>
                <input
                  type="email"
                  disabled
                  value={expert.email}
                  className="w-full px-3 py-2 text-sm bg-stone-100 border border-stone-200 rounded-xl text-stone-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Educational Qualifications
                </label>
                <input
                  type="text"
                  required
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Specialization
                </label>
                <input
                  type="text"
                  required
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Consultation Fee in Indian Rupees (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    min="100"
                    max="5000"
                    step="50"
                    required
                    value={consultationFee}
                    onChange={(e) => setConsultationFee(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-bold"
                  />
                </div>
                <p className="text-[11px] text-stone-400 mt-1">This fee is displayed when farmers book a consultation.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Years of Experience
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
                Supported Crops
              </label>
              <div className="flex flex-wrap gap-1.5 p-3 bg-stone-50 border border-stone-200 rounded-xl max-h-36 overflow-y-auto">
                {CROP_LIST.map((crop) => {
                  const isChecked = selectedCrops.includes(crop);
                  return (
                    <button
                      type="button"
                      key={crop}
                      onClick={() => handleToggleCrop(crop)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                        isChecked
                          ? 'bg-emerald-700 border-emerald-700 text-white font-bold'
                          : 'bg-white border-stone-300 text-stone-700 hover:border-emerald-500'
                      }`}
                    >
                      {crop} {isChecked ? '✓' : '+'}
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
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-sm transition-all flex items-center gap-2"
              >
                {profileSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {profileSaved ? 'Profile Updated!' : 'Save Expert Profile & Fee'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
