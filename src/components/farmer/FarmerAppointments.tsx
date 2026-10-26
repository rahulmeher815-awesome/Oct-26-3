import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppointmentBooking } from '../../types';
import {
  Calendar,
  Clock,
  MessageSquare,
  XCircle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Search,
  IndianRupee,
  UserCheck
} from 'lucide-react';

export const FarmerAppointments: React.FC = () => {
  const {
    farmer,
    bookings,
    changeBookingStatus,
    setActiveChatBooking,
    setActiveView
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');

  if (!farmer) return null;

  // Filter bookings for this farmer
  const farmerBookings = bookings.filter((b) => b.farmerId === farmer.id);

  const filtered = farmerBookings.filter((b) => {
    if (filterStatus === 'all') return true;
    return b.status === filterStatus;
  });

  const handleCancel = (booking: AppointmentBooking) => {
    if (window.confirm(`Are you sure you want to cancel your appointment with ${booking.expertName} on ${booking.date}?`)) {
      changeBookingStatus(booking.id, 'cancelled');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            My Appointments
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Track your consultations with agricultural specialists and launch chat sessions.
          </p>
        </div>
        <button
          onClick={() => setActiveView('experts')}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shadow-2xs"
        >
          + Book New Consultation
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
        {[
          { key: 'all', label: `All (${farmerBookings.length})` },
          {
            key: 'confirmed',
            label: `Confirmed (${farmerBookings.filter((b) => b.status === 'confirmed').length})`
          },
          {
            key: 'pending',
            label: `Pending Requests (${farmerBookings.filter((b) => b.status === 'pending').length})`
          },
          {
            key: 'cancelled',
            label: `Cancelled / Declined (${farmerBookings.filter((b) => b.status === 'cancelled' || b.status === 'declined').length})`
          }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterStatus === tab.key
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-800">No appointments found in this category</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            You can book an expert consultation anytime by searching our specialist directory.
          </p>
          <button
            onClick={() => setActiveView('experts')}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Browse Agricultural Experts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((b) => {
            let statusBadge = (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Pending Expert Acceptance
              </span>
            );

            if (b.status === 'confirmed') {
              statusBadge = (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Confirmed Appointment
                </span>
              );
            } else if (b.status === 'cancelled') {
              statusBadge = (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-600 border border-stone-200">
                  <XCircle className="w-3.5 h-3.5 text-stone-500" /> Cancelled by You
                </span>
              );
            } else if (b.status === 'declined') {
              statusBadge = (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-200">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" /> Declined by Expert
                </span>
              );
            }

            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                      Booking Reference: {b.id}
                    </span>
                    <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                      Consultation for {b.cropName} Crop
                    </h3>
                  </div>
                  <div>{statusBadge}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <span className="text-stone-400 font-bold uppercase tracking-wider block mb-1">
                      Agricultural Specialist
                    </span>
                    <p className="font-bold text-stone-900 text-sm">{b.expertName}</p>
                    <p className="text-stone-600">{b.expertSpecialization}</p>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <span className="text-stone-400 font-bold uppercase tracking-wider block mb-1">
                      Date & Time Slot
                    </span>
                    <p className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-700" /> {b.date}
                    </p>
                    <p className="text-stone-600 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-stone-500" /> {b.timeSlot}
                    </p>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <span className="text-stone-400 font-bold uppercase tracking-wider block mb-1">
                      Simulated Fee
                    </span>
                    <p className="font-extrabold text-stone-900 text-base">₹{b.fee}</p>
                    <p className="text-stone-500 text-[11px]">30-minute demonstration session</p>
                  </div>
                </div>

                {/* Problem Description */}
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Problem Summary Submitted:
                  </h4>
                  <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                    {b.problemDescription}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] text-stone-400">
                    Requested on {new Date(b.createdAt).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Messaging is available for all active bookings */}
                    <button
                      onClick={() => setActiveChatBooking(b)}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Open Consultation Chat
                    </button>

                    {(b.status === 'pending' || b.status === 'confirmed') && (
                      <button
                        onClick={() => handleCancel(b)}
                        className="px-3 py-2 bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-700 text-xs font-semibold rounded-xl border border-stone-200 transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
