import React, { useState } from 'react';
import { Modal, Tabs } from 'antd';
import { QrCodeLogin } from './components/QrCodeLogin';
import { MobileLogin } from './components/MobileLogin';
import { PasswordLogin } from './components/PasswordLogin';
import { ResetPassword } from './components/ResetPassword';
import { Logo } from '@/components/Logo';
import './styles.scss';

type TabKey = 'qrcode' | 'mobile' | 'password';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('qrcode');
  const [isResetting, setIsResetting] = useState(false);

  const handleBack = () => {
    setIsResetting(false);
  };

  const handleClose = () => {
    setIsResetting(false);
    onClose();
  };

  if (isResetting) {
    return (
      <Modal
        open={open}
        onCancel={handleClose}
        footer={null}
        width={400}
        className="login-modal"
        maskClosable={true}
      >
        <ResetPassword onBack={handleBack} />
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={400}
      className="login-modal"
      maskClosable={true}
    >
      <div className="login-modal-header">
        <Logo asLink={false} justify="center" />
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as TabKey)}
        className="login-tabs"
        centered
        items={[
          {
            key: 'qrcode',
            label: '扫码登录',
            children: <QrCodeLogin />
          },
          {
            key: 'mobile',
            label: '验证码登录',
            children: <MobileLogin onClose={handleClose}/>
          },
          {
            key: 'password',
            label: '密码登录',
            children: <PasswordLogin onForgotPassword={() => setIsResetting(true)} onClose={handleClose} />
          }
        ]}
      />
    </Modal>
  );
};