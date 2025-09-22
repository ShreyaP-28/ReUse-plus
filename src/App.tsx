import React, { useState, useEffect } from 'react';
import { Welcome } from './components/Welcome';
import { Navigation } from './components/Navigation';
import { CycleTracking } from './components/CycleTracking';
import { Chatbot } from './components/Chatbot';
import { Rewards } from './components/Rewards';
import { Profile } from './components/Profile';
import { VendorNavigation } from './components/VendorNavigation';
import { VendorDashboard } from './components/VendorDashboard';
import { VendorProducts } from './components/VendorProducts';
import { VendorProfile } from './components/VendorProfile';
import { VendorMap } from './components/VendorMap';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { DonationTracker } from './components/DonationTracker';
import { Marketplace } from './components/Map';
import { DataManager } from './utils/dataManager';
import { PeriodEntry, DayEntry, Cycle, AIInsight, Achievement, UserStats, ViewMode, DonationTransaction, DonationStats } from './types';

export default function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [userType, setUserType] = useState<'customer' | 'vendor'>('customer');
  const [currentView, setCurrentView] = useState<ViewMode>('marketplace');
  const [vendorView, setVendorView] = useState<'dashboard' | 'products' | 'map' | 'profile'>('dashboard');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [dayEntries, setDayEntries] = useState<DayEntry[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    currentStreak: 0,
    totalEntries: 0,
    points: 0,
    averageCycleLength: 28,
    trackingStartDate: new Date().toISOString().split('T')[0]
  });
  const [donationTransactions, setDonationTransactions] = useState<DonationTransaction[]>([]);
  const [donationStats, setDonationStats] = useState<DonationStats>({
    totalDonated: 0,
    totalBeneficiaries: 0,
    totalNGOs: 0,
    averageDonation: 0,
    platformTransparencyScore: 0,
    completedTransactions: 0
  });

  // Vendor-specific state
  const [vendorProducts, setVendorProducts] = useState<any[]>([]);
  const [vendorOrders, setVendorOrders] = useState<any[]>([]);
  
  const [vendorStats, setVendorStats] = useState({
    totalProducts: 0,
    totalSales:0,
    revenue: 0,
    customers: 0,
    rating:0 ,
    reviewCount:0
  });

  const [vendorInfo, setVendorInfo] = useState({
    businessName: 'Apollo Store',
    ownerName: 'Ankita Goyal ',
    email: 'ankita@apollostores.com',
    phone: '987612345',
    address: 'Pondha',
    city: 'Dehradun',
    state: 'Uttrakhand',
    zipCode: '248007',
    description: 'Your trusted source for eco-friendly and organic menstrual health products. We specialize in sustainable solutions for modern women.',
    website: 'https://apollostores.com',
    businessHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '10:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    specializations: ['Organic Products', 'Eco-Friendly', 'Sensitive Skin'],
    certifications: ['FDA Approved', 'Organic Certified', 'Women Owned Business']
  });

  // Load data on component mount
  useEffect(() => {
    // Check if user has seen the welcome screen before
    const hasSeenWelcome = localStorage.getItem('reuse-plus-welcome-seen');
    const savedUserType = localStorage.getItem('reuse-plus-user-type') as 'customer' | 'vendor';
    
    if (hasSeenWelcome === 'true' && savedUserType) {
      setShowWelcome(false);
      setUserType(savedUserType);
    }

    const loadedCycles = DataManager.getCycles();
    const loadedDayEntries = DataManager.getDayEntries();
    const loadedStats = DataManager.getUserStats();
    const loadedAchievements = DataManager.getAchievements();
    const loadedInsights = DataManager.getAIInsights();
    const loadedDonations = DataManager.getDonationTransactions();
    const loadedDonationStats = DataManager.getDonationStats();

    setCycles(loadedCycles);
    setDayEntries(loadedDayEntries);
    setUserStats(loadedStats);
    setAchievements(loadedAchievements);
    setAiInsights(loadedInsights);
    setDonationTransactions(loadedDonations);
    setDonationStats(loadedDonationStats);

    // Set selected date to today if no date is selected
    if (!selectedDate) {
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
  }, []);

  // Calculate and update user stats whenever data changes
  useEffect(() => {
    const totalEntries = dayEntries.length + cycles.reduce((sum, cycle) => sum + cycle.entries.length, 0);
    const currentStreak = calculateCurrentStreak();
    const averageCycleLength = calculateAverageCycleLength();
    const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);

    const newStats: UserStats = {
      ...userStats,
      currentStreak,
      totalEntries,
      points: totalPoints,
      averageCycleLength
    };

    setUserStats(newStats);
    DataManager.saveUserStats(newStats);

    // Check for new achievements
    const newlyUnlocked = DataManager.checkAndUnlockAchievements(newStats, cycles, dayEntries);
    if (newlyUnlocked.length > 0) {
      setAchievements(DataManager.getAchievements());
      newlyUnlocked.forEach(achievement => {
        toast.success(`Achievement Unlocked: ${achievement.title}!`, {
          description: `+${achievement.points} points earned`
        });
      });
    }
  }, [cycles, dayEntries, achievements]);

  const calculateCurrentStreak = (): number => {
    const allEntries = [
      ...dayEntries.map(entry => entry.date),
      ...cycles.flatMap(cycle => cycle.entries.map(entry => entry.date))
    ];
    
    const uniqueDates = [...new Set(allEntries)].sort().reverse();
    if (uniqueDates.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const entryDate = new Date(uniqueDates[i]);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (entryDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateAverageCycleLength = (): number => {
    const validCycles = cycles.filter(cycle => cycle.length);
    if (validCycles.length === 0) return 28;
    return Math.round(validCycles.reduce((sum, cycle) => sum + (cycle.length || 0), 0) / validCycles.length);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    if (currentView !== 'cycletracking') {
      setCurrentView('cycletracking');
    }
  };

  const handleSavePeriodEntry = (entry: PeriodEntry) => {
    const newCycles = [...cycles];
    let targetCycle = newCycles.find(cycle => {
      const cycleStart = new Date(cycle.startDate);
      const entryDate = new Date(entry.date);
      const daysDiff = Math.abs((entryDate.getTime() - cycleStart.getTime()) / (1000 * 60 * 60 * 24));
      return !cycle.endDate && daysDiff <= 10; // Within 10 days of cycle start
    });

    if (!targetCycle) {
      // Create new cycle
      targetCycle = {
        id: `cycle_${Date.now()}`,
        startDate: entry.date,
        entries: []
      };
      newCycles.push(targetCycle);
    }

    // Update or add entry
    const existingEntryIndex = targetCycle.entries.findIndex(e => e.id === entry.id);
    if (existingEntryIndex >= 0) {
      targetCycle.entries[existingEntryIndex] = entry;
    } else {
      targetCycle.entries.push(entry);
    }

    // Sort entries by date
    targetCycle.entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setCycles(newCycles);
    DataManager.saveCycles(newCycles);
    toast.success('Period entry saved!');
  };

  const handleSaveDayEntry = (entry: DayEntry) => {
    const newDayEntries = [...dayEntries];
    const existingIndex = newDayEntries.findIndex(e => e.date === entry.date);
    
    if (existingIndex >= 0) {
      newDayEntries[existingIndex] = entry;
    } else {
      newDayEntries.push(entry);
    }

    setDayEntries(newDayEntries);
    DataManager.saveDayEntries(newDayEntries);
    toast.success('Daily entry saved!');
  };

  const handleDeletePeriodEntry = (entryId: string) => {
    const newCycles = cycles.map(cycle => ({
      ...cycle,
      entries: cycle.entries.filter(entry => entry.id !== entryId)
    })).filter(cycle => cycle.entries.length > 0); // Remove empty cycles

    setCycles(newCycles);
    DataManager.saveCycles(newCycles);
    toast.success('Period entry deleted');
  };

  const handleRefreshInsights = () => {
    const newInsights = DataManager.generateMockAIInsights(cycles, dayEntries);
    setAiInsights(newInsights);
    DataManager.saveAIInsights(newInsights);
    toast.success('AI insights refreshed!');
  };

  const handleExportData = () => {
    const data = {
      cycles,
      dayEntries,
      userStats,
      achievements,
      aiInsights,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reuse-plus-data-export.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully!');
  };

  const handleGetStarted = (selectedUserType: 'customer' | 'vendor') => {
    setShowWelcome(false);
    setUserType(selectedUserType);
    localStorage.setItem('reuse-plus-welcome-seen', 'true');
    localStorage.setItem('reuse-plus-user-type', selectedUserType);
    
    if (selectedUserType === 'customer') {
      toast.success('Welcome to ReUse+! Let\'s start tracking your cycle.');
    } else {
      toast.success('Welcome to ReUse+ Vendor! Let\'s set up your store.');
    }
  };

  const handleShowWelcomeTour = () => {
    setShowWelcome(true);
  };

  const handleLogout = () => {
    // Clear user session data
    localStorage.removeItem('reuse-plus-welcome-seen');
    localStorage.removeItem('reuse-plus-user-type');
    
    // Reset states
    setShowWelcome(true);
    setUserType('customer');
    setCurrentView('marketplace');
    setVendorView('dashboard');
    
    toast.success('Successfully logged out. See you soon!');
  };

  const handleClearData = () => {
    setCycles([]);
    setDayEntries([]);
    setAiInsights([]);
    setAchievements(DataManager.getAchievements()); // Reset to default achievements
    setUserStats({
      currentStreak: 0,
      totalEntries: 0,
      points: 0,
      averageCycleLength: 28,
      trackingStartDate: new Date().toISOString().split('T')[0]
    });

    // Clear localStorage but keep welcome status and user type
    const welcomeSeen = localStorage.getItem('reuse-plus-welcome-seen');
    const userTypeStored = localStorage.getItem('reuse-plus-user-type');
    localStorage.clear();
    if (welcomeSeen) {
      localStorage.setItem('reuse-plus-welcome-seen', welcomeSeen);
    }
    if (userTypeStored) {
      localStorage.setItem('reuse-plus-user-type', userTypeStored);
    }
    
    toast.success('All data cleared successfully');
  };

  const handleCreateDonation = (donation: Omit<DonationTransaction, 'id' | 'blockHash' | 'timestamp' | 'blockNumber' | 'confirmations'>) => {
    const newTransaction = DataManager.createDonationTransaction(donation);
    const updatedTransactions = DataManager.getDonationTransactions();
    const updatedStats = DataManager.getDonationStats();
    
    setDonationTransactions(updatedTransactions);
    setDonationStats(updatedStats);
    
    return newTransaction;
  };

  // Vendor-specific handlers
  const handleAddProduct = (product: any) => {
    const newProduct = {
      ...product,
      id: `prod_${Date.now()}`,
      sales: 0,
      rating: 0
    };
    setVendorProducts([...vendorProducts, newProduct]);
    setVendorStats(prev => ({ ...prev, totalProducts: prev.totalProducts + 1 }));
    toast.success('Product added successfully!');
  };

  const handleEditProduct = (productId: string, updates: any) => {
    setVendorProducts(prev => 
      prev.map(p => p.id === productId ? { ...p, ...updates } : p)
    );
    toast.success('Product updated successfully!');
  };

  const handleDeleteProduct = (productId: string) => {
    setVendorProducts(prev => prev.filter(p => p.id !== productId));
    setVendorStats(prev => ({ ...prev, totalProducts: prev.totalProducts - 1 }));
    toast.success('Product deleted successfully!');
  };

  const handleUpdateVendorProfile = (updates: any) => {
    setVendorInfo(prev => ({ ...prev, ...updates }));
    toast.success('Profile updated successfully!');
  };

  const handlePlaceOrder = (orderData: any) => {
    const newOrder = {
      ...orderData,
      id: `order_${Date.now()}`,
      orderNumber: `ORD-2024-${String(vendorOrders.length + 4).padStart(3, '0')}`,
      orderDate: new Date().toISOString().split('T')[0]
    };
    setVendorOrders(prev => [...prev, newOrder]);
    toast.success('Order placed successfully!');
  };

  // Get current entries for selected date
  const selectedPeriodEntry = selectedDate ? 
    cycles.flatMap(cycle => cycle.entries).find(entry => entry.date === selectedDate) : 
    undefined;
  
  const selectedDayEntry = selectedDate ? 
    dayEntries.find(entry => entry.date === selectedDate) : 
    undefined;

  const hasNewInsights = aiInsights.some(insight => {
    const insightDate = new Date(insight.date);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return insightDate > threeDaysAgo;
  });

  const renderCustomerView = () => {
    switch (currentView) {
      case 'marketplace':
        return <Marketplace />;
      
      case 'cycletracking':
        return (
          <CycleTracking
            cycles={cycles}
            dayEntries={dayEntries}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            onSavePeriodEntry={handleSavePeriodEntry}
            onSaveDayEntry={handleSaveDayEntry}
            onDeletePeriodEntry={handleDeletePeriodEntry}
          />
        );
      
      case 'chatbot':
        return (
          <Chatbot />
        );
      
      case 'rewards':
        return (
          <Rewards
            achievements={achievements}
            userStats={userStats}
          />
        );
      
      case 'donations':
        return (
          <DonationTracker
            transactions={donationTransactions}
            stats={donationStats}
            onCreateDonation={handleCreateDonation}
          />
        );
      
      case 'profile':
        return (
          <Profile
            onExportData={handleExportData}
            onClearData={handleClearData}
            onShowWelcome={handleShowWelcomeTour}
          />
        );
      
      default:
        return null;
    }
  };

  const renderVendorView = () => {
    switch (vendorView) {
      case 'dashboard':
        return (
          <VendorDashboard 
            vendorStats={vendorStats}
            onOrderPlaced={handlePlaceOrder}
          />
        );
      
      case 'products':
        return (
          <VendorProducts
            products={vendorProducts}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      
      case 'map':
        return <VendorMap />;
      
      case 'profile':
        return (
          <VendorProfile
            vendorInfo={vendorInfo}
            onUpdateProfile={handleUpdateVendorProfile}
          />
        );
      
      default:
        return null;
    }
  };

  // Show welcome screen if user hasn't seen it yet
  if (showWelcome) {
    return (
      <ThemeProvider>
        <Welcome onGetStarted={handleGetStarted} />
        <Toaster position="top-right" />
      </ThemeProvider>
    );
  }

  // Show main app interface
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {userType === 'customer' ? (
          <div className="container mx-auto p-4 max-w-4xl">
            <div className="space-y-6">
              <Navigation
                currentView={currentView}
                onViewChange={setCurrentView}
                hasNewInsights={false}
                points={userStats.points}
                onLogout={handleLogout}
              />
              
              <main>
                {renderCustomerView()}
              </main>
            </div>
          </div>
        ) : (
          <div className="min-h-screen">
            <VendorNavigation
              currentView={vendorView}
              onViewChange={setVendorView}
              totalProducts={vendorProducts.length}
              onLogout={handleLogout}
            />
            
            <div className="container mx-auto p-4 max-w-6xl">
              <main>
                {renderVendorView()}
              </main>
            </div>
          </div>
        )}
        
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  );
}