import { request } from '@/utils/request';

export interface LoginParams {
  mobile: string;
  password?: string;
  code?: string;
  type: 'mobile-pwd' | 'mobile-code' | 'account-pwd';
}

export interface RegisterParams {
  mobile: string;
  code: string;
  password: string;
}

export interface VerifyCodeParams {
  mobile: string;
  type: 'login' | 'register' | 'reset';
  ticket: string;
  randstr: string;
}

export const userApi = {
  login: (params: LoginParams) => 
    request.post('/api/auth/login', params),
    
  register: (params: RegisterParams) =>
    request.post('/api/auth/register', params),
    
  sendVerifyCode: (params: VerifyCodeParams) =>
    request.post('/api/auth/send-code', params),
    
  checkMobile: (mobile: string) =>
    request.get(`/api/auth/check-mobile/${mobile}`),
    
  resetPassword: (params: { mobile: string; code: string; password: string }) =>
    request.post('/api/auth/reset-password', params)
};