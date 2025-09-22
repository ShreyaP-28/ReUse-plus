import React from 'react';

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

// Simple toast implementation to avoid external dependencies
export function toast(message: string, options?: { description?: string }) {
  // Create a simple notification using browser APIs
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(message, {
      body: options?.description,
      icon: '/favicon.ico'
    });
  } else {
    // Fallback to console log
    console.log('Toast:', message, options?.description);
  }
}

toast.success = (message: string, options?: { description?: string }) => {
  toast(`✅ ${message}`, options);
};

toast.error = (message: string, options?: { description?: string }) => {
  toast(`❌ ${message}`, options);
};

// Empty component for compatibility
export function Toaster() {
  return null;
}