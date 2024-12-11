export interface CaptchaResult {
  ticket: string;
  randstr: string;
}

export interface CaptchaProps {
  onSuccess: (result: CaptchaResult) => void;
  onFail?: () => void;
}

export interface CaptchaResponse {
  ret: number;
  ticket: string;
  randstr: string;
}

declare global {
  interface Window {
    TencentCaptcha: new (appId: string, callback: (res: CaptchaResponse) => void) => {
      show: () => void;
    };
  }
}