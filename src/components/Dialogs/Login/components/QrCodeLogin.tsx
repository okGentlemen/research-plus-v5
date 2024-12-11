import React from 'react';
import { QRCode } from 'antd';
import { WechatOutlined } from '@ant-design/icons';

export const QrCodeLogin: React.FC = () => {
  return (
    <div className="qrcode-login">
      <div className="qrcode-tip">
        <WechatOutlined className="wechat-icon" />
        <span>微信扫码，立即登录ResearchPlus</span>
      </div>
      
      <QRCode
        value="https://example.com/login"
        size={200}
        className="qrcode"
      />
      
      <div className="agreement">
        扫码注册即代表同意ResearchPlus
        <a href="/agreement" target="_blank">用户协议</a>、
        <a href="/privacy" target="_blank">隐私政策</a>
      </div>
    </div>
  );
};