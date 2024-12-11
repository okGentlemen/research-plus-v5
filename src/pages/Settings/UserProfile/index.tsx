import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserProfileHeader } from './components/UserProfileHeader';
import { AccountBindings } from './components/AccountBindings';
import { SecuritySettings } from './components/SecuritySettings';
import { AccountDeletion } from './components/AccountDeletion';

export function UserProfile() {
  const { userInfo } = useAuth();

  if (!userInfo) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">账号设置</h1>
      
      <div className="space-y-8">
        <UserProfileHeader user={userInfo} />
        <AccountBindings user={userInfo} />
        <SecuritySettings user={userInfo} />
        <AccountDeletion />
      </div>
    </div>
  );
}