import React, { useState, useEffect } from 'react';
import { VipPlans } from './components/VipPlans';
import { VipBenefitsComparison } from './components/VipBenefitsComparison';
import { TokenStatus } from './components/TokenStatus';
import { QuotaStatus } from './components/QuotaStatus';
import { VipRecords } from './components/VipRecords';
import { TokenRecords } from './components/TokenRecords';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { fetchVipInfo } from '@/store/slices/vipSlice';

export function VipPage() {
  const dispatch = useDispatch();
  const { vipInfo, tokenState } = useSelector((state: RootState) => state.vip);
  const [showVipRecords, setShowVipRecords] = useState(false);
  const [showTokenRecords, setShowTokenRecords] = useState(false);

  // Mock used quotas data - replace with real API data
  const usedQuotas = {
    tokenPerDay: 2811,
    storageSpace: 50,
    translateLimit: 15,
    pdfConvertLimit: 8
  };

  useEffect(() => {
    dispatch(fetchVipInfo());
  }, [dispatch]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">会员中心</h1>
        <p className="text-gray-500">升级会员，享受更多权益</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <QuotaStatus 
          benefits={vipInfo.benefits}
          usedQuotas={usedQuotas}
        />
        <TokenStatus 
          dailyToken={tokenState.dailyToken}
          permanentToken={tokenState.permanentToken}
          usedToken={tokenState.usedToken}
          onViewRecords={() => setShowTokenRecords(true)}
        />
      </div>

      <VipPlans currentVipType={vipInfo.level} onViewRecords={() => setShowVipRecords(true)} />
      
      <div className="mt-12">
        <h2 className="text-lg font-medium text-gray-900 mb-6">会员权益对比</h2>
        <VipBenefitsComparison currentVipType={vipInfo.level} />
      </div>

      {showVipRecords && <VipRecords onClose={() => setShowVipRecords(false)} />}
      {showTokenRecords && <TokenRecords onClose={() => setShowTokenRecords(false)} />}
    </div>
  );
}