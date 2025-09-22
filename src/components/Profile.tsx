import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { User, Bell, Shield, Download, Trash2, AlertTriangle, Heart } from 'lucide-react';

interface ProfileProps {
  onExportData: () => void;
  onClearData: () => void;
  onShowWelcome?: () => void;
}

export function Profile({ onExportData, onClearData, onShowWelcome }: ProfileProps) {
  const [settings, setSettings] = useState({
    name: 'Sara',
    email: 'sara@gmail.com',
    notifications: true,
    reminders: true,
    dataSharing: false,
    predictiveInsights: true
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    console.log('Saving profile:', settings);
  };

  const handleDeleteData = () => {
    onClearData();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={settings.name}
              onChange={(e) => handleSettingChange('name', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => handleSettingChange('email', e.target.value)}
            />
          </div>

          <Button onClick={handleSaveProfile}>Save Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications & Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive general app notifications
              </p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Period Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get reminders to log your period
              </p>
            </div>
            <Switch
              checked={settings.reminders}
              onCheckedChange={(checked) => handleSettingChange('reminders', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & AI Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Anonymous Data Sharing</Label>
              <p className="text-sm text-muted-foreground">
                Help improve the app by sharing anonymous usage data
              </p>
            </div>
            <Switch
              checked={settings.dataSharing}
              onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Predictive AI Insights</Label>
              <p className="text-sm text-muted-foreground">
                Allow AI to analyze your data for personalized insights
              </p>
            </div>
            <Switch
              checked={settings.predictiveInsights}
              onCheckedChange={(checked) => handleSettingChange('predictiveInsights', checked)}
            />
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your health data is encrypted and stored securely. We never share personal 
              information with third parties. All AI analysis happens privately.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Export Your Data</Label>
            <p className="text-sm text-muted-foreground">
              Download all your tracking data in JSON format
            </p>
            <Button variant="outline" onClick={onExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>

          {onShowWelcome && (
            <div className="space-y-2">
              <Label>Welcome Tour</Label>
              <p className="text-sm text-muted-foreground">
                Revisit the ReUse+ welcome experience and feature overview
              </p>
              <Button variant="outline" onClick={onShowWelcome}>
                <Heart className="h-4 w-4 mr-2" />
                Show Welcome Tour
              </Button>
            </div>
          )}

          <Separator />

          <div className="space-y-2">
            <Label className="text-destructive">Danger Zone</Label>
            <p className="text-sm text-muted-foreground">
              Permanently delete all your data. This action cannot be undone.
            </p>
            
            {!showDeleteConfirm ? (
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete All Data
              </Button>
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-3">
                    <p>Are you sure you want to delete all your data? This action cannot be undone.</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={handleDeleteData}
                      >
                        Yes, Delete Everything
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowDeleteConfirm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <h3 className="font-medium text-blue-900">About ReUse+</h3>
            <p className="text-sm text-blue-700">
              Version 1.0.0 • Made with care for period health tracking
            </p>
            <p className="text-xs text-blue-600">
              Your privacy and health data security are our top priorities
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}