import React from 'react';
import { Button } from 'antd';
import { AlertTriangle } from 'lucide-react';

export function AccountDeletion() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-6">注销账号</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <div className="ml-3">
            <div className="font-medium">注销账号</div>
            <div className="text-sm text-gray-500">
              您的账号一旦注销将无法恢复，功能将无法使用
            </div>
          </div>
        </div>
        <Button danger type="link">申请注销</Button>
      </div>
    </div>
  );
}