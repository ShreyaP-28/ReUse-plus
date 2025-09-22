import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Coins, Heart, Shield, Users, Clock } from 'lucide-react';

interface DonationTrackerProps {
  transactions: any[];
  stats: any;
  onCreateDonation: any;
}

export function DonationTracker({ transactions, stats, onCreateDonation }: DonationTrackerProps) {

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Donation Tracking System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-4">
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <p className="font-medium">Charitable Giving</p>
                <p className="text-sm text-muted-foreground">Support students in need</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <p className="font-medium">Blockchain Security</p>
                <p className="text-sm text-muted-foreground">Transparent transactions</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <p className="font-medium">Impact Tracking</p>
                <p className="text-sm text-muted-foreground">Track beneficiary progress</p>
              </div>
            </div>
            
            <div className="max-w-md mx-auto">
              <h3 className="font-medium mb-2">Coming Soon</h3>
              <p className="text-muted-foreground text-sm">
                Advanced donation tracking system with blockchain-powered transparency. 
                Features will include secure transactions, beneficiary management, 
                and real-time impact analytics.
              </p>
              
              <div className="mt-4 space-y-2 text-sm text-left">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span>Blockchain transaction recording</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>NGO verification and transparency</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span>Student beneficiary tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span>Real-time impact measurement</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}