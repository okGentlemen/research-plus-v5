import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/hooks';
import { logout } from '@/store/slices/user';
import { User, Bell, Key, Webhook, Settings, LogOut, MoreHorizontal } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { VIP_NAMES } from '@/constants/vip';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { clsx } from 'clsx';
import { VipType } from '@/types/vip';

interface MenuItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  subLabel?: string;
  className?: string;
  onClick?: () => void;
}

function MenuItem({ icon: Icon, label, subLabel, className, onClick }: MenuItemProps) {
  return (
    <DropdownMenu.Item
      className={clsx(
        "flex items-center p-3 outline-none cursor-default select-none",
        "hover:bg-gray-50 rounded-lg data-[highlighted]:bg-gray-50",
        className
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4 mr-3" />
      <div className="flex-1">
        <div className={clsx("font-medium", className)}>{label}</div>
        {subLabel && (
          <div className="text-xs text-gray-500">{subLabel}</div>
        )}
      </div>
    </DropdownMenu.Item>
  );
}

export function UserProfile() {
  const { userInfo, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { vipInfo } = useSelector((state: RootState) => state.vip);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleProfileClick = () => {
    navigate('/settings/profile');
  };

  const handleOpenVipPage = () => {
    navigate('/vip');
  };

  if (!isAuthenticated) return null;

  const isVip = vipInfo.level !== VipType.FREE;

  return (
    <div className="relative border-t border-gray-200">
      <button 
        onClick={handleOpenVipPage}
        className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors"
      >
        {userInfo?.avatarUrl || userInfo?.avatar ? (
            <img 
              src={userInfo.avatarUrl || userInfo.avatar} 
              alt={userInfo.nickname || userInfo.username} 
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
	<div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-semibold">
          {userInfo?.nickname?.[0] || userInfo?.username?.[0] || 'U'}
        </div>
	)}
        <div className="ml-3 text-left flex-1">
          <div className="font-medium">{userInfo?.nickname || userInfo?.username}</div>
          <div className={clsx(
            "text-sm",
            isVip ? "text-blue-600" : "text-gray-400"
          )}>
            {isVip ? VIP_NAMES[vipInfo.level] : "未开通"}
          </div>
        </div>
      </button>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
            side="right"
            align="end"
            alignOffset={0}
            sideOffset={0}
            avoidCollisions={false}
          >
            <MenuItem 
              icon={User} 
              label="个人信息"
              subLabel="查看和编辑个人资料"
              onClick={handleProfileClick}
            />
            <MenuItem 
              icon={Bell} 
              label="通知设置"
              subLabel="管理通知和提醒" 
            />
            <MenuItem 
              icon={Key} 
              label="隐私设置"
              subLabel="管理隐私和安全选项" 
            />
            <MenuItem 
              icon={Webhook} 
              label="API设置"
              subLabel="管理API密钥和配额" 
            />
            <MenuItem 
              icon={Settings} 
              label="系统设置"
              subLabel="配置系统参数和规则" 
            />
            
            <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
            
            <MenuItem 
              icon={LogOut} 
              label="退出登录"
              onClick={handleLogout}
            />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}