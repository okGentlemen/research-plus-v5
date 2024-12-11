import React from 'react';
import { Stats } from './components/Stats';
import { QuickActions } from './components/QuickActions';
import { TeamProjects } from './components/TeamProjects';
import { RecentActivities } from './components/RecentActivities';
import { ResourceStatus } from './components/ResourceStatus';

export function Home() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">欢迎回来，Alex</h1>
        <p className="text-gray-500">查看您的研究项目和最新活动</p>
      </div>

      <Stats />
      <QuickActions />
      <TeamProjects />
      <RecentActivities />
      <ResourceStatus />
    </div>
  );
}