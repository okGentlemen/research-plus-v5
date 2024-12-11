import { VipType, VipBenefits } from '@/types/vip';

export const VIP_BENEFITS: Record<VipType, VipBenefits> = {
  [VipType.FREE]: {
    tokenPerDay: 2000,
    storageSpace: 100,
    literatureLimit: 5,
    translateLimit: 20,
    pdfConvertLimit: 20,
    searchLimit: 3,
    uploadLimit: 15
  },
  [VipType.VIP]: {
    tokenPerDay: 5000,
    storageSpace: 500,
    literatureLimit: 10,
    translateLimit: 100,
    pdfConvertLimit: 100,
    searchLimit: 10,
    uploadLimit: 30
  },
  [VipType.SVIP]: {
    tokenPerDay: 20000,
    storageSpace: 5 * 1024, // 5GB
    literatureLimit: 20,
    translateLimit: 200,
    pdfConvertLimit: 200,
    searchLimit: 30,
    uploadLimit: 30
  },
  [VipType.SVIP_PRO]: {
    tokenPerDay: 50000,
    storageSpace: 50 * 1024, // 50GB
    literatureLimit: 30,
    translateLimit: 500,
    pdfConvertLimit: 500,
    searchLimit: -1, // unlimited
    uploadLimit: 30
  }
};

export const VIP_PRICES = {
  [VipType.VIP]: {
    month: 39,
    quarter: 110,
    year: 279
  },
  [VipType.SVIP]: {
    month: 59,
    quarter: 169,
    year: 369
  },
  [VipType.SVIP_PRO]: {
    month: 99,
    quarter: 289,
    year: 479
  }
};

export const VIP_NAMES = {
  [VipType.FREE]: '非会员',
  [VipType.VIP]: 'VIP会员',
  [VipType.SVIP]: 'SVIP会员',
  [VipType.SVIP_PRO]: 'SVIP Pro会员'
};