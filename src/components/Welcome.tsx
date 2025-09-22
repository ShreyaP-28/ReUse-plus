import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import { Sparkles, Calendar, Brain, Shield, Users, ArrowRight, CheckCircle, Store, ShoppingBag } from 'lucide-react';

interface WelcomeProps {
  onGetStarted: (userType: 'customer' | 'vendor') => void;
}

export function Welcome({ onGetStarted }: WelcomeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedUserType, setSelectedUserType] = useState<'customer' | 'vendor' | null>(null);

  const welcomeSteps = [
    {
      title: "",
      subtitle: "",
      content: (
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="transform scale-150">
                <Logo size="lg" showText={false} />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">Welcome to ReUse+</h1>
            <p className="text-lg text-muted-foreground font-medium">
              Intelligent Cycles. Sustainable Self-Care.
            </p>
          </div>

          <div className="pt-8">
            <Button
              onClick={() => setCurrentStep(1)}
              className="text-lg px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              Let's get started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      )
    },
    {
      title: "Smart Features",
      subtitle: "Everything you need for comprehensive cycle tracking",
      content: (
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
              <div className="p-2 bg-pink-500 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-pink-800">Period Calendar</h4>
                <p className="text-sm text-pink-600">Visual cycle tracking with predictions and insights</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-purple-800">AI Chatbot</h4>
                <p className="text-sm text-purple-600">Get personalized health recommendations and support</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-blue-800">Reward System</h4>
                <p className="text-sm text-blue-600">Earn points and badges for consistent tracking</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How will you use ReUse+?",
      subtitle: "Choose your experience type",
      content: (
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Are you a Customer or Vendor?</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Select your role to get the right experience tailored for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
            <div 
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedUserType === 'customer' 
                  ? 'border-purple-500 bg-purple-50 shadow-lg' 
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
              onClick={() => setSelectedUserType('customer')}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className={`p-4 rounded-full ${
                    selectedUserType === 'customer' ? 'bg-purple-500' : 'bg-gray-100'
                  }`}>
                    <Calendar className={`h-8 w-8 ${
                      selectedUserType === 'customer' ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Customer</h4>
                  <p className="text-sm text-muted-foreground">
                    Track your menstrual cycle, get AI insights, and access health resources
                  </p>
                </div>
                <div className="space-y-2 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-purple-500" />
                    <span>Period & symptom tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-3 w-3 text-purple-500" />
                    <span>AI-powered insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-purple-500" />
                    <span>Health recommendations</span>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedUserType === 'vendor' 
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
              onClick={() => setSelectedUserType('vendor')}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className={`p-4 rounded-full ${
                    selectedUserType === 'vendor' ? 'bg-blue-500' : 'bg-gray-100'
                  }`}>
                    <Store className={`h-8 w-8 ${
                      selectedUserType === 'vendor' ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Vendor</h4>
                  <p className="text-sm text-muted-foreground">
                    Sell menstrual health products, manage inventory, and connect with customers
                  </p>
                </div>
                <div className="space-y-2 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-3 w-3 text-blue-500" />
                    <span>Product management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-blue-500" />
                    <span>Customer connections</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-blue-500" />
                    <span>Location & contact info</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedUserType && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Great Choice!</span>
              </div>
              <p className="text-sm text-green-700">
                {selectedUserType === 'customer' 
                  ? 'You\'ll get access to comprehensive period tracking and health insights.'
                  : 'You\'ll get tools to manage your business and connect with customers.'
                }
              </p>
            </div>
          )}
        </div>
      )
    }
  ];

  const currentStepData = welcomeSteps[currentStep];
  const isLastStep = currentStep === welcomeSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      if (selectedUserType) {
        onGetStarted(selectedUserType);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
      {/* Theme Toggle in top right corner */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          {currentStep > 0 && (
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-3">
                <Logo size="md" showText={false} />
                <div className="text-left">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
                    ReUse+
                  </h1>
                  <p className="text-sm text-muted-foreground">Intelligent Cycles. Sustainable Self-Care</p>
                </div>
              </div>
            </div>
          )}
          
          {currentStepData.title && <CardTitle className="text-xl">{currentStepData.title}</CardTitle>}
          {currentStepData.subtitle && <p className="text-muted-foreground">{currentStepData.subtitle}</p>}
          
          {/* Progress indicators */}
          {currentStep > 0 && (
            <div className="flex justify-center gap-2 pt-2">
              {welcomeSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    index === currentStep 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                      : index < currentStep 
                        ? 'bg-green-400' 
                        : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          {currentStepData.content}
          
          {currentStep > 0 && (
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex items-center gap-2"
              >
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={isLastStep && !selectedUserType}
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50"
              >
                {isLastStep ? 'Get Started' : 'Next'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}