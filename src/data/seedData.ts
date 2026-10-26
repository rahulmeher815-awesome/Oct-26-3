/**
 * KrishiConnect - Seed Data for Demonstration
 * All profiles and cases are realistic academic demonstration data.
 */

import { ExpertProfile, FarmerProfile, FarmerQuestion, AppointmentBooking, ChatMessage, ProblemCategory } from '../types';

export const CROP_LIST: string[] = [
  'Rice (Paddy)',
  'Wheat',
  'Maize (Corn)',
  'Tomato',
  'Potato',
  'Cotton',
  'Sugarcane',
  'Soybean',
  'Chili',
  'Onion',
  'Mustard',
  'Groundnut (Peanut)',
  'Chickpea (Gram)',
  'Banana',
  'Mango',
  'Other Crop'
];

export const PROBLEM_CATEGORIES: ProblemCategory[] = [
  'Pest Attack',
  'Fungal / Bacterial Disease',
  'Nutrient Deficiency',
  'Weed Management',
  'Soil & Irrigation',
  'Climate / Weather Damage',
  'Yield Optimization'
];

export const TIME_SLOTS: string[] = [
  '09:30 AM - 10:00 AM',
  '10:30 AM - 11:00 AM',
  '11:30 AM - 12:00 PM',
  '02:00 PM - 02:30 PM',
  '03:30 PM - 04:00 PM',
  '05:00 PM - 05:30 PM',
  '06:30 PM - 07:00 PM'
];

export const SEED_EXPERTS: ExpertProfile[] = [
  {
    id: 'exp-1',
    fullName: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@krishiconnect.in',
    password: 'expert123',
    qualification: 'Ph.D. Plant Pathology (IARI, New Delhi)',
    specialization: 'Plant Pathology & Crop Disease Control',
    experienceYears: 14,
    crops: ['Wheat', 'Rice (Paddy)', 'Potato', 'Tomato', 'Mustard'],
    consultationFee: 450,
    bio: 'Senior Plant Pathologist with 14 years of research and field advisory experience in cereal and vegetable blight diseases, rusts, and fungal infections. Passionate about sustainable disease management and low-cost bio-fungicides.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviewCount: 84,
    languages: ['Hindi', 'English', 'Punjabi'],
    isDemo: true
  },
  {
    id: 'exp-2',
    fullName: 'Dr. Anita Deshmukh',
    email: 'anita.deshmukh@krishiconnect.in',
    password: 'expert123',
    qualification: 'Ph.D. Entomology (PAU Ludhiana)',
    specialization: 'Integrated Pest Management (IPM) & Entomology',
    experienceYears: 11,
    crops: ['Cotton', 'Soybean', 'Chili', 'Maize (Corn)', 'Tomato'],
    consultationFee: 500,
    bio: 'Specialist in bollworm, whitefly, thrips, and sucking pest management in cash crops. Certified IPM advisor advocating eco-friendly pheromone traps, biopesticides, and targeted chemical spraying only when economic threshold levels are crossed.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviewCount: 67,
    languages: ['Hindi', 'Marathi', 'English'],
    isDemo: true
  },
  {
    id: 'exp-3',
    fullName: 'Prof. Suresh Verma',
    email: 'suresh.verma@krishiconnect.in',
    password: 'expert123',
    qualification: 'M.Sc. Agronomy, Ph.D. (GBPUAT Pantnagar)',
    specialization: 'Cereal Crops, Crop Rotation & Yield Enhancement',
    experienceYears: 18,
    crops: ['Rice (Paddy)', 'Wheat', 'Sugarcane', 'Maize (Corn)', 'Chickpea (Gram)'],
    consultationFee: 400,
    bio: 'Former Krishi Vigyan Kendra (KVK) Chief Scientist with extensive expertise in crop scheduling, zero-tillage wheat sowing, direct-seeded rice (DSR), and fertilizer balance (NPK + micronutrients) for maximizing net farm income.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviewCount: 112,
    languages: ['Hindi', 'English'],
    isDemo: true
  },
  {
    id: 'exp-4',
    fullName: 'Dr. Priya Kulkarni',
    email: 'priya.kulkarni@krishiconnect.in',
    password: 'expert123',
    qualification: 'Ph.D. Soil Science & Agricultural Chemistry (UAS Bangalore)',
    specialization: 'Soil Health, Nutrition & Salinity Management',
    experienceYears: 9,
    crops: ['Tomato', 'Potato', 'Onion', 'Cotton', 'Banana'],
    consultationFee: 350,
    bio: 'Soil diagnostic specialist helping farmers decode soil test reports, correct micronutrient deficiencies (Zinc, Boron, Iron), and rehabilitate saline or alkaline soils with organic amendments and gypsum treatments.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    reviewCount: 53,
    languages: ['English', 'Kannada', 'Hindi', 'Marathi'],
    isDemo: true
  },
  {
    id: 'exp-5',
    fullName: 'Er. Vikram Singh Yadav',
    email: 'vikram.yadav@krishiconnect.in',
    password: 'expert123',
    qualification: 'M.Tech Agricultural Engineering (IIT Kharagpur)',
    specialization: 'Micro-Irrigation, Drip Fertigation & Climate Resilience',
    experienceYears: 8,
    crops: ['Sugarcane', 'Cotton', 'Maize (Corn)', 'Groundnut (Peanut)', 'Tomato'],
    consultationFee: 300,
    bio: 'Precision agriculture and water conservation engineer. Designs cost-effective drip and sprinkler setups, automated fertigation schedules, and soil moisture sensors that save 40% water while boosting yield.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviewCount: 39,
    languages: ['Hindi', 'English', 'Bhojpuri'],
    isDemo: true
  },
  {
    id: 'exp-6',
    fullName: 'Dr. Manjunath Reddy',
    email: 'manjunath.reddy@krishiconnect.in',
    password: 'expert123',
    qualification: 'M.Sc. Horticulture, Ph.D. (IIHR Bengaluru)',
    specialization: 'Commercial Horticulture, Polyhouses & Vegetable Protection',
    experienceYears: 13,
    crops: ['Tomato', 'Chili', 'Onion', 'Banana', 'Mango'],
    consultationFee: 450,
    bio: 'Horticulture expert with hands-on experience in shade net farming, vegetable nursery raising, post-harvest fruit rot prevention, and biological flower drop prevention in nightshade crops.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviewCount: 78,
    languages: ['Telugu', 'Kannada', 'English', 'Hindi'],
    isDemo: true
  }
];

