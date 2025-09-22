import React from 'react';

interface SimpleBarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  height?: number;
}

export function SimpleBarChart({ data, height = 200 }: SimpleBarChartProps) {
  if (!data.length) return <div className="text-center text-muted-foreground">No data available</div>;
  
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="space-y-2" style={{ height }}>
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-20 text-sm text-right">{item.label}</div>
          <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || '#8884d8'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-end pr-2 text-xs text-foreground">
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface SimpleLineChartProps {
  data: Array<{ label: string; value: number }>;
  height?: number;
  color?: string;
}

export function SimpleLineChart({ data, height = 200, color = '#8884d8' }: SimpleLineChartProps) {
  if (!data.length) return <div className="text-center text-muted-foreground">No data available</div>;
  
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item.value - minValue) / range) * 100;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="space-y-4" style={{ height }}>
      <svg viewBox="0 0 100 100" className="w-full h-40 border rounded">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
        />
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((item.value - minValue) / range) * 100;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={color}
            />
          );
        })}
      </svg>
      <div className="flex justify-between text-xs text-muted-foreground">
        {data.map((item, index) => (
          <span key={index}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

interface SimplePieChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  height?: number;
}

export function SimplePieChart({ data, height = 200 }: SimplePieChartProps) {
  if (!data.length) return <div className="text-center text-muted-foreground">No data available</div>;
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0', '#ffb3ba', '#87ceeb'];
  
  let cumulativePercentage = 0;
  
  return (
    <div className="flex items-center gap-6" style={{ height }}>
      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-40 h-40 transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${percentage} ${100 - percentage}`;
            const strokeDashoffset = -cumulativePercentage;
            const color = item.color || colors[index % colors.length];
            
            cumulativePercentage += percentage;
            
            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="15.9155"
                fill="transparent"
                stroke={color}
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
      </div>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color || colors[index % colors.length] }}
            />
            <span className="text-sm">{item.label}: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}