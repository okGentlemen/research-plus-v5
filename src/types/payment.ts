export interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  originalPrice: number;
  pricePerToken: number;
  validity: string;
}

export interface PaymentOrder {
  orderId: string;
  amount: number;
  qrCodeUrl: string;
  status: 'pending' | 'paid' | 'expired' | 'failed';
}