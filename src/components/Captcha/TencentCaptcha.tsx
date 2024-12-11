import React, { useEffect, useCallback } from 'react';
import { useTencentCaptcha } from '@/hooks/useTencentCaptcha';
import type { CaptchaProps } from '@/types/captcha';

export const TencentCaptcha: React.FC<CaptchaProps> = ({
  onSuccess,
  onFail
}) => {
  const { showCaptcha, isReady } = useTencentCaptcha();

  const handleCaptcha = useCallback(async () => {
    if (isReady) {
      console.log('handleCaptcha', true);
      await showCaptcha(onSuccess, onFail);
    }
  }, [showCaptcha, onSuccess, onFail, isReady]);

  useEffect(() => {
    handleCaptcha();
  }, [handleCaptcha]);

  return null;
};