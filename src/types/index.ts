/**
 * KrishiConnect - Type Definitions
 * Demonstration College Project
 */

export type UserRole = 'guest' | 'farmer' | 'expert';

export type ProblemCategory =
  | 'Pest Attack'
  | 'Fungal / Bacterial Disease'
  | 'Nutrient Deficiency'
  | 'Weed Management'
  | 'Soil & Irrigation'
  | 'Climate / Weather Damage'
  | 'Yield Optimization';

export interface FarmerProfile {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  location: string; // e.g. "Ludhiana, Punjab"
  phone?: string;
  createdAt: string;
}

export interface ExpertProfile {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  qualification: string; // e.g. "Ph.D. Plant Pathology (IARI New Delhi)"
  specialization: string; // e.g. "Plant Pathology & Disease Control"
  experienceYears: number;
  crops: string[];
  consultationFee: number; // in INR (₹)
  bio: string;
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  languages: string[];
  isDemo: boolean;
}

export interface QuestionAnswer {
  id: string;
  expertId: string;
  expertName: string;
  expertSpecialization: string;
  text: string;
  createdAt: string;
}

export interface FarmerQuestion {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  cropName: string;
  problemCategory: ProblemCategory;
  description: string;
  symptoms: string;
  photoUrl?: string;
  createdAt: string;
  status: 'open' | 'answered';
  answers: QuestionAnswer[];
}

export type BookingStatus = 'pending' | 'confirmed' | 'declined' | 'cancelled';

export interface AppointmentBooking {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  expertId: string;
  expertName: string;
  expertSpecialization: string;
  cropName: string;
  problemDescription: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM - 10:30 AM"
  fee: number; // in INR (₹)
  status: BookingStatus;
  createdAt: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  bookingId: string;
  senderId: string;
  senderName: string;
  senderRole: 'farmer' | 'expert';
  text: string;
  timestamp: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
