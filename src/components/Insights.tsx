import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { SimpleBarChart, SimpleLineChart, SimplePieChart } from './SimpleCharts';
import { Cycle, DayEntry } from '../types';
import { Calendar, TrendingUp, Activity, Droplets } from 'lucide-react';

interface InsightsProps {
  cycles: Cycle[];
  dayEntries: DayEntry[];
}

export function Insights({ cycles, dayEntries }: InsightsProps) {
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

  const moodData = useMemo(() => {
    const moodCounts = dayEntries
      .filter(entry => entry.mood)
      .reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(moodCounts)
      .map(([mood, count]) => ({ label: mood, value: count }))
      .sort((a, b) => b.value - a.value);
  }, [dayEntries]);

  const flowIntensityData = useMemo(() => {
    const flowCounts = cycles
      .flatMap(cycle => cycle.entries)
      .reduce((acc, entry) => {
        acc[entry.flow] = (acc[entry.flow] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(flowCounts)
      .map(([flow, count]) => ({ 
        label: flow.charAt(0).toUpperCase() + flow.slice(1), 
        value: count,
        color: flow === 'light' ? '#82ca9d' : flow === 'medium' ? '#ffc658' : '#ff7300'
      }));
  }, [cycles]);

  const averageCycleLength = useMemo(() => {
    const validCycles = cycles.filter(cycle => cycle.length);
    if (validCycles.length === 0) return 0;
    return Math.round(validCycles.reduce((sum, cycle) => sum + (cycle.length || 0), 0) / validCycles.length);
  }, [cycles]);

  const totalPeriodDays = useMemo(() => {
    return cycles.reduce((total, cycle) => total + cycle.entries.length, 0);
  }, [cycles]);

  const averageEnergyLevel = useMemo(() => {
    if (dayEntries.length === 0) return 0;
    return Math.round((dayEntries.reduce((sum, entry) => sum + entry.energy, 0) / dayEntries.length) * 10) / 10;
  }, [dayEntries]);

  const exerciseFrequency = useMemo(() => {
    if (dayEntries.length === 0) return 0;
    const exerciseDays = dayEntries.filter(entry => entry.exercise).length;
    return Math.round((exerciseDays / dayEntries.length) * 100);
  }, [dayEntries]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Exercise Rate</p>
                <p className="text-2xl font-bold">{exerciseFrequency}%</p>
                <p className="text-xs text-muted-foreground">of tracked days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="cycles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cycles">Cycles</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="mood">Mood</TabsTrigger>
        </TabsList>

        <TabsContent value="cycles" className="space-y-4">
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
                <CardTitle>Flow Intensity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {flowIntensityData.length > 0 ? (
                  <SimplePieChart data={flowIntensityData} height={250} />
                ) : (
                  <div className="h-60 flex items-center justify-center text-muted-foreground">
                    No flow data available yet
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-4">
          <Card>
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
        </TabsContent>

        <TabsContent value="mood" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {moodData.length > 0 ? (
                <SimplePieChart data={moodData} height={250} />
              ) : (
                <div className="h-60 flex items-center justify-center text-muted-foreground">
                  No mood data available yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}