export enum VipType {
  FREE = 0,
  VIP = 1,
  SVIP = 2,
  SVIP_PRO = 3
}

export enum VipDuration {
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year'
}

export interface VipBenefits {
  tokenPerDay: number;
  storageSpace: number; // in MB
  literatureLimit: number;
  translateLimit: number;
  pdfConvertLimit: number;
  searchLimit: number;
  uploadLimit: number; // in MB
}

export interface VipPlan {
  type: VipType;
  duration: VipDuration;
  price: number;
  originalPrice: number;
  benefits: VipBenefits;
}

export interface VipInfo {
  level: VipType;
  expireTime: string;
  benefits: VipBenefits;
}

export interface TokenState {
  dailyToken: number;
  permanentToken: number;
  usedToken: number;
  lastRefreshTime: string;
}