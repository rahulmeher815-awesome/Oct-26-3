/**
 * KrishiConnect - LocalStorage Management Utility
 * Provides robust demonstration persistence across page refreshes.
 */

import {
  FarmerProfile,
  ExpertProfile,
  FarmerQuestion,
  AppointmentBooking,
  ChatMessage,
  UserRole,
  BookingStatus,
  QuestionAnswer
} from '../types';
import {
  SEED_EXPERTS,
  SEED_FARMERS,
  SEED_QUESTIONS,
  SEED_BOOKINGS,
  SEED_MESSAGES
} from '../data/seedData';

const STORAGE_KEYS = {
  INITIALIZED: 'krishi_initialized_v2',
  FARMERS: 'krishi_farmers',
  CURRENT_FARMER: 'krishi_current_farmer',
  EXPERTS: 'krishi_experts',
  CURRENT_EXPERT: 'krishi_current_expert',
  CURRENT_ROLE: 'krishi_current_role',
  QUESTIONS: 'krishi_questions',
  BOOKINGS: 'krishi_bookings',
  MESSAGES: 'krishi_messages'
};

function safeGetItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return defaultValue;
  }
}

function safeSetItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

/**
 * Initialize storage with seed data if not previously initialized
 */
export function initializeStorage(force = false): void {
  const isInit = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  if (!isInit || force) {
    safeSetItem(STORAGE_KEYS.FARMERS, SEED_FARMERS);
    safeSetItem(STORAGE_KEYS.EXPERTS, SEED_EXPERTS);
    safeSetItem(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS);
    safeSetItem(STORAGE_KEYS.BOOKINGS, SEED_BOOKINGS);
    safeSetItem(STORAGE_KEYS.MESSAGES, SEED_MESSAGES);
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');

    if (force) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_FARMER);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_EXPERT);
      localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, JSON.stringify('guest'));
    }
  }
}

/* ================= FARMERS ================= */

export function getFarmers(): FarmerProfile[] {
  initializeStorage();
  return safeGetItem<FarmerProfile[]>(STORAGE_KEYS.FARMERS, SEED_FARMERS);
}

export function saveFarmer(farmer: FarmerProfile): void {
  const list = getFarmers();
  const existingIdx = list.findIndex((f) => f.id === farmer.id || f.email.toLowerCase() === farmer.email.toLowerCase());
  if (existingIdx >= 0) {
    list[existingIdx] = farmer;
  } else {
    list.push(farmer);
  }
  safeSetItem(STORAGE_KEYS.FARMERS, list);
}

export function getCurrentFarmer(): FarmerProfile | null {
  return safeGetItem<FarmerProfile | null>(STORAGE_KEYS.CURRENT_FARMER, null);
}

export function setCurrentFarmer(farmer: FarmerProfile | null): void {
  if (farmer) {
    safeSetItem(STORAGE_KEYS.CURRENT_FARMER, farmer);
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_FARMER);
  }
}

/* ================= EXPERTS ================= */

export function getExperts(): ExpertProfile[] {
  initializeStorage();
  return safeGetItem<ExpertProfile[]>(STORAGE_KEYS.EXPERTS, SEED_EXPERTS);
}

export function saveExpert(expert: ExpertProfile): void {
  const list = getExperts();
  const existingIdx = list.findIndex((e) => e.id === expert.id || e.email.toLowerCase() === expert.email.toLowerCase());
  if (existingIdx >= 0) {
    list[existingIdx] = expert;
  } else {
    list.push(expert);
  }
  safeSetItem(STORAGE_KEYS.EXPERTS, list);
}

export function updateExpert(updated: ExpertProfile): void {
  const list = getExperts();
  const idx = list.findIndex((e) => e.id === updated.id);
  if (idx >= 0) {
    list[idx] = updated;
    safeSetItem(STORAGE_KEYS.EXPERTS, list);
  }
  // also update current expert if matching
  const current = getCurrentExpert();
  if (current && current.id === updated.id) {
    setCurrentExpert(updated);
  }
}

export function getCurrentExpert(): ExpertProfile | null {
  return safeGetItem<ExpertProfile | null>(STORAGE_KEYS.CURRENT_EXPERT, null);
}

export function setCurrentExpert(expert: ExpertProfile | null): void {
  if (expert) {
    safeSetItem(STORAGE_KEYS.CURRENT_EXPERT, expert);
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_EXPERT);
  }
}

/* ================= ROLE ================= */

export function getCurrentRole(): UserRole {
  return safeGetItem<UserRole>(STORAGE_KEYS.CURRENT_ROLE, 'guest');
}

export function setCurrentRole(role: UserRole): void {
  safeSetItem(STORAGE_KEYS.CURRENT_ROLE, role);
}

/* ================= QUESTIONS ================= */

