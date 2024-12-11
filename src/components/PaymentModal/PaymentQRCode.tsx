import React from 'react';
import { QRCode, Spin } from 'antd';
import { QrCode } from 'lucide-react';
import clsx from 'clsx';

interface PaymentQRCodeProps {
  url: string;
  expired: boolean;
  onRefresh: () => void;
  loading?: boolean;
  size?: number;
}

export function PaymentQRCode({ 
  url, 
  expired, 
  onRefresh, 
  loading = false,
  size = 200 
}: PaymentQRCodeProps) {
  const renderPlaceholder = () => (
    <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-100 rounded-lg">
      <QrCode className="w-12 h-12 text-gray-400" />
    </div>
  );

  if (loading) {
    return (
      <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-100 rounded-lg">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="relative">
      {url ? (
        <QRCode
          value={url}
          size={size}
          className={clsx(
            'bg-white p-4 rounded-lg transition-opacity',
            expired && 'opacity-50'
          )}
          errorLevel="H"
          onError={renderPlaceholder}
        />
      ) : (
        renderPlaceholder()
      )}
      
      {expired && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 rounded-lg">
          <p className="text-gray-600 font-medium mb-2">二维码已过期</p>
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>刷新二维码</span>
          </button>
        </div>
      )}
    </div>
  );
}