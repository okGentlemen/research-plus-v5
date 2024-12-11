import React from 'react';

interface PaymentCountdownProps {
  timeLeft: number;
}

export function PaymentCountdown({ timeLeft }: PaymentCountdownProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-gray-500">
      支付倒计时：
      <span className="text-blue-600 font-medium">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}