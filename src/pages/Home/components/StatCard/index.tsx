import React, { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: number;
  label: string;
  change: string;
}

export function StatCard({ icon, value, label, change }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          {icon}
        </div>
        <div className="flex items-center text-sm text-green-600">
          <span>+{change}</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
      </div>
    </div>
  );
}