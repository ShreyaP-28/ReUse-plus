import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import { Store, Package, MapPin, User, LogOut } from 'lucide-react';

interface VendorNavigationProps {
  currentView: 'dashboard' | 'products' | 'map' | 'profile';
  onViewChange: (view: 'dashboard' | 'products' | 'map' | 'profile') => void;
  totalProducts: number;
  onLogout: () => void;
}

export function VendorNavigation({ currentView, onViewChange, totalProducts, onLogout }: VendorNavigationProps) {
  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: Store,
      badge: null
    },
    {
      id: 'products' as const,
      label: 'Products',
      icon: Package,
      badge: totalProducts > 0 ? totalProducts.toString() : null
    },
    {
      id: 'map' as const,
      label: 'Map',
      icon: MapPin,
      badge: null
    },
    {
      id: 'profile' as const,
      label: 'Profile',
      icon: User,
      badge: null
    }
  ];

  return (
    <div className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Logo size="lg" showText={false} />
            <div>
              <h1 className="font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
                ReUse+ Vendor
              </h1>
              <p className="text-xs text-muted-foreground">Marketplace Dashboard</p>
            </div>
          </div>

          {/* Navigation & Theme Toggle */}
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onViewChange(item.id)}
                    className={`relative flex items-center gap-2 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="ml-1 h-5 px-1.5 text-xs bg-white text-primary"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </nav>
            <ThemeToggle />
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
      </div>
    </div>
  );
}