export function getQuestions(): FarmerQuestion[] {
  initializeStorage();
  return safeGetItem<FarmerQuestion[]>(STORAGE_KEYS.QUESTIONS, SEED_QUESTIONS);
}

export function addQuestion(data: {
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  cropName: string;
  problemCategory: FarmerQuestion['problemCategory'];
  description: string;
  symptoms: string;
  photoUrl?: string;
}): FarmerQuestion {
  const questions = getQuestions();
  const newQuestion: FarmerQuestion = {
    id: `q-${Date.now()}`,
    farmerId: data.farmerId,
    farmerName: data.farmerName,
    farmerLocation: data.farmerLocation,
    cropName: data.cropName,
    problemCategory: data.problemCategory,
    description: data.description,
    symptoms: data.symptoms,
    photoUrl: data.photoUrl,
    createdAt: new Date().toISOString(),
    status: 'open',
    answers: []
  };
  questions.unshift(newQuestion);
  safeSetItem(STORAGE_KEYS.QUESTIONS, questions);
  return newQuestion;
}

export function addAnswerToQuestion(
  questionId: string,
  answerData: {
    expertId: string;
    expertName: string;
    expertSpecialization: string;
    text: string;
  }
): boolean {
  const questions = getQuestions();
  const q = questions.find((item) => item.id === questionId);
  if (!q) return false;

  const newAns: QuestionAnswer = {
    id: `ans-${Date.now()}`,
    expertId: answerData.expertId,
    expertName: answerData.expertName,
    expertSpecialization: answerData.expertSpecialization,
    text: answerData.text,
    createdAt: new Date().toISOString()
  };

  q.answers.push(newAns);
  q.status = 'answered';
  safeSetItem(STORAGE_KEYS.QUESTIONS, questions);
  return true;
}

/* ================= BOOKINGS ================= */

export function getBookings(): AppointmentBooking[] {
  initializeStorage();
  return safeGetItem<AppointmentBooking[]>(STORAGE_KEYS.BOOKINGS, SEED_BOOKINGS);
}

export function isSlotAlreadyBooked(
  expertId: string,
  date: string,
  timeSlot: string,
  excludeBookingId?: string
): boolean {
  const bookings = getBookings();
  return bookings.some(
    (b) =>
      b.expertId === expertId &&
      b.date === date &&
      b.timeSlot === timeSlot &&
      (b.status === 'confirmed' || b.status === 'pending') &&
      b.id !== excludeBookingId
  );
}

export function addBooking(data: {
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  expertId: string;
  expertName: string;
  expertSpecialization: string;
  cropName: string;
  problemDescription: string;
  date: string;
  timeSlot: string;
  fee: number;
}): AppointmentBooking {
  const bookings = getBookings();
  const newBooking: AppointmentBooking = {
    id: `bk-${Date.now()}`,
    farmerId: data.farmerId,
    farmerName: data.farmerName,
    farmerLocation: data.farmerLocation,
    expertId: data.expertId,
    expertName: data.expertName,
    expertSpecialization: data.expertSpecialization,
    cropName: data.cropName,
    problemDescription: data.problemDescription,
    date: data.date,
    timeSlot: data.timeSlot,
    fee: data.fee,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  safeSetItem(STORAGE_KEYS.BOOKINGS, bookings);
  return newBooking;
}

export function updateBookingStatus(bookingId: string, status: BookingStatus): boolean {
  const bookings = getBookings();
  const booking = bookings.find((b) => b.id === bookingId);
  if (!booking) return false;

  booking.status = status;
  safeSetItem(STORAGE_KEYS.BOOKINGS, bookings);
  return true;
}

/* ================= MESSAGES ================= */

export function getMessages(bookingId?: string): ChatMessage[] {
  initializeStorage();
  const msgs = safeGetItem<ChatMessage[]>(STORAGE_KEYS.MESSAGES, SEED_MESSAGES);
  if (!bookingId) return msgs;
  return msgs.filter((m) => m.bookingId === bookingId);
}

export function addMessage(data: {
  bookingId: string;
  senderId: string;
  senderName: string;
  senderRole: 'farmer' | 'expert';
  text: string;
}): ChatMessage {
  const msgs = safeGetItem<ChatMessage[]>(STORAGE_KEYS.MESSAGES, SEED_MESSAGES);
  const newMsg: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    bookingId: data.bookingId,
    senderId: data.senderId,
    senderName: data.senderName,
    senderRole: data.senderRole,
    text: data.text,
    timestamp: new Date().toISOString()
  };
  msgs.push(newMsg);
  safeSetItem(STORAGE_KEYS.MESSAGES, msgs);
  return newMsg;
}

/* ================= RESET ================= */

export function resetStorageToDemo(): void {
  initializeStorage(true);
}
