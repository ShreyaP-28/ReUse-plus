import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Achievement, UserStats } from '../types';
import { Trophy, Star, Flame, Target, Lock, Calendar, TrendingUp, Leaf, Award, Shield, Heart } from 'lucide-react';

interface RewardsProps {
  achievements: Achievement[];
  userStats: UserStats;
}

export function Rewards({ achievements, userStats }: RewardsProps) {
  const [selectedTab, setSelectedTab] = useState<'achievements' | 'stats' | 'badges'>('achievements');

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  
  const totalPoints = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  const completionRate = (unlockedAchievements.length / achievements.length) * 100;

  // Sustainability badges data
  const sustainabilityBadges = [
    {
      id: 'eco_warrior',
      title: 'Eco Warrior',
      description: 'Used reusable products for 30+ days',
      icon: '🌱',
      level: 'Gold',
      unlocked: true
    },
    {
      id: 'planet_protector',
      title: 'Planet Protector',
      description: 'Consistent sustainable usage for 6 months',
      icon: '🌍',
      level: 'Platinum',
      unlocked: true
    },
    {
      id: 'green_champion',
      title: 'Green Champion',
      description: 'Used menstrual cups for 3+ cycles',
      icon: '🏆',
      level: 'Silver',
      unlocked: true
    },
    {
      id: 'sustainability_starter',
      title: 'Sustainability Starter',
      description: 'Try your first reusable product',
      icon: '🌿',
      level: 'Bronze',
      unlocked: true
    },
    {
      id: 'waste_reducer',
      title: 'Waste Reducer',
      description: 'Reduce period waste for 1 year',
      icon: '♻️',
      level: 'Diamond',
      unlocked: false,
      progress: 75
    },
    {
      id: 'influence_maker',
      title: 'Influence Maker',
      description: 'Inspire friends to switch to reusable products',
      icon: '💚',
      level: 'Special',
      unlocked: false,
      progress: 33
    }
  ];

  const unlockedBadges = sustainabilityBadges.filter(b => b.unlocked);
  const lockedBadges = sustainabilityBadges.filter(b => !b.unlocked);

  const getBadgeColor = (level: string) => {
    switch (level) {
      case 'Bronze':
        return 'from-orange-100 to-amber-100 border-orange-200 text-orange-900';
      case 'Silver':
        return 'from-gray-100 to-slate-100 border-gray-200 text-slate-900';
      case 'Gold':
        return 'from-yellow-100 to-amber-100 border-yellow-200 text-yellow-900';
      case 'Platinum':
        return 'from-purple-100 to-violet-100 border-purple-200 text-purple-900';
      case 'Diamond':
        return 'from-blue-100 to-cyan-100 border-blue-200 text-blue-900';
      case 'Special':
        return 'from-green-100 to-emerald-100 border-green-200 text-green-900';
      default:
        return 'from-gray-100 to-slate-100 border-gray-200 text-slate-900';
    }
  };

  const getAchievementProgress = (achievement: Achievement) => {
    switch (achievement.id) {
      case 'week_streak':
        return Math.min((userStats.currentStreak / 7) * 100, 100);
      case 'month_streak':
        return Math.min((userStats.currentStreak / 30) * 100, 100);
      case 'symptom_tracker':
        return Math.min((userStats.totalEntries / 10) * 100, 100);
      default:
        return achievement.unlocked ? 100 : 0;
    }
  };

  const getProgressDescription = (achievement: Achievement) => {
    const progress = getAchievementProgress(achievement);
    if (achievement.unlocked) return 'Completed!';
    
    switch (achievement.id) {
      case 'week_streak':
        return `${userStats.currentStreak}/7 days`;
      case 'month_streak':
        return `${userStats.currentStreak}/30 days`;
      case 'symptom_tracker':
        return `${Math.min(userStats.totalEntries, 10)}/10 entries`;
      default:
        return 'Not started';
    }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ComponentType<any>;
  }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700">Total Points</p>
                <p className="text-3xl font-bold text-yellow-900">{totalPoints}</p>
                <p className="text-xs text-yellow-600">Keep tracking to earn more!</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Current Streak</p>
                <p className="text-3xl font-bold text-green-900">{userStats.currentStreak}</p>
                <p className="text-xs text-green-600">consecutive days</p>
              </div>
              <Flame className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Completion</p>
                <p className="text-3xl font-bold text-purple-900">{Math.round(completionRate)}%</p>
                <p className="text-xs text-purple-600">{unlockedAchievements.length}/{achievements.length} unlocked</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <Card>
        <CardHeader>
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setSelectedTab('achievements')}
              className={`pb-2 px-1 border-b-2 transition-colors ${
                selectedTab === 'achievements' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Achievements
              </div>
            </button>
            <button
              onClick={() => setSelectedTab('stats')}
              className={`pb-2 px-1 border-b-2 transition-colors ${
                selectedTab === 'stats' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Statistics
              </div>
            </button>
            <button
              onClick={() => setSelectedTab('badges')}
              className={`pb-2 px-1 border-b-2 transition-colors ${
                selectedTab === 'badges' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Sustainability Badges
              </div>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {selectedTab === 'achievements' ? (
            <div className="space-y-6">
              {/* Unlocked Achievements */}
              {unlockedAchievements.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Unlocked Achievements
                  </h3>
                  <div className="grid gap-4">
                    {unlockedAchievements.map(achievement => (
                      <Card key={achievement.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{achievement.icon}</div>
                              <div>
                                <h4 className="font-medium text-green-900">{achievement.title}</h4>
                                <p className="text-sm text-green-700">{achievement.description}</p>
                                {achievement.unlockedDate && (
                                  <p className="text-xs text-green-600 mt-1">
                                    Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800 border-green-300">
                              +{achievement.points} pts
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Locked Achievements */}
              {lockedAchievements.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    Locked Achievements
                  </h3>
                  <div className="grid gap-4">
                    {lockedAchievements.map(achievement => {
                      const progress = getAchievementProgress(achievement);
                      return (
                        <Card key={achievement.id}>
                          <CardContent className="pt-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="text-2xl grayscale">{achievement.icon}</div>
                                  <div>
                                    <h4 className="font-medium">{achievement.title}</h4>
                                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                  </div>
                                </div>
                                <Badge variant="outline">
                                  +{achievement.points} pts
                                </Badge>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span>{getProgressDescription(achievement)}</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : selectedTab === 'stats' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard
                title="Total Entries"
                value={userStats.totalEntries}
                subtitle="days tracked"
                icon={Calendar}
              />
              <StatCard
                title="Average Cycle"
                value={`${userStats.averageCycleLength} days`}
                subtitle="cycle length"
                icon={Target}
              />
              <StatCard
                title="Tracking Since"
                value={new Date(userStats.trackingStartDate).toLocaleDateString()}
                subtitle="start date"
                icon={Calendar}
              />
              <StatCard
                title="Longest Streak"
                value={userStats.currentStreak}
                subtitle="consecutive days"
                icon={Flame}
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Unlocked Badges */}
              {unlockedBadges.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    Earned Badges
                  </h3>
                  <div className="grid gap-4">
                    {unlockedBadges.map(badge => (
                      <Card key={badge.id} className={`bg-gradient-to-r ${getBadgeColor(badge.level)}`}>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{badge.icon}</div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{badge.title}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {badge.level}
                                  </Badge>
                                </div>
                                <p className="text-sm opacity-80">{badge.description}</p>
                              </div>
                            </div>
                            <Shield className="h-8 w-8 opacity-20" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Towards New Badges */}
              {lockedBadges.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    Next Goals
                  </h3>
                  <div className="grid gap-4">
                    {lockedBadges.map(badge => (
                      <Card key={badge.id}>
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl grayscale">{badge.icon}</div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">{badge.title}</h4>
                                    <Badge variant="outline" className="text-xs">
                                      {badge.level}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                                </div>
                              </div>
                              <Lock className="h-6 w-6 text-muted-foreground" />
                            </div>
                            
                            {badge.progress !== undefined && (
                              <Progress value={badge.progress} className="h-2" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}