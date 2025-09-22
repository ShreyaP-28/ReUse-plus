import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { SimpleSelect } from './SimpleSelect';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { PeriodEntry, DayEntry, SYMPTOMS, MOODS } from '../types';
import { Calendar, Droplets, Heart, Zap, Moon, Waves, Dumbbell } from 'lucide-react';

interface DayEntryFormProps {
  selectedDate: string;
  periodEntry?: PeriodEntry;
  dayEntry?: DayEntry;
  onSavePeriodEntry: (entry: PeriodEntry) => void;
  onSaveDayEntry: (entry: DayEntry) => void;
  onDeletePeriodEntry: (id: string) => void;
}

export function DayEntryForm({
  selectedDate,
  periodEntry,
  dayEntry,
  onSavePeriodEntry,
  onSaveDayEntry,
  onDeletePeriodEntry
}: DayEntryFormProps) {
  // Fallback arrays in case imports fail
  const symptomsArray = SYMPTOMS || [
    'Cramps', 'Headache', 'Bloating', 'Breast tenderness', 'Acne', 'Back pain',
    'Nausea', 'Fatigue', 'Mood swings', 'Food cravings', 'Insomnia', 'Hot flashes'
  ];
  
  const moodsArray = MOODS || [
    'Happy', 'Sad', 'Anxious', 'Irritable', 'Calm', 'Energetic', 'Tired', 'Stressed'
  ];
  const [isPeriodDay, setIsPeriodDay] = useState(!!periodEntry);
  const [flow, setFlow] = useState(periodEntry?.flow || 'medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    dayEntry?.symptoms || periodEntry?.symptoms || []
  );
  const [mood, setMood] = useState(dayEntry?.mood || periodEntry?.mood || '');
  const [energy, setEnergy] = useState([dayEntry?.energy || 3]);
  const [sleep, setSleep] = useState([dayEntry?.sleep || 8]);
  const [water, setWater] = useState([dayEntry?.water || 8]);
  const [exercise, setExercise] = useState(dayEntry?.exercise || false);
  const [notes, setNotes] = useState(dayEntry?.notes || periodEntry?.notes || '');

  const date = new Date(selectedDate);
  const isToday = selectedDate === new Date().toISOString().split('T')[0];
  const isFuture = date > new Date();

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    if (isPeriodDay) {
      const entry: PeriodEntry = {
        id: periodEntry?.id || `period_${Date.now()}`,
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
      id: dayEntry?.id || `day_${Date.now()}`,
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
    if (periodEntry) {
      onDeletePeriodEntry(periodEntry.id);
      setIsPeriodDay(false);
    }
  };

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
          <Calendar className="h-5 w-5" />
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

          {periodEntry && (
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
}