export const SEED_FARMERS: FarmerProfile[] = [
  {
    id: 'farm-1',
    fullName: 'Ramesh Patel',
    email: 'ramesh.patel@gmail.com',
    password: 'farmer123',
    location: 'Ludhiana, Punjab',
    phone: '+91 98765 43210',
    createdAt: '2026-10-15T10:00:00.000Z'
  },
  {
    id: 'farm-2',
    fullName: 'Sunita Devi',
    email: 'sunita.devi@gmail.com',
    password: 'farmer123',
    location: 'Nashik, Maharashtra',
    phone: '+91 98112 34567',
    createdAt: '2026-10-18T14:30:00.000Z'
  }
];

export const SEED_QUESTIONS: FarmerQuestion[] = [
  {
    id: 'q-101',
    farmerId: 'farm-1',
    farmerName: 'Ramesh Patel',
    farmerLocation: 'Ludhiana, Punjab',
    cropName: 'Wheat',
    problemCategory: 'Fungal / Bacterial Disease',
    description: 'Noticing yellow-orange pustules aligned along leaf veins on young wheat plants. Spreading quickly after recent morning fog and mild temperatures.',
    symptoms: 'Yellow powder-like coating on fingertips when touching leaves, stunted upper tillers, leaf tips turning brown and drying out.',
    photoUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-10-22T09:15:00.000Z',
    status: 'answered',
    answers: [
      {
        id: 'ans-1',
        expertId: 'exp-1',
        expertName: 'Dr. Rajesh Sharma',
        expertSpecialization: 'Plant Pathology & Crop Disease Control',
        text: 'This is Yellow Rust (Puccinia striiformis), common in humid Northern plains conditions. Immediately spray Propiconazole 25% EC (Tilt) @ 1 ml per litre of water (200 ml in 200 L water per acre). Repeat after 12-15 days if cloudy weather persists.',
        createdAt: '2026-10-22T14:20:00.000Z'
      }
    ]
  },
  {
    id: 'q-102',
    farmerId: 'farm-2',
    farmerName: 'Sunita Devi',
    farmerLocation: 'Nashik, Maharashtra',
    cropName: 'Tomato',
    problemCategory: 'Pest Attack',
    description: 'Tiny white flying insects under leaves. Leaves are curling upwards and becoming thick and leathery. Flower drop has increased significantly.',
    symptoms: 'White insects fly away when shaken, sticky honeydew on foliage, upward leaf curling, delayed fruit setting.',
    photoUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600',
    createdAt: '2026-10-24T11:00:00.000Z',
    status: 'answered',
    answers: [
      {
        id: 'ans-2',
        expertId: 'exp-2',
        expertName: 'Dr. Anita Deshmukh',
        expertSpecialization: 'Integrated Pest Management (IPM) & Entomology',
        text: 'Whitefly (Bemisia tabaci) infestation which acts as vector for Tomato Leaf Curl Virus. Install 15-20 yellow sticky traps per acre immediately. Spray Diafenthiuron 50% WP @ 1.25 g/L or Neem oil (10,000 ppm) @ 2 ml/L on lower leaf surfaces.',
        createdAt: '2026-10-24T16:45:00.000Z'
      }
    ]
  },
  {
    id: 'q-103',
    farmerId: 'farm-1',
    farmerName: 'Ramesh Patel',
    farmerLocation: 'Ludhiana, Punjab',
    cropName: 'Potato',
    problemCategory: 'Nutrient Deficiency',
    description: 'Older potato leaves turning pale yellow between veins while veins remain green. Stems are thin.',
    symptoms: 'Interveinal chlorosis starting from lower canopy, leaves becoming brittle, slower tuber bulking.',
    createdAt: '2026-10-25T08:30:00.000Z',
    status: 'open',
    answers: []
  }
];

