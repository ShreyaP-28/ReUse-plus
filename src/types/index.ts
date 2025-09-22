export interface PeriodEntry {
  id: string;
  date: string;
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
  mood: string;
  notes?: string;
}

export interface DayEntry {
  id: string;
  date: string;
  symptoms: string[];
  mood: string;
  energy: number; // 1-5 scale
  sleep: number; // hours
  water: number; // glasses
  exercise: boolean;
  notes?: string;
}

export interface Cycle {
  id: string;
  startDate: string;
  endDate?: string;
  length?: number;
  entries: PeriodEntry[];
}

export interface AIInsight {
  id: string;
  type: 'pattern' | 'health' | 'prediction' | 'recommendation';
  title: string;
  message: string;
  confidence: number;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  points: number;
}

export interface UserStats {
  currentStreak: number;
  totalEntries: number;
  points: number;
  averageCycleLength: number;
  trackingStartDate: string;
}

export type ViewMode = 'marketplace' | 'cycletracking' | 'chatbot' | 'rewards' | 'profile' | 'donations';

export const SYMPTOMS = [
  'Cramps',
  'Headache',
  'Bloating',
  'Breast tenderness',
  'Acne',
  'Back pain',
  'Nausea',
  'Fatigue',
  'Mood swings',
  'Food cravings',
  'Insomnia',
  'Hot flashes'
];

export const MOODS = [
  'Happy',
  'Sad',
  'Anxious',
  'Irritable',
  'Calm',
  'Energetic',
  'Tired',
  'Stressed'
];

// Donation System Types
export interface DonationTransaction {
  id: string;
  blockHash: string;
  timestamp: string;
  donor: {
    id: string;
    name: string;
    walletAddress: string;
  };
  ngo: {
    id: string;
    name: string;
    walletAddress: string;
    verificationStatus: 'verified' | 'pending' | 'unverified';
  };
  beneficiary: {
    id: string;
    name: string;
    studentId: string;
    school: string;
    grade: string;
  };
  amount: number;
  currency: string;
  purpose: string;
  status: 'pending' | 'confirmed' | 'distributed' | 'completed';
  gasUsed?: number;
  blockNumber?: number;
  confirmations: number;
  distributionBreakdown?: {
    studentAid: number;
    ngoFee: number;
    platformFee: number;
  };
}

export interface DonationStats {
  totalDonated: number;
  totalBeneficiaries: number;
  totalNGOs: number;
  averageDonation: number;
  platformTransparencyScore: number;
  completedTransactions: number;
}

export interface NGO {
  id: string;
  name: string;
  description: string;
  walletAddress: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  totalReceived: number;
  beneficiariesSupported: number;
  transparencyScore: number;
  website?: string;
  location: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  studentId: string;
  school: string;
  grade: string;
  totalReceived: number;
  activeSupport: boolean;
  lastDistribution?: string;
}