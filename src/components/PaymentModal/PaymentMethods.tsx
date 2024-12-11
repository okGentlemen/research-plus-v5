import React from 'react';
import alipayIcon from '@/assets/images/alipay.png';
import wechatIcon from '@/assets/images/wechat.png';

export function PaymentMethods() {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
      <span>支持</span>
      <img src={alipayIcon} alt="支付宝" className="h-5" />
      <span>支付宝</span>
      <span className="mx-1">或</span>
      <img src={wechatIcon} alt="微信支付" className="h-5" />
      <span>微信支付</span>
    </div>
  );
}