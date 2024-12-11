import { useCallback, useRef, useState, useEffect } from 'react';
import { authApi } from '@/api/auth';
import type { CaptchaResult, CaptchaResponse } from '@/types/captcha';

const CAPTCHA_SCRIPT_URL = import.meta.env.VITE_CAPTCHA_SCRIPT_URL;
let isLoading = false;
let initializationPromise: Promise<string> | null = null;

export function useTencentCaptcha() {
  const appIdRef = useRef<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(!!window.TencentCaptcha);
  const captchaInstanceRef = useRef<any>(null);

  // Load script only once
  useEffect(() => {
    if (isLoading || window.TencentCaptcha) {
      setIsScriptLoaded(true);
      return;
    }

    isLoading = true;

    const script = document.createElement('script');
    script.src = CAPTCHA_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.id = 'tencent-captcha';

    script.onload = () => {
      isLoading = false;
      setIsScriptLoaded(true);
    };

    script.onerror = () => {
      isLoading = false;
      setIsScriptLoaded(false);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Initialize captcha with singleton pattern
  useEffect(() => {
    const initializeCaptcha = async () => {
      if (!isScriptLoaded || appIdRef.current) return;

      try {
        if (!initializationPromise) {
          initializationPromise = authApi.getTencentCloudInfo()
            .then(res => {
              appIdRef.current = res.captchaAppId;
              setIsInitialized(true);
              return res.captchaAppId;
            })
            .catch(error => {
              console.error('Failed to get captcha info:', error);
              setIsInitialized(false);
              initializationPromise = null;
              throw error;
            });
        }

        const captchaAppId = await initializationPromise;
        appIdRef.current = captchaAppId;
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize captcha:', error);
        setIsInitialized(false);
      }
    };

    initializeCaptcha();
  }, [isScriptLoaded]);

  const showCaptcha = useCallback(async (onSuccess: (result: CaptchaResult) => void, onFail?: () => void) => {
    try {
      if (!isScriptLoaded || !isInitialized || !appIdRef.current) {
        throw new Error('Captcha not initialized');
      }

      if (!window.TencentCaptcha) {
        throw new Error('Tencent Captcha script not loaded');
      }

      // Reuse existing instance if available
      if (!captchaInstanceRef.current) {
        captchaInstanceRef.current = new window.TencentCaptcha(appIdRef.current, (res: CaptchaResponse) => {
          if (res.ret === 0) {
            onSuccess({
              ticket: res.ticket,
              randstr: res.randstr
            });
          } else {
            onFail?.();
          }
        });
      }

      captchaInstanceRef.current.show();
    } catch (error) {
      console.error('Failed to show captcha:', error);
      onFail?.();
    }
  }, [isScriptLoaded, isInitialized]);

  return { showCaptcha, isReady: isScriptLoaded && isInitialized };
}