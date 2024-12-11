import React from 'react';
import { Button } from 'antd';
import { Phone, MessageSquare } from 'lucide-react';
import type { UserInfo } from '@/api/auth';

interface AccountBindingsProps {
  user: UserInfo;
}

export function AccountBindings({ user }: AccountBindingsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-6">账号绑定</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-gray-400" />
            <div className="ml-3">
              <div className="font-medium">绑定手机号</div>
              <div className="text-sm text-gray-500">
                {user.mobile ? user.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '未绑定'}
              </div>
            </div>
          </div>
          <Button type="link">更换</Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <div className="ml-3">
              <div className="font-medium">绑定微信</div>
              <div className="text-sm text-gray-500">
                {user.wechatBind ? '已绑定' : '未绑定'}
              </div>
            </div>
          </div>
          <Button type="link">
            {user.wechatBind ? '解绑' : '绑定'}
          </Button>
        </div>
      </div>
    </div>
  );
}