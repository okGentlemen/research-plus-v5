import React from 'react';
import { FileText, Activity } from 'lucide-react';
import { Avatar } from '@radix-ui/react-avatar';

interface Activity {
  id: string;
  type: 'file' | 'activity';
  title: string;
  description: string;
  fileType?: string;
  fileSize?: string;
  tool?: string;
  project?: string;
  user: {
    name: string;
    avatar: string;
  };
  downloads?: number;
  timeAgo: string;
  status?: 'completed' | 'in-progress';
}

export function RecentActivities() {
  const recentUploads: Activity[] = [
    {
      id: '1',
      type: 'file',
      title: '深度学习在气候预测中的应用.pdf',
      description: 'PDF 2.3MB',
      user: {
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/40?img=1'
      },
      downloads: 5,
      timeAgo: '10分钟前',
      status: 'completed'
    },
    {
      id: '2',
      type: 'file',
      title: '气候变化数据集2024.zip',
      description: 'ZIP 156MB',
      user: {
        name: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/40?img=2'
      },
      downloads: 12,
      timeAgo: '2小时前'
    }
  ];

  const recentActivities: Activity[] = [
    {
      id: '3',
      type: 'activity',
      title: '气候数据分析',
      description: '完成数据预处理和初步分析',
      tool: '数据分析助手',
      project: '气候预测模型研究',
      user: {
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/40?img=3'
      },
      timeAgo: '10分钟前',
      status: 'in-progress'
    },
    {
      id: '4',
      type: 'activity',
      title: '模型验证实验',
      description: '进行神经网络模型性能测试',
      tool: '实验助手',
      project: '气候预测模型研究',
      user: {
        name: 'Team AI Lab',
        avatar: 'https://i.pravatar.cc/40?img=4'
      },
      timeAgo: '2小时前',
      status: 'in-progress'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-8 mb-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">最近上传</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">查看全部</button>
        </div>
        <div className="space-y-4">
          {recentUploads.map(activity => (
            <div key={activity.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="text-gray-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <span>⬇️ {activity.downloads}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">最近动态</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">查看全部</button>
        </div>
        <div className="space-y-4">
          {recentActivities.map(activity => (
            <div key={activity.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="text-gray-600">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <span>🛠️ {activity.tool}</span>
                    <span>•</span>
                    <span>📁 {activity.project}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-gray-500">{activity.timeAgo}</span>
                  {activity.status && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.status === 'completed' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      {activity.status === 'completed' ? '已完成' : '进行中'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}