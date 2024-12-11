import React from 'react';
import { clsx } from 'clsx';
import { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  subLabel?: string;
  className?: string;
}

export function MenuItem({ icon: Icon, label, subLabel, className }: MenuItemProps) {
  return (
    <a
      href="#"
      className={clsx(
        "flex items-center p-2 hover:bg-gray-100 rounded-lg",
        className
      )}
    >
      <Icon className="h-4 w-4 mr-3" />
      <div className="flex-1">
        <div className={clsx("font-medium", className)}>{label}</div>
        {subLabel && (
          <div className="text-xs text-gray-500">{subLabel}</div>
        )}
      </div>
    </a>
  );
}