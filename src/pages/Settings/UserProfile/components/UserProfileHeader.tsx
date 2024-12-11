import React from 'react';
import type { UserInfo } from '@/api/auth';

interface UserProfileHeaderProps {
  user: UserInfo;
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center">
        {user.avatar || user.avatarUrl ? (
          <img 
            src={user.avatar || user.avatarUrl} 
            alt={user.nickname || user.username}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-2xl font-semibold">
            {(user.nickname || user.username)?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
        
        <div className="ml-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {user.nickname || user.username}
          </h2>
          <p className="text-gray-500 mt-1">
            {user.mobile?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
          </p>
        </div>
      </div>
    </div>
  );
}