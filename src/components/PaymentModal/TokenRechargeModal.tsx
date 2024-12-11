import React, { useState } from 'react';
import { Modal } from 'antd';
import { X, Info } from 'lucide-react';
import { PaymentSection } from './PaymentSection';
import { TokenPackage } from '@/types/payment';
import clsx from 'clsx';

interface TokenRechargeModalProps {
  open: boolean;
  onClose: () => void;
}

const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: '1',
    name: '10万Token加油包',
    tokens: 100000,
    price: 99,
    originalPrice: 149,
    pricePerToken: 9.9,
    validity: '永久有效'
  },
  {
    id: '2',
    name: '50万Token加油包',
    tokens: 500000,
    price: 199,
    originalPrice: 349,
    pricePerToken: 4,
    validity: '永久有效'
  },
  {
    id: '3',
    name: '100万Token加油包',
    tokens: 1000000,
    price: 269,
    originalPrice: 499,
    pricePerToken: 2.69,
    validity: '永久有效'
  }
];

export function TokenRechargeModal({ open, onClose }: TokenRechargeModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<TokenPackage>(TOKEN_PACKAGES[0]);

  const handlePackageSelect = (pkg: TokenPackage) => {
    setSelectedPackage(pkg);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      closeIcon={<X className="w-4 h-4" />}
      className="token-recharge-modal"
    >
      <div className="p-6">
        <div className="text-center mb-8">
          <h3 className="text-xl font-medium mb-2">充值Token</h3>
          <p className="text-gray-500">选择合适的Token充值包</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {TOKEN_PACKAGES.map((pkg) => {
            const discountPercentage = Math.round((1 - pkg.price / pkg.originalPrice) * 100);
            
            return (
              <div
                key={pkg.id}
                className={clsx(
                  'relative p-6 rounded-xl border-2 cursor-pointer transition-all',
                  selectedPackage.id === pkg.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-600 hover:shadow-lg'
                )}
                onClick={() => handlePackageSelect(pkg)}
              >
                {discountPercentage > 0 && (
                  <span className="absolute -top-2.5 right-4 px-3 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
                    省{discountPercentage}%
                  </span>
                )}

                <h4 className="text-lg font-medium mb-4">{pkg.name}</h4>
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold">¥{pkg.price}</span>
                    {pkg.originalPrice > pkg.price && (
                      <span className="text-sm text-gray-500 line-through">¥{pkg.originalPrice}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {pkg.pricePerToken}元/万Token
                  </div>
                </div>
                <div className="text-sm text-gray-600">{pkg.validity}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-gray-400 mt-0.5" />
            <div className="text-sm text-gray-500">
              <p className="mb-2">什么是Token?</p>
              <p>Token 是自然语言处理中的最小单位，可以是一个词、一个字或一个符号，用于对文本分割计算机器学习处理的部分，可以理解为文字或符号的计量单位。收费是根据处理文本的长度来计算。</p>
            </div>
          </div>
        </div>

        <PaymentSection
          businessType="token"
          businessId={selectedPackage.id}
          amount={selectedPackage.price}
          onSuccess={onClose}
        />
      </div>
    </Modal>
  );
}