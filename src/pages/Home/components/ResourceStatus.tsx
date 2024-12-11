import React from 'react';
import { Database, Cpu, Activity } from 'lucide-react';
import { ResourceCard } from './ResourceCard';

export function ResourceStatus() {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">资源状态</h2>
      <div className="grid grid-cols-3 gap-6">
        <ResourceCard 
          icon={<Database className="w-5 h-5" />}
          title="数据存储"
          used="156 GB"
          total="512 GB"
          percentage={30}
        />
        <ResourceCard 
          icon={<Cpu className="w-5 h-5" />}
          title="计算资源"
          used="4"
          total="8 核心"
          percentage={50}
          color="bg-green-600"
        />
        <ResourceCard 
          icon={<Activity className="w-5 h-5" />}
          title="API配额"
          used="8000"
          total="10000 次"
          percentage={80}
          color="bg-yellow-600"
        />
      </div>
    </div>
  );
}