import { request } from '@/utils/request';
import { VipType, VipDuration, VipInfo } from '@/types/vip';
import { VIP_BENEFITS } from '@/constants/vip';

export interface CreateOrderParams {
  vipType: VipType;
  duration: VipDuration;
  paymentMethod: 'wechat' | 'alipay';
}

// Mock data for development
const mockVipInfo: VipInfo = {
  level: VipType.FREE,
  expireTime: '',
  benefits: VIP_BENEFITS[VipType.FREE]
};

export const vipApi = {
  // 获取会员信息
  getVipInfo: () => {
    if (process.env.NODE_ENV === 'development') {
      return Promise.resolve({ data: mockVipInfo });
    }
    return request.get('/api/vip/info');
  },
    
  // 创建订单
  createOrder: (params: CreateOrderParams) =>
    request.post('/api/vip/order/create', params),
    
  // 查询订单状态
  queryOrder: (orderId: string) =>
    request.get(`/api/vip/order/${orderId}`),
    
  // 获取Token使用记录
  getTokenRecords: (params: { page: number; pageSize: number }) =>
    request.get('/api/vip/token/records', { params }),
    
  // 刷新每日Token
  refreshDailyToken: () =>
    request.post('/api/vip/token/refresh'),
    
  // Token充值
  rechargeToken: (params: { amount: number; paymentMethod: string }) =>
    request.post('/api/vip/token/recharge', params)
};