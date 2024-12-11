import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ 
  icon: Icon, 
  label, 
  count, 
  isActive = false,
  onClick
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg mx-2 w-[calc(100%-16px)] transition-colors whitespace-nowrap',
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-gray-100'
      )}
    >
      <Icon className="h-[18px] w-[18px] mr-3 flex-shrink-0" />
      <span className="flex-1 text-left truncate">{label}</span>
      {count !== undefined && (
        <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
          {count}
        </span>
      )}
    </button>
  );
}