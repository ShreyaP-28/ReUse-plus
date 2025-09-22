import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MessageCircle, Bot, Sparkles } from 'lucide-react';

export function Chatbot() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Chatbot Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              <Bot className="h-10 w-10 text-purple-600" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Chatbot Coming Soon!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're working on an intelligent chatbot to help answer your questions about 
                menstrual health, cycle tracking, and provide personalized support.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-purple-600 mt-1" />
                <div className="space-y-2 text-left">
                  <h4 className="font-medium text-purple-900">What to Expect:</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• 24/7 support for health questions</li>
                    <li>• Personalized cycle insights</li>
                    <li>• Symptom guidance and tips</li>
                    <li>• Educational content</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button disabled className="bg-gradient-to-r from-purple-400 to-pink-400">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chatting (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <h3 className="font-medium text-blue-900">Need Help Now?</h3>
            <p className="text-sm text-blue-700">
              While our chatbot is in development, you can explore the Statistics and 
              Profile sections for insights about your cycle patterns.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}