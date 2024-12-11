import React from 'react';
import { Button } from 'antd';
import { Lock } from 'lucide-react';
import type { UserInfo } from '@/api/auth';

interface SecuritySettingsProps {
  user: UserInfo;
}

export function SecuritySettings({ user }: SecuritySettingsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-6">密码设置</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Lock className="w-5 h-5 text-gray-400" />
          <div className="ml-3">
            <div className="font-medium">登录密码</div>
            <div className="text-sm text-gray-500">
              设置密码，账号更安全；为保证账号安全，修改密码需要进行二次验证
            </div>
          </div>
        </div>
        <Button type="link">修改</Button>
      </div>
    </div>
  );
}