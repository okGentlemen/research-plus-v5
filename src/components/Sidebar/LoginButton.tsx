import React from 'react';
import { LogInIcon } from 'lucide-react';

interface LoginButtonProps {
  onClick: () => void;
}

export function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
    >
      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
        <LogInIcon className="h-5 w-5" />
      </div>
      <div className="flex-1 text-left">
        <div className="font-medium text-gray-900">登录</div>
        <div className="text-sm text-gray-500">登录后即可使用全部功能</div>
      </div>
    </button>
  );
}