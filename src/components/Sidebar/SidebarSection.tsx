import React from 'react';

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="py-3">
      <h2 className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
        {title}
      </h2>
      <div className="space-y-0.5">
        {children}
      </div>
    </div>
  );
}