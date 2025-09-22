import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AIInsight } from '../types';
import { Brain, TrendingUp, Heart, Calendar, Lightbulb, RefreshCw } from 'lucide-react';

interface AIInsightsProps {
  insights: AIInsight[];
  onRefresh: () => void;
}

export function AIInsights({ insights, onRefresh }: AIInsightsProps) {
  const [selectedType, setSelectedType] = useState<string>('all');

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern':
        return <TrendingUp className="h-4 w-4" />;
      case 'health':
        return <Heart className="h-4 w-4" />;
      case 'prediction':
        return <Calendar className="h-4 w-4" />;
      case 'recommendation':
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'pattern':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'health':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'prediction':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'recommendation':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredInsights = selectedType === 'all' 
    ? insights 
    : insights.filter(insight => insight.type === selectedType);

  const sortedInsights = filteredInsights.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const insightTypes = ['all', 'pattern', 'health', 'prediction', 'recommendation'];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Insights
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {insightTypes.map(type => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>

          {sortedInsights.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No insights available yet.</p>
              <p className="text-sm">Keep tracking to get personalized insights!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedInsights.map(insight => (
                <Card key={insight.id} className={`border-l-4 ${getInsightColor(insight.type)}`}>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getInsightIcon(insight.type)}
                          <h3 className="font-medium">{insight.title}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`font-medium ${getConfidenceColor(insight.confidence)}`}>
                            {insight.confidence}% confidence
                          </span>
                          <Badge variant="outline" className="capitalize">
                            {insight.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {insight.message}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Generated on {new Date(insight.date).toLocaleDateString()}</span>
                        <div className="flex items-center gap-1">
                          <div className={`h-2 w-2 rounded-full ${
                            insight.confidence >= 80 ? 'bg-green-500' :
                            insight.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <span>AI Analysis</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-purple-900">About AI Insights</h3>
              <p className="text-sm text-purple-700 leading-relaxed">
                Our AI analyzes your tracking data to identify patterns, predict your next period, 
                and provide personalized health recommendations. The more you track, the more 
                accurate and helpful these insights become.
              </p>
              <div className="flex items-center gap-4 text-xs text-purple-600 mt-3">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <span>High confidence (80%+)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                  <span>Medium confidence (60-79%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 bg-red-500 rounded-full" />
                  <span>Low confidence (&lt;60%)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}