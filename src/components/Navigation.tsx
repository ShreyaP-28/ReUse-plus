import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import { ViewMode } from '../types';
import { Calendar, Edit3, Brain, Trophy, BarChart3, User, Coins, MapPin, LogOut } from 'lucide-react';

interface NavigationProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  hasNewInsights?: boolean;
  points?: number;
  onLogout: () => void;
}

export function Navigation({ currentView, onViewChange, hasNewInsights, points, onLogout }: NavigationProps) {
  const navItems = [
    {
      id: 'marketplace' as ViewMode,
      label: 'Marketplace',
      icon: MapPin,
      description: 'Find vendors & products'
    },
    {
      id: 'cycletracking' as ViewMode,
      label: 'Cycle Tracking',
      icon: Calendar,
      description: 'Calendar, logs & insights'
    },
    {
      id: 'chatbot' as ViewMode,
      label: 'Chatbot',
      icon: Brain,
      description: 'Get support & answers',
      badge: hasNewInsights
    },
    {
      id: 'rewards' as ViewMode,
      label: 'Rewards',
      icon: Trophy,
      description: 'Achievements & points'
    },
    {
      id: 'donations' as ViewMode,
      label: 'Donations',
      icon: Coins,
      description: 'Blockchain transparency'
    },
    {
      id: 'profile' as ViewMode,
      label: 'Profile',
      icon: User,
      description: 'Settings & info'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="lg" showText={false} />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">ReUse+</h1>
            <p className="text-sm text-muted-foreground">Intelligent Cycles. Sustainable Self-Care</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {points !== undefined && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 px-3 py-2 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <span className="font-medium text-yellow-800 dark:text-yellow-200">{points} pts</span>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-800 dark:hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "outline"}
              onClick={() => onViewChange(item.id)}
              className={`h-auto p-4 flex flex-col items-center gap-2 relative ${
                isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <Icon className="h-5 w-5" />
              <div className="text-center">
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
              {item.badge && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  !
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="text-purple-700 dark:text-purple-300">
            <strong>Today:</strong> Track your day to maintain your streak!
          </div>
          <div className="text-purple-600 dark:text-purple-400">
            AI ready to analyze your patterns
          </div>
        </div>
      </div>
    </div>
  );
}