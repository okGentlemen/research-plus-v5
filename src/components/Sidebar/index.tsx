import React, { useState } from 'react';
import { 
  FileText, Activity, Settings, 
  PenTool, Database, TestTube,
  Calculator, Code, Coins,
  Lightbulb
} from 'lucide-react';
import { SidebarSection } from './SidebarSection';
import { SidebarItem } from './SidebarItem';
import { UserProfile } from './UserProfile';
import { LoginButton } from './LoginButton';
import { LoginModal } from '../Dialogs/Login/LoginModal';
import { useAuth } from '@/hooks/useAuth';

export function Sidebar() {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleItemClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-custom py-4">
          <SidebarSection title="研究课题">
            <SidebarItem 
              icon={FileText} 
              label="研究课题" 
              count={8} 
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={Activity} 
              label="研究活动" 
              count={12} 
              onClick={handleItemClick}
            />
          </SidebarSection>

          <SidebarSection title="研究工具">
            <SidebarItem 
              icon={PenTool} 
              label="文献AI" 
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={PenTool} 
              label="写作助手" 
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={Database} 
              label="数据分析" 
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={TestTube} 
              label="实验助手" 
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={Calculator} 
              label="算法助手" 
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={Code} 
              label="编程助手" 
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={FileText} 
              label="专利助手" 
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={Coins} 
              label="基金助手" 
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={Lightbulb} 
              label="研究规划" 
              onClick={handleItemClick}
            />
          </SidebarSection>

          <SidebarSection title="研究资源">
            <SidebarItem 
              icon={Database} 
              label="数据集" 
              count={32} 
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={FileText} 
              label="文献库" 
              count={484} 
              onClick={handleItemClick}
            />
            <SidebarItem 
              icon={Activity} 
              label="模型库" 
              count={30} 
              onClick={handleItemClick}
            />
          </SidebarSection>

          <SidebarSection title="系统设置">
            <SidebarItem 
              icon={Settings} 
              label="设置" 
              onClick={handleItemClick}
            />
          </SidebarSection>
        </div>

        {isAuthenticated ? (
          <UserProfile />
        ) : (
          <LoginButton onClick={() => setShowLoginModal(true)} />
        )}
      </aside>

      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}