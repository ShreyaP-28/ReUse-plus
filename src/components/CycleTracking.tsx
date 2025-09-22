import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { SimpleSelect } from './SimpleSelect';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { SimpleBarChart, SimpleLineChart, SimplePieChart } from './SimpleCharts';
import { PeriodEntry, DayEntry, Cycle, SYMPTOMS, MOODS } from '../types';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Circle, 
  Droplets,
  Heart,
  Zap,
  Moon,
  Waves,
  Dumbbell,
  TrendingUp,
  Activity,
  BarChart3,
  Edit3
} from 'lucide-react';

interface CycleTrackingProps {
  cycles: Cycle[];
  dayEntries: DayEntry[];
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
  onSavePeriodEntry: (entry: PeriodEntry) => void;
  onSaveDayEntry: (entry: DayEntry) => void;
  onDeletePeriodEntry: (id: string) => void;
}

export function CycleTracking({
  cycles,
  dayEntries,
  onDateSelect,
  selectedDate,
  onSavePeriodEntry,
  onSaveDayEntry,
  onDeletePeriodEntry
}: CycleTrackingProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('calendar');

  // Calendar logic
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

  // Form state
  const selectedPeriodEntry = selectedDate ? 
    cycles.flatMap(cycle => cycle.entries).find(entry => entry.date === selectedDate) : 
    undefined;
  
  const selectedDayEntry = selectedDate ? 
    dayEntries.find(entry => entry.date === selectedDate) : 
    undefined;

  const symptomsArray = SYMPTOMS || [
    'Cramps', 'Headache', 'Bloating', 'Breast tenderness', 'Acne', 'Back pain',
    'Nausea', 'Fatigue', 'Mood swings', 'Food cravings', 'Insomnia', 'Hot flashes'
  ];
  
  const moodsArray = MOODS || [
    'Happy', 'Sad', 'Anxious', 'Irritable', 'Calm', 'Energetic', 'Tired', 'Stressed'
  ];

  const [isPeriodDay, setIsPeriodDay] = useState(!!selectedPeriodEntry);
  const [flow, setFlow] = useState(selectedPeriodEntry?.flow || 'medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    selectedDayEntry?.symptoms || selectedPeriodEntry?.symptoms || []
  );
  const [mood, setMood] = useState(selectedDayEntry?.mood || selectedPeriodEntry?.mood || '');
  const [energy, setEnergy] = useState([selectedDayEntry?.energy || 3]);
  const [sleep, setSleep] = useState([selectedDayEntry?.sleep || 8]);
  const [water, setWater] = useState([selectedDayEntry?.water || 8]);
  const [exercise, setExercise] = useState(selectedDayEntry?.exercise || false);
  const [notes, setNotes] = useState(selectedDayEntry?.notes || selectedPeriodEntry?.notes || '');

  // Update form when selected date changes
  React.useEffect(() => {
    const periodEntry = selectedDate ? 
      cycles.flatMap(cycle => cycle.entries).find(entry => entry.date === selectedDate) : 
      undefined;
    
    const dayEntry = selectedDate ? 
      dayEntries.find(entry => entry.date === selectedDate) : 
      undefined;

    setIsPeriodDay(!!periodEntry);
    setFlow(periodEntry?.flow || 'medium');
    setSelectedSymptoms(dayEntry?.symptoms || periodEntry?.symptoms || []);
    setMood(dayEntry?.mood || periodEntry?.mood || '');
    setEnergy([dayEntry?.energy || 3]);
    setSleep([dayEntry?.sleep || 8]);
    setWater([dayEntry?.water || 8]);
    setExercise(dayEntry?.exercise || false);
    setNotes(dayEntry?.notes || periodEntry?.notes || '');
  }, [selectedDate, cycles, dayEntries]);

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

  const handleDateSelect = (dateStr: string) => {
    onDateSelect(dateStr);
    setActiveTab('log'); // Switch to log tab when date is selected
  };

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    if (!selectedDate) return;

    if (isPeriodDay) {
      const entry: PeriodEntry = {
        id: selectedPeriodEntry?.id || `period_${Date.now()}`,
        date: selectedDate,
        flow,
        symptoms: selectedSymptoms,
        mood,
        notes
      };
      onSavePeriodEntry(entry);
    }

    // Always save day entry for additional tracking
    const dayEntryData: DayEntry = {
      id: selectedDayEntry?.id || `day_${Date.now()}`,
      date: selectedDate,
      symptoms: selectedSymptoms,
      mood,
      energy: energy[0],
      sleep: sleep[0],
      water: water[0],
      exercise,
      notes
    };
    onSaveDayEntry(dayEntryData);
  };

  const handleDeletePeriod = () => {
    if (selectedPeriodEntry) {
      onDeletePeriodEntry(selectedPeriodEntry.id);
      setIsPeriodDay(false);
    }
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
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(dateStr)}
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
            </div>
          </div>
        </button>
      );
    }
    
    return days;
  };

  // Insights calculations
  const cycleData = useMemo(() => {
    return cycles
      .filter(cycle => cycle.length)
      .map((cycle, index) => ({
        label: `Cycle ${index + 1}`,
        value: cycle.length || 0
      }))
      .slice(-6); // Last 6 cycles
  }, [cycles]);

  const energyTrendData = useMemo(() => {
    const last30Days = dayEntries
      .filter(entry => {
        const entryDate = new Date(entry.date);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return entryDate >= thirtyDaysAgo;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7) // Last week
      .map(entry => ({
        label: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
        value: entry.energy
      }));

    return last30Days;
  }, [dayEntries]);

  const symptomData = useMemo(() => {
    const symptomCounts = dayEntries
      .flatMap(entry => entry.symptoms)
      .reduce((acc, symptom) => {
        acc[symptom] = (acc[symptom] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(symptomCounts)
      .map(([symptom, count]) => ({ label: symptom, value: count }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6); // Top 6 symptoms
  }, [dayEntries]);

  const averageCycleLength = useMemo(() => {
    const validCycles = cycles.filter(cycle => cycle.length);
    if (validCycles.length === 0) return 28;
    return Math.round(validCycles.reduce((sum, cycle) => sum + (cycle.length || 0), 0) / validCycles.length);
  }, [cycles]);

  const totalPeriodDays = useMemo(() => {
    return cycles.reduce((total, cycle) => total + cycle.entries.length, 0);
  }, [cycles]);

  const averageEnergyLevel = useMemo(() => {
    if (dayEntries.length === 0) return 0;
    return Math.round((dayEntries.reduce((sum, entry) => sum + entry.energy, 0) / dayEntries.length) * 10) / 10;
  }, [dayEntries]);

  const renderLogForm = () => {
    if (!selectedDate) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          Select a date from the calendar to start logging.
        </div>
      );
    }

    const date = new Date(selectedDate);
    const isToday = selectedDate === new Date().toISOString().split('T')[0];
    const isFuture = date > new Date();

    if (isFuture) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Future dates cannot be edited.</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            {isToday && <Badge variant="secondary">Today</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Period Tracking */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="period"
                checked={isPeriodDay}
                onCheckedChange={setIsPeriodDay}
              />
              <Label htmlFor="period" className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                Period Day
              </Label>
            </div>

            {isPeriodDay && (
              <div>
                <Label>Flow Intensity</Label>
                <SimpleSelect 
                  value={flow} 
                  onValueChange={setFlow}
                  options={[
                    { value: 'light', label: 'Light' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'heavy', label: 'Heavy' }
                  ]}
                />
              </div>
            )}

            {selectedPeriodEntry && (
              <Button variant="destructive" size="sm" onClick={handleDeletePeriod}>
                Remove Period Day
              </Button>
            )}
          </div>

          {/* Symptoms */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Symptoms
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {symptomsArray.map(symptom => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={selectedSymptoms.includes(symptom)}
                    onCheckedChange={() => handleSymptomToggle(symptom)}
                  />
                  <Label htmlFor={symptom} className="text-sm">{symptom}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Waves className="h-4 w-4" />
              Mood
            </Label>
            <SimpleSelect 
              value={mood} 
              onValueChange={setMood}
              placeholder="Select your mood"
              options={moodsArray.map(moodOption => ({
                value: moodOption,
                label: moodOption
              }))}
            />
          </div>

          {/* Energy Level */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Energy Level: {energy[0]}/5
            </Label>
            <Slider
              value={energy}
              onValueChange={setEnergy}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Sleep */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              Sleep: {sleep[0]} hours
            </Label>
            <Slider
              value={sleep}
              onValueChange={setSleep}
              max={12}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Water Intake */}
          <div className="space-y-3">
            <Label>Water Intake: {water[0]} glasses</Label>
            <Slider
              value={water}
              onValueChange={setWater}
              max={15}
              min={0}
              step={1}
              className="w-full"
            />
          </div>

          {/* Exercise */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="exercise"
              checked={exercise}
              onCheckedChange={setExercise}
            />
            <Label htmlFor="exercise" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              Exercise
            </Label>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <Label>Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes..."
              rows={3}
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Entry
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="log" className="flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            Daily Log
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
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
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="log">
          {renderLogForm()}
        </TabsContent>

        <TabsContent value="insights">
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Cycle Length</p>
                      <p className="text-2xl font-bold">{averageCycleLength}</p>
                      <p className="text-xs text-muted-foreground">days</p>
                    </div>
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Period Days</p>
                      <p className="text-2xl font-bold">{totalPeriodDays}</p>
                      <p className="text-xs text-muted-foreground">tracked</p>
                    </div>
                    <Droplets className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Energy</p>
                      <p className="text-2xl font-bold">{averageEnergyLevel}</p>
                      <p className="text-xs text-muted-foreground">out of 5</p>
                    </div>
                    <Activity className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cycle Length Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  {cycleData.length > 0 ? (
                    <SimpleLineChart data={cycleData} height={250} color="#8884d8" />
                  ) : (
                    <div className="h-60 flex items-center justify-center text-muted-foreground">
                      No cycle data available yet
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Energy Trends (Last Week)</CardTitle>
                </CardHeader>
                <CardContent>
                  {energyTrendData.length > 0 ? (
                    <SimpleLineChart data={energyTrendData} height={250} color="#82ca9d" />
                  ) : (
                    <div className="h-60 flex items-center justify-center text-muted-foreground">
                      No energy data available yet
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Most Common Symptoms</CardTitle>
                </CardHeader>
                <CardContent>
                  {symptomData.length > 0 ? (
                    <SimpleBarChart data={symptomData} height={300} />
                  ) : (
                    <div className="h-60 flex items-center justify-center text-muted-foreground">
                      No symptom data available yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}