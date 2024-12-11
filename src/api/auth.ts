import { request } from '@/utils/request';

export interface TencentCloudInfo {
  captchaPrefix: string;
  captchaAppId: string;
}

export interface SendCodeParams {
  mobile: string;
  randstr: string;
  ticket: string;
}

export interface LoginParams {
  mobile: string;
  code?: string;
  password?: string;
}

export interface PasswordLoginParams {
  username: string;
  password: string;
}

export interface UserInfo {
  token: string;
  userId: string;
  regOrgId: string | null;
  orgId: string;
  departmentId: string | null;
  orgName: string | null;
  orgType: string | null;
  needBindDepartment: boolean;
  departmentName: string | null;
  username: string;
  nickname: string;
  avatarUrl?: string;
  avatar?: string;
  status: number;
  hasLogoff: boolean;
  platform: string;
  mobile: string | null;
  wechatBind: boolean;
  mobileBind: boolean;
  orgExpireDate: string | null;
  orgExpired: boolean | null;
  modelConfig: any | null;
  modelVersionSwitch: boolean;
  userVipInfo: any | null;
  tokenActivity: any | null;
  invitationCode: string | null;
}

export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
  time?: number;
}

export const authApi = {
  // Get Tencent Cloud captcha info
  getTencentCloudInfo: () => 
    request.post<TencentCloudInfo>('/api/tencent-cloud/info'),

  // Send verification code
  sendVerificationCode: (params: SendCodeParams) =>
    request.post('/api/user-login/send-mobile-code', params),

  // Mobile verification code login
  mobileCodeLogin: (params: LoginParams) =>
    request.post<UserInfo>('/api/user-login/mobile-code', params),

  // Password login
  passwordLogin: (params: PasswordLoginParams) =>
    request.post<ApiResponse<UserInfo>>('/api/user-login/user-pass', params),

  // Logout
  logout: () => request.post('/api/user-login/logout')
};