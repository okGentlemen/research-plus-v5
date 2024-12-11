import React, { useState, useEffect, useCallback, useRef } from 'react';
import { message } from 'antd';
import { paymentApi } from '@/api/payment';
import { useAppDispatch } from '@/hooks';
import { fetchVipInfo } from '@/store/slices/vipSlice';
import { PaymentQRCode } from './PaymentQRCode';
import { PaymentCountdown } from './PaymentCountdown';
import { PaymentMethods } from './PaymentMethods';
import { useDebounce } from '@/hooks/useDebounce';

interface PaymentSectionProps {
  businessType: 'vip' | 'token';
  businessId: string;
  amount: number;
  onSuccess?: () => void;
}

const EXPIRE_TIME = 3 * 60; // 3 minutes in seconds
const POLL_INTERVAL = 3000; // 3 seconds
const DEBOUNCE_DELAY = 300; // 300ms debounce delay

export function PaymentSection({ businessType, businessId, amount, onSuccess }: PaymentSectionProps) {
  const dispatch = useAppDispatch();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [sign, setSign] = useState<string>('');
  const [expired, setExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXPIRE_TIME);
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(false);
  const previousBusinessRef = useRef({ type: businessType, id: businessId });

  const fetchPaymentQRCode = async () => {
    if (!mountedRef.current) return;
    
    try {
      setLoading(true);
      const response = await paymentApi.getPaymentQRCode({
        businessType,
        businessId
      });
      
      if (mountedRef.current) {
        setQrCodeUrl(response.qrCodeUrl);
        setSign(response.sign);
        setTimeLeft(EXPIRE_TIME);
        setExpired(false);
      }
    } catch (error) {
      if (mountedRef.current) {
        message.error('获取支付二维码失败');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const debouncedFetchQRCode = useDebounce(fetchPaymentQRCode, DEBOUNCE_DELAY);

  // Initialize on mount
  useEffect(() => {
    mountedRef.current = true;
    fetchPaymentQRCode();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Handle business details changes with debounce
  useEffect(() => {
    const prevBusiness = previousBusinessRef.current;
    if (prevBusiness.type !== businessType || prevBusiness.id !== businessId) {
      previousBusinessRef.current = { type: businessType, id: businessId };
      debouncedFetchQRCode();
    }
  }, [businessType, businessId, debouncedFetchQRCode]);

  // Countdown timer
  useEffect(() => {
    if (expired || timeLeft <= 0) return;

    const timer = setInterval(() => {
      if (!mountedRef.current) return;
      
      setTimeLeft(prev => {
        if (prev <= 1) {
          setExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [expired, timeLeft]);

  // Check payment status
  const checkPaymentStatus = useCallback(async () => {
    if (!sign || !mountedRef.current) return false;
    
    try {
      const response = await paymentApi.queryPaymentStatus(sign);
      if (!mountedRef.current) return false;

      if (response.status === 'paid') {
        message.success('支付成功');
        dispatch(fetchVipInfo());
        onSuccess?.();
        return true;
      } else if (response.status === 'expired') {
        setExpired(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('查询支付状态失败:', error);
      return false;
    }
  }, [sign, dispatch, onSuccess]);

  // Poll payment status
  useEffect(() => {
    if (expired || !sign) return;

    const timer = setInterval(async () => {
      const shouldStop = await checkPaymentStatus();
      if (shouldStop && mountedRef.current) {
        clearInterval(timer);
      }
    }, POLL_INTERVAL);

    return () => clearInterval(timer);
  }, [expired, sign, checkPaymentStatus]);

  return (
    <div className="text-center">
      <p className="text-gray-500 mb-6">
        应付金额：<span className="text-xl font-semibold text-blue-600">¥{amount}</span>
      </p>

      <div className="flex justify-center mb-4">
        <PaymentQRCode
          url={qrCodeUrl}
          expired={expired}
          onRefresh={fetchPaymentQRCode}
          loading={loading}
        />
      </div>

      <div className="flex justify-center mb-4">
        <PaymentCountdown timeLeft={timeLeft} />
      </div>

      <PaymentMethods />

      <p className="text-xs text-gray-400 mt-4">
        * 购买后不支持退款，请谨慎选择
      </p>
    </div>
  );
}