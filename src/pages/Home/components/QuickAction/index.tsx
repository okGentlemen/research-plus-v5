import React, { ReactNode } from 'react';

interface QuickActionProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export function QuickAction({ icon, title, description, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center"
    >
      <div className="text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-500">{description}</p>
    </button>
  );
}