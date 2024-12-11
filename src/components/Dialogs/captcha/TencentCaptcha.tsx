import React, { useEffect } from 'react';
import { CAPTCHA_APP_ID } from '../Login/const';

declare global {
  interface Window {
    TencentCaptcha: any;
  }
}

interface TencentCaptchaProps {
  onSuccess: (result: { ticket: string; randstr: string }) => void;
  onFail?: () => void;
}

export const TencentCaptcha: React.FC<TencentCaptchaProps> = ({
  onSuccess,
  onFail
}) => {
  useEffect(() => {
    // Load Tencent Captcha script
    const script = document.createElement('script');
    script.src = import.meta.env.VITE_CAPTCHA_SCRIPT_URL;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleShow = () => {
    const captcha = new window.TencentCaptcha(CAPTCHA_APP_ID, (res: any) => {
      if (res.ret === 0) {
        onSuccess({
          ticket: res.ticket,
          randstr: res.randstr
        });
      } else {
        onFail?.();
      }
    });
    captcha.show();
  };

  return null;
};

export default TencentCaptcha;