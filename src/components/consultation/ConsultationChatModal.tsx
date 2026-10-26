import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { AppointmentBooking, ChatMessage } from '../../types';
import {
  X,
  Send,
  MessageSquare,
  Sprout,
  ShieldAlert,
  Clock,
  User,
  Calendar,
  Sparkles
} from 'lucide-react';

interface ConsultationChatModalProps {
  booking: AppointmentBooking | null;
  onClose: () => void;
}

export const ConsultationChatModal: React.FC<ConsultationChatModalProps> = ({
  booking,
  onClose
}) => {
  const { role, farmer, expert, sendChatMessage, getBookingMessages } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages for this booking
  useEffect(() => {
    if (booking) {
      setMessages(getBookingMessages(booking.id));
    }
  }, [booking]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!booking) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = sendChatMessage(booking.id, inputText.trim());
    if (newMsg) {
      setMessages((prev) => [...prev, newMsg]);
      setInputText('');
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputText(prompt);
  };

  // Quick suggestions based on current role
  const quickSuggestions =
    role === 'farmer'
      ? [
          'Can you recommend a safe bio-fungicide?',
          'What is the ideal spray timing during the day?',
          'Should I irrigate the field before spraying?',
          'How many days will it take for symptoms to subside?'
        ]
      : [
          'Please ensure 200 liters of clean water per acre for uniform coverage.',
          'Spray early in the morning before temperatures exceed 28°C.',
          'Please share if new tillers/shoots are also showing symptoms.',
          'Stop excessive nitrogen fertilizer applications until the infection clears.'
        ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden flex flex-col h-[85vh]">
        {/* Chat Room Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-800 p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs">
              <MessageSquare className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Consultation Discussion</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-emerald-100 uppercase">
                  {booking.status}
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                {booking.cropName} Consultation • Farmer: {booking.farmerName} • Expert: {booking.expertName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Consultation Context Banner */}
        <div className="bg-emerald-50/90 border-b border-emerald-200 px-4 py-2.5 text-xs text-emerald-950 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span className="font-semibold">{booking.date} ({booking.timeSlot})</span>
            <span className="text-emerald-700">•</span>
            <span className="text-stone-600 truncate max-w-xs">{booking.problemDescription}</span>
          </div>
          <div className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
            Demonstration Messaging System
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-stone-400 space-y-2">
              <Sprout className="w-8 h-8 mx-auto text-emerald-400" />
              <p className="text-xs">No consultation messages yet.</p>
              <p className="text-[11px] text-stone-400">
                Send a greeting or describe the crop condition to start.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isSenderCurrentFarmer = role === 'farmer' && msg.senderRole === 'farmer';
              const isSenderCurrentExpert = role === 'expert' && msg.senderRole === 'expert';
              const isMe = isSenderCurrentFarmer || isSenderCurrentExpert;
              const isSystem = msg.senderId === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="text-center my-3">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-stone-200 text-stone-700">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-500 mb-0.5 px-1">
                    <span className="font-bold text-stone-700">{msg.senderName}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-semibold uppercase ${
                        msg.senderRole === 'expert'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {msg.senderRole}
                    </span>
                    <span>•</span>
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isMe
                        ? 'bg-emerald-700 text-white rounded-tr-none'
                        : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-stone-100 overflow-x-auto shrink-0 flex items-center gap-1.5 scrollbar-none">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Prompts:
          </span>
          {quickSuggestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickPrompt(q)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-100 hover:text-emerald-900 text-stone-700 transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder={
              role === 'farmer'
                ? 'Type your question or symptom update...'
                : 'Type scientific recommendation or dosage...'
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
