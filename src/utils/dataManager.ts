import { PeriodEntry, DayEntry, Cycle, AIInsight, Achievement, UserStats, DonationTransaction, DonationStats } from '../types';

const STORAGE_KEYS = {
  CYCLES: 'menstrual_cycles',
  DAY_ENTRIES: 'day_entries',
  USER_STATS: 'user_stats',
  ACHIEVEMENTS: 'achievements',
  AI_INSIGHTS: 'ai_insights',
  DONATIONS: 'donation_transactions',
  DONATION_STATS: 'donation_stats'
};

export class DataManager {
  static getCycles(): Cycle[] {
    const data = localStorage.getItem(STORAGE_KEYS.CYCLES);
    return data ? JSON.parse(data) : [];
  }

  static saveCycles(cycles: Cycle[]): void {
    localStorage.setItem(STORAGE_KEYS.CYCLES, JSON.stringify(cycles));
  }

  static getDayEntries(): DayEntry[] {
    const data = localStorage.getItem(STORAGE_KEYS.DAY_ENTRIES);
    return data ? JSON.parse(data) : [];
  }

  static saveDayEntries(entries: DayEntry[]): void {
    localStorage.setItem(STORAGE_KEYS.DAY_ENTRIES, JSON.stringify(entries));
  }

  static getUserStats(): UserStats {
    const data = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    return data ? JSON.parse(data) : {
      currentStreak: 0,
      totalEntries: 0,
      points: 0,
      averageCycleLength: 28,
      trackingStartDate: new Date().toISOString().split('T')[0]
    };
  }

  static saveUserStats(stats: UserStats): void {
    localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
  }

  static getAchievements(): Achievement[] {
    const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (data) return JSON.parse(data);
    
    // Initialize default achievements
    const defaultAchievements: Achievement[] = [
      {
        id: 'first_entry',
        title: 'Getting Started',
        description: 'Log your first period day',
        icon: '🌸',
        unlocked: false,
        points: 10
      },
      {
        id: 'week_streak',
        title: 'Week Warrior',
        description: 'Track for 7 consecutive days',
        icon: '🔥',
        unlocked: false,
        points: 50
      },
      {
        id: 'month_streak',
        title: 'Monthly Master',
        description: 'Track for 30 consecutive days',
        icon: '💪',
        unlocked: false,
        points: 150
      },
      {
        id: 'complete_cycle',
        title: 'Full Circle',
        description: 'Complete tracking a full cycle',
        icon: '🎯',
        unlocked: false,
        points: 100
      },
      {
        id: 'symptom_tracker',
        title: 'Symptom Sleuth',
        description: 'Log symptoms for 10 different days',
        icon: '🔍',
        unlocked: false,
        points: 75
      },
      {
        id: 'eco_friendly',
        title: 'Eco Conscious',
        description: 'Track using sustainable menstrual products',
        icon: '🌱',
        unlocked: false,
        points: 120
      },
      {
        id: 'waste_warrior',
        title: 'Waste Warrior',
        description: 'Use reusable products for 30 consecutive days',
        icon: '♻️',
        unlocked: false,
        points: 200
      }
    ];
    
    this.saveAchievements(defaultAchievements);
    return defaultAchievements;
  }

  static saveAchievements(achievements: Achievement[]): void {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }

  static getAIInsights(): AIInsight[] {
    const data = localStorage.getItem(STORAGE_KEYS.AI_INSIGHTS);
    return data ? JSON.parse(data) : [];
  }

  static saveAIInsights(insights: AIInsight[]): void {
    localStorage.setItem(STORAGE_KEYS.AI_INSIGHTS, JSON.stringify(insights));
  }

  static generateMockAIInsights(cycles: Cycle[], dayEntries: DayEntry[]): AIInsight[] {
    const insights: AIInsight[] = [];
    const today = new Date();
    
    // Pattern analysis
    if (cycles.length >= 2) {
      const avgLength = cycles.reduce((sum, cycle) => sum + (cycle.length || 28), 0) / cycles.length;
      insights.push({
        id: `pattern_${Date.now()}`,
        type: 'pattern',
        title: 'Cycle Pattern Detected',
        message: `Your average cycle length is ${Math.round(avgLength)} days. This is within the normal range.`,
        confidence: 85,
        date: today.toISOString().split('T')[0]
      });
    }

    // Symptom trends
    const recentEntries = dayEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      const daysAgo = (today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysAgo <= 30;
    });

