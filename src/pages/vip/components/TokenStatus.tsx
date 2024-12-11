import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { Button } from '@/components/Button';
import { TokenRechargeModal } from '@/components/PaymentModal/TokenRechargeModal';

interface TokenStatusProps {
  dailyToken: number;
  permanentToken: number;
  usedToken: number;
  onViewRecords: () => void;
}

export function TokenStatus({ 
  dailyToken, 
  permanentToken, 
  usedToken,
  onViewRecords 
}: TokenStatusProps) {
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const totalToken = dailyToken + permanentToken;
  const percentage = Math.min(100, (usedToken / totalToken) * 100);

  return (
    <>
      <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col h-[300px]">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-medium">Token余额</h2>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-500 mb-3">每日Token</div>
              <div className="text-xl font-semibold whitespace-nowrap">{dailyToken.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-3">永久Token</div>
              <div className="text-xl font-semibold whitespace-nowrap">{permanentToken.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-3">已使用Token</div>
              <div className="text-xl font-semibold whitespace-nowrap">{usedToken.toLocaleString()}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-500">Token使用进度</span>
              <span className="text-gray-900">{percentage.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={onViewRecords} className="flex-1">
            使用记录
          </Button>
          <Button size="sm" className="flex-1" onClick={() => setShowRechargeModal(true)}>
            充值Token
          </Button>
        </div>
      </div>

      <TokenRechargeModal
        open={showRechargeModal}
        onClose={() => setShowRechargeModal(false)}
      />
    </>
  );
}