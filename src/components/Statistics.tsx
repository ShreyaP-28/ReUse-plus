import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Cycle, DayEntry } from '../types';
import { Calendar, TrendingUp, Activity, Droplets } from 'lucide-react';

interface StatisticsProps {
  cycles: Cycle[];
  dayEntries: DayEntry[];
}

export function Statistics({ cycles, dayEntries }: StatisticsProps) {
  const cycleData = useMemo(() => {
    return cycles
      .filter(cycle => cycle.length)
      .map((cycle, index) => ({
        cycle: `Cycle ${index + 1}`,
        length: cycle.length,
        date: new Date(cycle.startDate).toLocaleDateString()
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
      .slice(-14) // Last 2 weeks
      .map(entry => ({
        date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        energy: entry.energy,
        sleep: entry.sleep,
        water: entry.water
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
      .map(([symptom, count]) => ({ symptom, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8); // Top 8 symptoms
  }, [dayEntries]);

  const moodData = useMemo(() => {
    const moodCounts = dayEntries
      .filter(entry => entry.mood)
      .reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(moodCounts)
      .map(([mood, count]) => ({ mood, count }))
      .sort((a, b) => b.count - a.count);
  }, [dayEntries]);

  const flowIntensityData = useMemo(() => {
    const flowCounts = cycles
      .flatMap(cycle => cycle.entries)
      .reduce((acc, entry) => {
        acc[entry.flow] = (acc[entry.flow] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(flowCounts)
      .map(([flow, count]) => ({ flow, count }));
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

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0', '#ffb3ba', '#87ceeb'];

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
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cycleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="cycle" />
                    <YAxis domain={[20, 35]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="length" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Flow Intensity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={flowIntensityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="count"
                      nameKey="flow"
                    >
                      {flowIntensityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Trends (Last 2 Weeks)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={energyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="energy" stroke="#8884d8" name="Energy (1-5)" />
                  <Line type="monotone" dataKey="sleep" stroke="#82ca9d" name="Sleep (hours)" />
                  <Line type="monotone" dataKey="water" stroke="#ffc658" name="Water (glasses)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Common Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={symptomData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="symptom" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mood" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={moodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={150}
                    dataKey="count"
                    nameKey="mood"
                  >
                    {moodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}