export const SEED_BOOKINGS: AppointmentBooking[] = [
  {
    id: 'bk-201',
    farmerId: 'farm-1',
    farmerName: 'Ramesh Patel',
    farmerLocation: 'Ludhiana, Punjab',
    expertId: 'exp-1',
    expertName: 'Dr. Rajesh Sharma',
    expertSpecialization: 'Plant Pathology & Crop Disease Control',
    cropName: 'Wheat',
    problemDescription: 'Follow-up consultation on Yellow Rust fungicide schedule and wheat heading stage protection.',
    date: '2026-10-28',
    timeSlot: '10:30 AM - 11:00 AM',
    fee: 450,
    status: 'confirmed',
    createdAt: '2026-10-23T11:30:00.000Z',
    notes: 'Please bring recent photo of the wheat field spray coverage.'
  },
  {
    id: 'bk-202',
    farmerId: 'farm-2',
    farmerName: 'Sunita Devi',
    farmerLocation: 'Nashik, Maharashtra',
    expertId: 'exp-2',
    expertName: 'Dr. Anita Deshmukh',
    expertSpecialization: 'Integrated Pest Management (IPM) & Entomology',
    cropName: 'Tomato',
    problemDescription: 'Whitefly biological control schedule and trap placement consultation.',
    date: '2026-10-29',
    timeSlot: '02:00 PM - 02:30 PM',
    fee: 500,
    status: 'pending',
    createdAt: '2026-10-25T14:10:00.000Z'
  }
];

export const SEED_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    bookingId: 'bk-201',
    senderId: 'farm-1',
    senderName: 'Ramesh Patel',
    senderRole: 'farmer',
    text: 'Namaste Dr. Rajesh Sharma ji, I have scheduled our consultation for Wednesday. The yellow rust patches reduced after first spray.',
    timestamp: '2026-10-23T12:00:00.000Z'
  },
  {
    id: 'msg-2',
    bookingId: 'bk-201',
    senderId: 'exp-1',
    senderName: 'Dr. Rajesh Sharma',
    senderRole: 'expert',
    text: 'Namaste Ramesh ji. Good to hear. Please check if new leaves at the flag stage have any fresh yellow powder. We will review during our slot.',
    timestamp: '2026-10-23T12:15:00.000Z'
  },
  {
    id: 'msg-3',
    bookingId: 'bk-201',
    senderId: 'farm-1',
    senderName: 'Ramesh Patel',
    senderRole: 'farmer',
    text: 'Sure Doctor, I will keep fresh leaf photographs ready.',
    timestamp: '2026-10-23T12:20:00.000Z'
  }
];
