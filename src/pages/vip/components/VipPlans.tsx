import React, { useState } from 'react';
import { VipType, VipDuration } from '@/types/vip';
import { VIP_PRICES, VIP_NAMES } from '@/constants/vip';
import { Crown, Zap } from 'lucide-react';
import { PaymentModal } from '@/components/PaymentModal';
import clsx from 'clsx';

interface VipPlansProps {
  currentVipType: VipType;
}

interface PriceInfo {
  monthlyPrice: number;
  totalPrice: number;
  hasDiscount: boolean;
  originalMonthlyPrice: number;
  discountPercentage: number;
}

export function VipPlans({ currentVipType }: VipPlansProps) {
  const [selectedDuration, setSelectedDuration] = useState<VipDuration>(VipDuration.MONTH);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedVipType, setSelectedVipType] = useState<VipType | null>(null);

  const getDurationLabel = (duration: VipDuration) => {
    switch (duration) {
      case VipDuration.MONTH:
        return '月付';
      case VipDuration.QUARTER:
        return '季付';
      case VipDuration.YEAR:
        return '年付';
    }
  };

  const getVipIcon = (type: VipType) => {
    switch (type) {
      case VipType.VIP:
        return <Crown className="w-5 h-5 text-blue-600" />;
      case VipType.SVIP:
        return <Crown className="w-5 h-5 text-yellow-600" />;
      case VipType.SVIP_PRO:
        return <Zap className="w-5 h-5 text-purple-600" />;
      default:
        return null;
    }
  };

  const getPriceInfo = (type: VipType, duration: VipDuration): PriceInfo => {
    const prices = VIP_PRICES[type];
    const totalPrice = prices[duration];
    const monthlyDivisor = duration === VipDuration.QUARTER ? 3 : (duration === VipDuration.YEAR ? 12 : 1);
    const monthlyPrice = Math.floor(totalPrice / monthlyDivisor);
    const regularMonthlyTotal = prices.month * monthlyDivisor;
    const hasDiscount = totalPrice < regularMonthlyTotal;
    const discountPercentage = hasDiscount 
      ? Math.round((1 - totalPrice / regularMonthlyTotal) * 100) 
      : 0;

    return {
      monthlyPrice,
      totalPrice,
      hasDiscount,
      originalMonthlyPrice: prices.month,
      discountPercentage
    };
  };

  const handlePurchase = (vipType: VipType) => {
    setSelectedVipType(vipType);
    setShowPaymentModal(true);
  };

  return (
    <div>
      <div className="flex justify-center gap-4 mb-6">
        {Object.values(VipDuration).map((duration) => (
          <button
            key={duration}
            onClick={() => setSelectedDuration(duration)}
            className={clsx(
              'px-6 py-2 rounded-full text-sm font-medium transition-colors',
              selectedDuration === duration
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {getDurationLabel(duration)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {Object.entries(VIP_PRICES).map(([type]) => {
          const vipType = parseInt(type) as VipType;
          const priceInfo = getPriceInfo(vipType, selectedDuration);
          const isCurrentPlan = currentVipType === vipType;

          return (
            <div
              key={type}
              className={clsx(
                'relative p-6 rounded-xl border-2 transition-all',
                isCurrentPlan
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-600 hover:shadow-lg'
              )}
            >
              {isCurrentPlan && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                  当前方案
                </span>
              )}

              {priceInfo.hasDiscount && (
                <span className="absolute -top-2.5 right-4 px-3 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
                  省{priceInfo.discountPercentage}%
                </span>
              )}

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  {getVipIcon(vipType)}
                  <h3 className="text-lg font-medium">{VIP_NAMES[vipType]}</h3>
                </div>

                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-semibold">¥{priceInfo.monthlyPrice}</span>
                  <span className="text-sm text-gray-500">/月</span>
                </div>
                
                {priceInfo.hasDiscount && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-400 line-through">
                      原价 ¥{priceInfo.originalMonthlyPrice}/月
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      总计 ¥{priceInfo.totalPrice}/{selectedDuration === VipDuration.QUARTER ? '季' : '年'}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handlePurchase(vipType)}
                disabled={isCurrentPlan}
                className={clsx(
                  'w-full py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isCurrentPlan
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                )}
              >
                {isCurrentPlan ? '当前会员' : '立即开通'}
              </button>
            </div>
          );
        })}
      </div>

      {showPaymentModal && selectedVipType && (
        <PaymentModal
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          businessType="vip"
          businessId={`${selectedVipType}-${selectedDuration}`}
          amount={getPriceInfo(selectedVipType, selectedDuration).totalPrice}
        />
      )}
    </div>
  );
}