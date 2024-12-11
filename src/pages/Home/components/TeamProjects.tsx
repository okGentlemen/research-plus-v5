import React from 'react';
import { Avatar } from '@radix-ui/react-avatar';

interface TeamMember {
  id: string;
  avatar: string;
}

interface TeamProject {
  id: string;
  title: string;
  description: string;
  lab: string;
  progress: number;
  members: TeamMember[];
  timeAgo: string;
}

export function TeamProjects() {
  const projects: TeamProject[] = [
    {
      id: '1',
      title: '气候变化研究',
      description: '全球气候变化趋势分析与预测模型研究',
      lab: '气候研究组',
      progress: 75,
      members: [
        { id: '1', avatar: 'https://i.pravatar.cc/40?img=1' },
        { id: '2', avatar: 'https://i.pravatar.cc/40?img=2' },
        { id: '3', avatar: 'https://i.pravatar.cc/40?img=3' }
      ],
      timeAgo: '10分钟前'
    },
    {
      id: '2',
      title: '神经网络优化',
      description: '深度学习模型性能优化与应用研究',
      lab: '人工智能实验室',
      progress: 45,
      members: [
        { id: '4', avatar: 'https://i.pravatar.cc/40?img=4' },
        { id: '5', avatar: 'https://i.pravatar.cc/40?img=5' }
      ],
      timeAgo: '2小时前'
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">团队研究课题</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">查看全部</button>
      </div>
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                {project.title[0]}
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">👥 {project.lab}</span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{project.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-gray-500">{project.timeAgo}</span>
                <div className="flex -space-x-2">
                  {project.members.map(member => (
                    <Avatar key={member.id} className="h-6 w-6 rounded-full border-2 border-white">
                      <img src={member.avatar} alt="" className="h-full w-full rounded-full" />
                    </Avatar>
                  ))}
                  {project.members.length > 2 && (
                    <span className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-white bg-gray-100 text-xs text-gray-600">
                      +{project.members.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}