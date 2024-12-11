import React from 'react';
import { FileText, Activity, Clock } from 'lucide-react';
import { StatCard } from './StatCard';

export function Stats() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <StatCard 
        icon={<FileText className="w-6 h-6" />}
        value={3}
        label="进行中的课题"
        change="1"
      />
      <StatCard 
        icon={<Activity className="w-6 h-6" />}
        value={12}
        label="研究活动"
        change="3"
      />
      <StatCard 
        icon={<Clock className="w-6 h-6" />}
        value={5}
        label="使用工具"
        change="2"
      />
    </div>
  );
}