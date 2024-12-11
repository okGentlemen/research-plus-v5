import { useState } from 'react';

interface CaptchaResult {
  ticket: string;
  randstr: string;
}

export function useCaptcha() {
  const [loading, setLoading] = useState(false);

  const verify = (): Promise<CaptchaResult> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      // Initialize Tencent Captcha
      const captcha = new window.TencentCaptcha('your-captcha-app-id', (res) => {
        setLoading(false);
        if (res.ret === 0) {
          resolve({
            ticket: res.ticket,
            randstr: res.randstr
          });
        } else {
          reject(new Error('验证失败，请重试'));
        }
      });

      captcha.show();
    });
  };

  return { verify, loading };
}