import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { MapPin, Compass } from 'lucide-react';

export function VendorMap() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location & Discovery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-6">
            <div className="flex justify-center">
              <div className="p-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full">
                <Compass className="h-16 w-16 text-purple-600" />
              </div>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <h3 className="font-medium text-2xl">Coming Soon</h3>
              <p className="text-muted-foreground">
                Interactive map showing your store location, nearby customers, and partner vendors. 
                Full mapping functionality with GPS navigation and real-time business analytics 
                coming soon.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  We're developing advanced location-based tools to help you find customers, 
                  partners, and optimize your business reach. Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}