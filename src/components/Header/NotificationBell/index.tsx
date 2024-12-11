import React from 'react';
import { Bell } from 'lucide-react';

export function NotificationBell() {
  return (
    <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
      <Bell className="w-5 h-5 text-gray-600" />
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
    </button>
  );
}