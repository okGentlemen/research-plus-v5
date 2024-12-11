import React from 'react';
import { PlusCircle, Play, Upload, Users, Share } from 'lucide-react';
import { QuickAction } from './QuickAction';

export function QuickActions() {
  return (
    <div className="grid grid-cols-5 gap-6 mb-8">
      <QuickAction 
        icon={<PlusCircle className="w-6 h-6" />}
        title="新建研究课题"
        description="创建新的研究项目"
      />
      <QuickAction 
        icon={<Play className="w-6 h-6" />}
        title="开始研究活动"
        description="使用AI工具开展研究"
      />
      <QuickAction 
        icon={<Upload className="w-6 h-6" />}
        title="上传研究资料"
        description="添加文献或数据文件"
      />
      <QuickAction 
        icon={<Users className="w-6 h-6" />}
        title="邀请团队成员"
        description="添加新的团队成员"
      />
      <QuickAction 
        icon={<Share className="w-6 h-6" />}
        title="分享研究成果"
        description="与团队共享研究进展"
      />
    </div>
  );
}