    const commonSymptoms = recentEntries
      .flatMap(entry => entry.symptoms)
      .reduce((acc, symptom) => {
        acc[symptom] = (acc[symptom] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const mostCommon = Object.entries(commonSymptoms)
      .sort(([,a], [,b]) => b - a)[0];

    if (mostCommon && mostCommon[1] >= 3) {
      insights.push({
        id: `symptom_${Date.now()}`,
        type: 'health',
        title: 'Recurring Symptom Noticed',
        message: `You've experienced ${mostCommon[0]} frequently this month. Consider tracking potential triggers like stress or diet.`,
        confidence: 70,
        date: today.toISOString().split('T')[0]
      });
    }

    // Prediction
    if (cycles.length > 0) {
      const lastCycle = cycles[cycles.length - 1];
      if (lastCycle.endDate) {
        const nextPeriodDate = new Date(lastCycle.endDate);
        nextPeriodDate.setDate(nextPeriodDate.getDate() + (lastCycle.length || 28));
        
        insights.push({
          id: `prediction_${Date.now()}`,
          type: 'prediction',
          title: 'Next Period Prediction',
          message: `Based on your cycle pattern, your next period is expected around ${nextPeriodDate.toLocaleDateString()}.`,
          confidence: 80,
          date: today.toISOString().split('T')[0]
        });
      }
    }

    // Health recommendations
    const lowEnergyDays = recentEntries.filter(entry => entry.energy <= 2).length;
    if (lowEnergyDays >= 5) {
      insights.push({
        id: `recommendation_${Date.now()}`,
        type: 'recommendation',
        title: 'Energy Level Recommendation',
        message: `You've had low energy on several days this month. Consider increasing iron-rich foods and ensuring adequate sleep.`,
        confidence: 60,
        date: today.toISOString().split('T')[0]
      });
    }

    return insights;
  }

  static checkAndUnlockAchievements(stats: UserStats, cycles: Cycle[], dayEntries: DayEntry[]): Achievement[] {
    const achievements = this.getAchievements();
    let unlocked: Achievement[] = [];

    achievements.forEach(achievement => {
      if (achievement.unlocked) return;

      let shouldUnlock = false;

      switch (achievement.id) {
        case 'first_entry':
          shouldUnlock = dayEntries.length > 0 || cycles.some(c => c.entries.length > 0);
          break;
        case 'week_streak':
          shouldUnlock = stats.currentStreak >= 7;
          break;
        case 'month_streak':
          shouldUnlock = stats.currentStreak >= 30;
          break;
        case 'complete_cycle':
          shouldUnlock = cycles.some(c => c.endDate && c.length);
          break;
        case 'symptom_tracker':
          const symptomsLoggedDays = dayEntries.filter(e => e.symptoms.length > 0).length;
          shouldUnlock = symptomsLoggedDays >= 10;
          break;
        case 'eco_friendly':
          // Mock condition - in real app, this would check for sustainable product usage
          shouldUnlock = stats.totalEntries >= 5;
          break;
        case 'waste_warrior':
          // Mock condition - in real app, this would track consecutive sustainable product days
          shouldUnlock = stats.currentStreak >= 20;
          break;
      }

      if (shouldUnlock) {
        achievement.unlocked = true;
        achievement.unlockedDate = new Date().toISOString().split('T')[0];
        unlocked.push(achievement);
      }
    });

    if (unlocked.length > 0) {
      this.saveAchievements(achievements);
    }

    return unlocked;
  }

  // Donation Management
  static getDonationTransactions(): DonationTransaction[] {
    const data = localStorage.getItem(STORAGE_KEYS.DONATIONS);
    return data ? JSON.parse(data) : [];
  }

  static saveDonationTransactions(transactions: DonationTransaction[]): void {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(transactions));
  }

  static getDonationStats(): DonationStats {
    const data = localStorage.getItem(STORAGE_KEYS.DONATION_STATS);
    if (data) return JSON.parse(data);

    const defaultStats: DonationStats = {
      totalDonated: 95650,
      totalBeneficiaries: 247,
      totalNGOs: 12,
      averageDonation: 387,
      platformTransparencyScore: 98,
      completedTransactions: 127
    };

    this.saveDonationStats(defaultStats);
    return defaultStats;
  }

  static saveDonationStats(stats: DonationStats): void {
    localStorage.setItem(STORAGE_KEYS.DONATION_STATS, JSON.stringify(stats));
  }

  static createDonationTransaction(donation: Omit<DonationTransaction, 'id' | 'blockHash' | 'timestamp' | 'blockNumber' | 'confirmations'>): DonationTransaction {
    const transaction: DonationTransaction = {
      ...donation,
      id: `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      blockHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      timestamp: new Date().toISOString(),
      blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
      confirmations: 0
    };

    const transactions = this.getDonationTransactions();
    transactions.unshift(transaction);
    this.saveDonationTransactions(transactions);

    // Update stats
    const stats = this.getDonationStats();
    stats.totalDonated += donation.amount;
    stats.totalBeneficiaries += 1;
    stats.averageDonation = Math.round(stats.totalDonated / (transactions.length + stats.completedTransactions));
    this.saveDonationStats(stats);

    // Simulate blockchain confirmations
    this.simulateBlockchainConfirmations(transaction.id);

    return transaction;
  }

  private static simulateBlockchainConfirmations(transactionId: string): void {
    let confirmations = 0;
    const interval = setInterval(() => {
      confirmations++;
      const transactions = this.getDonationTransactions();
      const transaction = transactions.find(t => t.id === transactionId);
      
      if (transaction) {
        transaction.confirmations = confirmations;
        
        // Update status based on confirmations
        if (confirmations >= 1 && transaction.status === 'pending') {
          transaction.status = 'confirmed';
        } else if (confirmations >= 6 && transaction.status === 'confirmed') {
          transaction.status = 'distributed';
        } else if (confirmations >= 12 && transaction.status === 'distributed') {
          transaction.status = 'completed';
        }
        
        this.saveDonationTransactions(transactions);
      }

      if (confirmations >= 12) {
        clearInterval(interval);
      }
    }, 2000); // 2 seconds per confirmation
  }
}