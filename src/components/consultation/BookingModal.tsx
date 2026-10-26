import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExpertProfile, AppointmentBooking } from '../../types';
import { CROP_LIST, TIME_SLOTS } from '../../data/seedData';
import { isSlotAlreadyBooked } from '../../utils/storage';
import {
  X,
  Calendar,
  Clock,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Sprout,
  ArrowRight
} from 'lucide-react';

interface BookingModalProps {
  expert: ExpertProfile | null;
  onClose: () => void;
  onSuccess: (booking: AppointmentBooking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  expert,
  onClose,
  onSuccess
}) => {
  const { farmer, submitBooking, showToast } = useApp();

  // Set default tomorrow date in YYYY-MM-DD format
  const getTomorrowString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [cropName, setCropName] = useState<string>(
    expert?.crops[0] || 'Wheat'
  );
  const [problemDescription, setProblemDescription] = useState('');
  const [date, setDate] = useState<string>(getTomorrowString());
  const [timeSlot, setTimeSlot] = useState<string>(TIME_SLOTS[0]);
  const [bookingError, setBookingError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);

  if (!expert) return null;

  // Minimum selectable date is today
  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');

    if (!problemDescription.trim() || problemDescription.trim().length < 5) {
      setBookingError('Please enter a brief description of the crop problem.');
      return;
    }

    if (!date) {
      setBookingError('Please pick an appointment date.');
      return;
    }

    // Call submit booking
    const res = submitBooking({
      expertId: expert.id,
      cropName,
      problemDescription: problemDescription.trim(),
      date,
      timeSlot
    });

    if (res.success && res.booking) {
      setConfirmedBooking(res.booking);
      onSuccess(res.booking);
    } else if (res.error) {
      setBookingError(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-600/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs">
              <Calendar className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Book Consultation</h3>
              <p className="text-xs text-emerald-100">
                Schedule a 30-minute advisory session with {expert.fullName}
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h4 className="text-2xl font-bold text-stone-900">Appointment Requested!</h4>
              <p className="text-xs text-stone-500">
                Booking Reference: <strong className="text-stone-800">{confirmedBooking.id}</strong>
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-stone-500">Consultant:</span>
                <span className="font-bold text-stone-900">{confirmedBooking.expertName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Specialization:</span>
                <span className="text-stone-800">{confirmedBooking.expertSpecialization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Crop:</span>
                <span className="font-bold text-emerald-800">{confirmedBooking.cropName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Date & Slot:</span>
                <span className="font-bold text-stone-900">
                  {confirmedBooking.date} • {confirmedBooking.timeSlot}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200">
                <span className="text-stone-500">Simulated Fee:</span>
                <span className="font-extrabold text-sm text-stone-900">₹{confirmedBooking.fee}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs text-left">
              <strong>Simulated Demo Process:</strong> No real payment was charged. The appointment request is now visible in the Expert's dashboard for acceptance and in your 'My Appointments' tab.
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-colors"
            >
              Done & Return to Appointments
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {bookingError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{bookingError}</span>
              </div>
            )}

            {/* Selected Expert Summary Card */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={expert.avatarUrl}
                  alt={expert.fullName}
                  className="w-12 h-12 rounded-xl object-cover border border-emerald-300"
                />
                <div>
                  <h4 className="font-bold text-sm text-emerald-950">{expert.fullName}</h4>
                  <p className="text-xs text-emerald-800">{expert.specialization}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-500 block uppercase font-bold">Fee</span>
                <span className="text-base font-extrabold text-emerald-950">₹{expert.consultationFee}</span>
              </div>
            </div>

            {/* Farmer's Crop */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Your Crop <span className="text-rose-500">*</span>
              </label>
              <select
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                {CROP_LIST.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            {/* Problem Description */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Description of the Problem <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                required
                placeholder="What specific issue do you want to discuss with this expert?"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Appointment Date */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Appointment Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                min={todayStr}
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              <p className="text-[11px] text-stone-400 mt-1">Past dates are automatically disabled.</p>
            </div>

            {/* Available Time Slot with Conflict Detection */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Available Time Slot</span>
                <span className="text-[11px] text-stone-400 font-normal">30-minute consultation</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isBusy = isSlotAlreadyBooked(expert.id, date, slot);
                  const isSelected = timeSlot === slot;

                  return (
                    <button
                      type="button"
                      key={slot}
                      disabled={isBusy}
                      onClick={() => setTimeSlot(slot)}
                      className={`text-xs p-2.5 rounded-xl border text-left font-medium transition-colors flex items-center justify-between ${
                        isBusy
                          ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-emerald-700 text-white border-emerald-700 font-bold shadow-xs'
                          : 'bg-white text-stone-800 border-stone-300 hover:border-emerald-500'
                      }`}
                    >
                      <span>{slot}</span>
                      {isBusy && <span className="text-[10px] text-rose-500 font-semibold no-underline">Booked</span>}
                      {isSelected && !isBusy && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Payment Notice */}
            <div className="p-3 bg-stone-100 rounded-xl text-stone-600 text-xs flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Demonstration Booking: Fee is ₹{expert.consultationFee}. No real payment required.
              </span>
            </div>

            {/* Confirm Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Confirm Consultation Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
