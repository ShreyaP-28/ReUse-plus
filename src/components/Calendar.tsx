import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Circle, Droplets } from 'lucide-react';
import { PeriodEntry, Cycle, DayEntry } from '../types';

interface CalendarProps {
  cycles: Cycle[];
  dayEntries: DayEntry[];
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
}

export function Calendar({ cycles, dayEntries, onDateSelect, selectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(month - 1);
    } else {
      newDate.setMonth(month + 1);
    }
    setCurrentDate(newDate);
  };
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const getPeriodInfo = (dateStr: string) => {
    for (const cycle of cycles) {
      const periodEntry = cycle.entries.find(entry => entry.date === dateStr);
      if (periodEntry) {
        return { isPeriod: true, flow: periodEntry.flow };
      }
    }
    return { isPeriod: false, flow: null };
  };
  
  const getDayEntry = (dateStr: string) => {
    return dayEntries.find(entry => entry.date === dateStr);
  };
  
  const isToday = (date: Date) => {
    return formatDate(date) === formatDate(today);
  };
  
  const isSelected = (date: Date) => {
    return selectedDate === formatDate(date);
  };
  
  const isPredictedPeriod = (dateStr: string) => {
    if (cycles.length === 0) return false;
    
    const lastCycle = cycles[cycles.length - 1];
    if (!lastCycle.endDate || !lastCycle.length) return false;
    
    const nextPeriodStart = new Date(lastCycle.endDate);
    nextPeriodStart.setDate(nextPeriodStart.getDate() + lastCycle.length);
    
    const date = new Date(dateStr);
    const daysDiff = Math.abs((date.getTime() - nextPeriodStart.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysDiff <= 2; // Show prediction for 2 days around expected date
  };
  
  const renderCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = formatDate(date);
      const periodInfo = getPeriodInfo(dateStr);
      const dayEntry = getDayEntry(dateStr);
      const predicted = isPredictedPeriod(dateStr);
      
      days.push(
        <button
          key={day}
          onClick={() => onDateSelect(dateStr)}
          className={`
            h-12 w-full rounded-lg border-2 transition-all duration-200 relative
            ${isToday(date) ? 'border-primary' : 'border-transparent'}
            ${isSelected(date) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
            ${date > today ? 'text-muted-foreground' : ''}
          `}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-sm">{day}</span>
            <div className="flex gap-1 mt-1">
              {periodInfo.isPeriod && (
                <Droplets 
                  className={`h-2 w-2 ${
                    periodInfo.flow === 'heavy' ? 'text-red-600' :
                    periodInfo.flow === 'medium' ? 'text-red-400' :
                    'text-red-200'
                  }`}
                />
              )}
              {dayEntry && dayEntry.symptoms.length > 0 && (
                <Circle className="h-1.5 w-1.5 fill-orange-400 text-orange-400" />
              )}
              {predicted && !periodInfo.isPeriod && (
                <Circle className="h-1.5 w-1.5 fill-purple-300 text-purple-300" />
              )}
            </div>
          </div>
        </button>
      );
    }
    
    return days;
  };
  
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth('prev')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <h2 className="text-lg font-medium">
          {monthNames[month]} {year}
        </h2>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth('next')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
      
      <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Droplets className="h-3 w-3 text-red-400" />
          <span>Period</span>
        </div>
        <div className="flex items-center gap-1">
          <Circle className="h-2 w-2 fill-orange-400 text-orange-400" />
          <span>Symptoms</span>
        </div>
        <div className="flex items-center gap-1">
          <Circle className="h-2 w-2 fill-purple-300 text-purple-300" />
          <span>Predicted</span>
        </div>
      </div>
    </Card>
  );
}