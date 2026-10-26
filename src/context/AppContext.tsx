/**
 * KrishiConnect - Application State Context
 * Handles authentication, data synchronization, modals, and navigation.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  FarmerProfile,
  ExpertProfile,
  FarmerQuestion,
  AppointmentBooking,
  ChatMessage,
  ToastMessage,
  BookingStatus
} from '../types';
import {
  initializeStorage,
  getFarmers,
  saveFarmer,
  getCurrentFarmer,
  setCurrentFarmer,
  getExperts,
  saveExpert,
  updateExpert,
  getCurrentExpert,
  setCurrentExpert,
  getCurrentRole,
  setCurrentRole,
  getQuestions,
  addQuestion as dbAddQuestion,
  addAnswerToQuestion as dbAddAnswer,
  getBookings,
  addBooking as dbAddBooking,
  updateBookingStatus as dbUpdateBookingStatus,
  getMessages,
  addMessage as dbAddMessage,
  resetStorageToDemo,
  isSlotAlreadyBooked
} from '../utils/storage';

interface AppContextType {
  role: UserRole;
  farmer: FarmerProfile | null;
  expert: ExpertProfile | null;
  farmers: FarmerProfile[];
  experts: ExpertProfile[];
  questions: FarmerQuestion[];
  bookings: AppointmentBooking[];
  activeView: string;
  setActiveView: (view: string) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Auth actions
  loginFarmer: (email: string, pass: string) => boolean;
  registerFarmer: (data: Omit<FarmerProfile, 'id' | 'createdAt'>) => FarmerProfile;
  loginExpert: (email: string, pass: string) => boolean;
  registerExpert: (data: Omit<ExpertProfile, 'id' | 'rating' | 'reviewCount' | 'isDemo'>) => ExpertProfile;
  logout: () => void;
  quickSwitchToDemo: (target: 'farmer1' | 'farmer2' | 'expert1' | 'expert2' | 'guest') => void;

  // Business actions
  submitQuestion: (data: {
    cropName: string;
    problemCategory: FarmerQuestion['problemCategory'];
    description: string;
    symptoms: string;
    photoUrl?: string;
  }) => FarmerQuestion | null;
  submitAnswer: (questionId: string, answerText: string) => boolean;
  submitBooking: (data: {
    expertId: string;
    cropName: string;
    problemDescription: string;
    date: string;
    timeSlot: string;
  }) => { success: boolean; error?: string; booking?: AppointmentBooking };
  changeBookingStatus: (bookingId: string, status: BookingStatus) => boolean;
  sendChatMessage: (bookingId: string, text: string) => ChatMessage | null;
  getBookingMessages: (bookingId: string) => ChatMessage[];
  saveExpertDetails: (updated: ExpertProfile) => void;
  resetAllDemoData: () => void;

  // Active modals & target states
  selectedExpertForView: ExpertProfile | null;
  setSelectedExpertForView: (expert: ExpertProfile | null) => void;
  selectedExpertForBooking: ExpertProfile | null;
  setSelectedExpertForBooking: (expert: ExpertProfile | null) => void;
  activeChatBooking: AppointmentBooking | null;
  setActiveChatBooking: (booking: AppointmentBooking | null) => void;
  isAskQuestionModalOpen: boolean;
  setIsAskQuestionModalOpen: (open: boolean) => void;
  filterByCrop?: string;
  setFilterByCrop: (crop?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('guest');
  const [farmer, setFarmerState] = useState<FarmerProfile | null>(null);
  const [expert, setExpertState] = useState<ExpertProfile | null>(null);

  const [farmers, setFarmers] = useState<FarmerProfile[]>([]);
  const [experts, setExperts] = useState<ExpertProfile[]>([]);
  const [questions, setQuestions] = useState<FarmerQuestion[]>([]);
  const [bookings, setBookings] = useState<AppointmentBooking[]>([]);
  const [activeView, setActiveView] = useState<string>('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals & temporary state
  const [selectedExpertForView, setSelectedExpertForView] = useState<ExpertProfile | null>(null);
  const [selectedExpertForBooking, setSelectedExpertForBooking] = useState<ExpertProfile | null>(null);
  const [activeChatBooking, setActiveChatBooking] = useState<AppointmentBooking | null>(null);
  const [isAskQuestionModalOpen, setIsAskQuestionModalOpen] = useState<boolean>(false);
  const [filterByCrop, setFilterByCrop] = useState<string | undefined>(undefined);

  // Sync from localStorage on mount
  const refreshData = () => {
    initializeStorage();
    const loadedFarmers = getFarmers();
    const loadedExperts = getExperts();
    const loadedQuestions = getQuestions();
    const loadedBookings = getBookings();
    const savedRole = getCurrentRole();
    const savedFarmer = getCurrentFarmer();
    const savedExpert = getCurrentExpert();

    setFarmers(loadedFarmers);
    setExperts(loadedExperts);
    setQuestions(loadedQuestions);
    setBookings(loadedBookings);

    setRoleState(savedRole);
    setFarmerState(savedFarmer);
    setExpertState(savedExpert);

    if (savedRole === 'farmer' && savedFarmer) {
      setActiveView('dashboard');
    } else if (savedRole === 'expert' && savedExpert) {
      setActiveView('dashboard');
    } else {
      setActiveView('home');
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Farmer login
  const loginFarmer = (email: string, pass: string): boolean => {
    const target = farmers.find(
      (f) => f.email.toLowerCase().trim() === email.toLowerCase().trim()
    );
    if (!target) {
      showToast('Farmer account not found with this email.', 'error');
      return false;
    }
    if (target.password && target.password !== pass) {
      showToast('Incorrect password entered.', 'error');
      return false;
    }

    setCurrentFarmer(target);
    setCurrentRole('farmer');
    setFarmerState(target);
    setRoleState('farmer');
    setActiveView('dashboard');
    showToast(`Welcome back, ${target.fullName}!`, 'success');
    return true;
  };

  // Farmer register
  const registerFarmer = (data: Omit<FarmerProfile, 'id' | 'createdAt'>): FarmerProfile => {
    const newFarmer: FarmerProfile = {
      ...data,
      id: `farm-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    saveFarmer(newFarmer);
    setFarmers(getFarmers());
    setCurrentFarmer(newFarmer);
    setCurrentRole('farmer');
    setFarmerState(newFarmer);
    setRoleState('farmer');
    setActiveView('dashboard');
    showToast(`Welcome to KrishiConnect, ${newFarmer.fullName}! Your account has been created.`, 'success');
    return newFarmer;
  };

  // Expert login
  const loginExpert = (email: string, pass: string): boolean => {
    const target = experts.find(
      (e) => e.email.toLowerCase().trim() === email.toLowerCase().trim()
    );
    if (!target) {
      showToast('Expert account not found with this email.', 'error');
      return false;
    }
    if (target.password && target.password !== pass) {
      showToast('Incorrect password entered.', 'error');
      return false;
    }

    setCurrentExpert(target);
    setCurrentRole('expert');
    setExpertState(target);
    setRoleState('expert');
    setActiveView('dashboard');
    showToast(`Welcome back, ${target.fullName}!`, 'success');
    return true;
  };

  // Expert register
  const registerExpert = (data: Omit<ExpertProfile, 'id' | 'rating' | 'reviewCount' | 'isDemo'>): ExpertProfile => {
    const newExpert: ExpertProfile = {
      ...data,
      id: `exp-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      isDemo: false
    };
    saveExpert(newExpert);
    setExperts(getExperts());
    setCurrentExpert(newExpert);
    setCurrentRole('expert');
    setExpertState(newExpert);
    setRoleState('expert');
    setActiveView('dashboard');
    showToast(`Welcome Dr./Er. ${newExpert.fullName}! Your expert profile is now live.`, 'success');
    return newExpert;
  };

  // Logout
  const logout = () => {
    setCurrentFarmer(null);
    setCurrentExpert(null);
    setCurrentRole('guest');
    setFarmerState(null);
    setExpertState(null);
    setRoleState('guest');
    setActiveView('home');
    showToast('Logged out successfully.', 'info');
  };

  // Quick switch between demo roles (great for college evaluators!)
  const quickSwitchToDemo = (target: 'farmer1' | 'farmer2' | 'expert1' | 'expert2' | 'guest') => {
    if (target === 'guest') {
      logout();
      return;
    }
    const currentFarmers = getFarmers();
    const currentExperts = getExperts();

    if (target === 'farmer1') {
      const f = currentFarmers[0] || currentFarmers.find((x) => x.id === 'farm-1');
      if (f) {
        setCurrentExpert(null);
        setExpertState(null);
        setCurrentFarmer(f);
        setFarmerState(f);
        setCurrentRole('farmer');
        setRoleState('farmer');
        setActiveView('dashboard');
        showToast(`Switched to Demo Farmer: ${f.fullName}`, 'info');
      }
    } else if (target === 'farmer2') {
      const f = currentFarmers[1] || currentFarmers.find((x) => x.id === 'farm-2');
      if (f) {
        setCurrentExpert(null);
        setExpertState(null);
        setCurrentFarmer(f);
        setFarmerState(f);
        setCurrentRole('farmer');
        setRoleState('farmer');
        setActiveView('dashboard');
        showToast(`Switched to Demo Farmer: ${f.fullName}`, 'info');
      }
    } else if (target === 'expert1') {
      const e = currentExperts[0] || currentExperts.find((x) => x.id === 'exp-1');
      if (e) {
        setCurrentFarmer(null);
        setFarmerState(null);
        setCurrentExpert(e);
        setExpertState(e);
        setCurrentRole('expert');
        setRoleState('expert');
        setActiveView('dashboard');
        showToast(`Switched to Demo Expert: ${e.fullName}`, 'info');
      }
    } else if (target === 'expert2') {
      const e = currentExperts[1] || currentExperts.find((x) => x.id === 'exp-2');
      if (e) {
        setCurrentFarmer(null);
        setFarmerState(null);
        setCurrentExpert(e);
        setExpertState(e);
        setCurrentRole('expert');
        setRoleState('expert');
        setActiveView('dashboard');
        showToast(`Switched to Demo Expert: ${e.fullName}`, 'info');
      }
    }
  };

  // Submit agricultural question
  const submitQuestion = (data: {
    cropName: string;
    problemCategory: FarmerQuestion['problemCategory'];
    description: string;
    symptoms: string;
    photoUrl?: string;
  }): FarmerQuestion | null => {
    if (!farmer) {
      showToast('Please log in as a farmer to ask a question.', 'error');
      return null;
    }

    const created = dbAddQuestion({
      farmerId: farmer.id,
      farmerName: farmer.fullName,
      farmerLocation: farmer.location,
      cropName: data.cropName,
      problemCategory: data.problemCategory,
      description: data.description,
      symptoms: data.symptoms,
      photoUrl: data.photoUrl
    });

    setQuestions(getQuestions());
    showToast('Your agricultural query has been posted to experts!', 'success');
    return created;
  };

  // Submit expert answer to question
  const submitAnswer = (questionId: string, answerText: string): boolean => {
    if (!expert) {
      showToast('Only registered agricultural experts can post advice.', 'error');
      return false;
    }
    const ok = dbAddAnswer(questionId, {
      expertId: expert.id,
      expertName: expert.fullName,
      expertSpecialization: expert.specialization,
      text: answerText
    });
    if (ok) {
      setQuestions(getQuestions());
      showToast('Your expert recommendation has been published.', 'success');
      return true;
    }
    showToast('Failed to post answer.', 'error');
    return false;
  };

  // Book consultation with conflict checking
  const submitBooking = (data: {
    expertId: string;
    cropName: string;
    problemDescription: string;
    date: string;
    timeSlot: string;
  }): { success: boolean; error?: string; booking?: AppointmentBooking } => {
    if (!farmer) {
      showToast('Please log in as a farmer to book a consultation.', 'error');
      return { success: false, error: 'Must be logged in as farmer' };
    }

    // Check date not in past
    const selectedDate = new Date(`${data.date}T23:59:59`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      const err = 'Appointment date cannot be in the past.';
      showToast(err, 'error');
      return { success: false, error: err };
    }

    // Check double booking
    if (isSlotAlreadyBooked(data.expertId, data.date, data.timeSlot)) {
      const err = `This expert is already booked on ${data.date} for the ${data.timeSlot} slot. Please select another time or date.`;
      showToast(err, 'error');
      return { success: false, error: err };
    }

    const targetExpert = experts.find((e) => e.id === data.expertId);
    if (!targetExpert) {
      showToast('Selected expert not found.', 'error');
      return { success: false, error: 'Expert not found' };
    }

    const newBooking = dbAddBooking({
      farmerId: farmer.id,
      farmerName: farmer.fullName,
      farmerLocation: farmer.location,
      expertId: targetExpert.id,
      expertName: targetExpert.fullName,
      expertSpecialization: targetExpert.specialization,
      cropName: data.cropName,
      problemDescription: data.problemDescription,
      date: data.date,
      timeSlot: data.timeSlot,
      fee: targetExpert.consultationFee
    });

    // Add initial system message to start the consultation thread
    dbAddMessage({
      bookingId: newBooking.id,
      senderId: 'system',
      senderName: 'KrishiConnect System',
      senderRole: 'farmer',
      text: `Consultation request initialized for ${data.cropName} on ${data.date} (${data.timeSlot}). Consultation fee: ₹${targetExpert.consultationFee}.`
    });

    setBookings(getBookings());
    showToast(`Appointment booked with ${targetExpert.fullName}! Waiting for expert confirmation.`, 'success');
    return { success: true, booking: newBooking };
  };

  // Change booking status (Accept / Decline / Cancel)
  const changeBookingStatus = (bookingId: string, status: BookingStatus): boolean => {
    const ok = dbUpdateBookingStatus(bookingId, status);
    if (ok) {
      setBookings(getBookings());
      if (status === 'confirmed') {
        showToast('Consultation request accepted. Appointment confirmed!', 'success');
      } else if (status === 'declined') {
        showToast('Consultation request declined.', 'info');
      } else if (status === 'cancelled') {
        showToast('Appointment has been cancelled.', 'info');
      }
      return true;
    }
    showToast('Could not update booking status.', 'error');
    return false;
  };

  // Chat messages
  const sendChatMessage = (bookingId: string, text: string): ChatMessage | null => {
    let senderId = '';
    let senderName = '';
    let senderRole: 'farmer' | 'expert' = 'farmer';

    if (role === 'farmer' && farmer) {
      senderId = farmer.id;
      senderName = farmer.fullName;
      senderRole = 'farmer';
    } else if (role === 'expert' && expert) {
      senderId = expert.id;
      senderName = expert.fullName;
      senderRole = 'expert';
    } else {
      showToast('You must be logged in to send consultation messages.', 'error');
      return null;
    }

    const msg = dbAddMessage({
      bookingId,
      senderId,
      senderName,
      senderRole,
      text
    });

    return msg;
  };

  const getBookingMessages = (bookingId: string): ChatMessage[] => {
    return getMessages(bookingId);
  };

  // Update expert profile
  const saveExpertDetails = (updated: ExpertProfile) => {
    updateExpert(updated);
    setExperts(getExperts());
    setExpertState(updated);
    showToast('Your expert profile and consultation fee have been updated.', 'success');
  };

  // Reset demo
  const resetAllDemoData = () => {
    resetStorageToDemo();
    refreshData();
    showToast('Reset demonstration data to factory defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        farmer,
        expert,
        farmers,
        experts,
        questions,
        bookings,
        activeView,
        setActiveView,
        toasts,
        showToast,
        removeToast,
        loginFarmer,
        registerFarmer,
        loginExpert,
        registerExpert,
        logout,
        quickSwitchToDemo,
        submitQuestion,
        submitAnswer,
        submitBooking,
        changeBookingStatus,
        sendChatMessage,
        getBookingMessages,
        saveExpertDetails,
        resetAllDemoData,
        selectedExpertForView,
        setSelectedExpertForView,
        selectedExpertForBooking,
        setSelectedExpertForBooking,
        activeChatBooking,
        setActiveChatBooking,
        isAskQuestionModalOpen,
        setIsAskQuestionModalOpen,
        filterByCrop,
        setFilterByCrop
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
