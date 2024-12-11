import React, { ReactNode } from 'react';

interface ResourceCardProps {
  icon: ReactNode;
  title: string;
  used: string;
  total: string;
  percentage: number;
  color?: string;
}

export function ResourceCard({ 
  icon, 
  title, 
  used, 
  total, 
  percentage, 
  color = 'bg-blue-600' 
}: ResourceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-gray-600">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-500">已使用 {used}</span>
          <span className="text-gray-900">总计 {total}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div
            className={`h-full rounded-full ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}