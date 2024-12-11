import { request } from '@/utils/request';

export interface PaymentParams {
  businessType: 'vip' | 'token';
  businessId: string;
}

export interface PaymentResult {
  qrCodeUrl: string;
  sign: string;
  amount: number;
}

export const paymentApi = {
  // 获取支付二维码
  getPaymentQRCode: (params: PaymentParams) =>
    request.post<PaymentResult>('/api/payment/qrcode', params),
    
  // 查询支付状态
  queryPaymentStatus: (sign: string) =>
    request.get<{ status: 'pending' | 'paid' | 'expired' }>(`/api/payment/status/${sign}`)
};