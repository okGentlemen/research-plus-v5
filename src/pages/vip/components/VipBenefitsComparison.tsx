import React from 'react';
import { VipType } from '@/types/vip';
import { VIP_BENEFITS, VIP_NAMES } from '@/constants/vip';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface VipBenefitsComparisonProps {
  currentVipType: VipType;
}

export function VipBenefitsComparison({ currentVipType }: VipBenefitsComparisonProps) {
  const benefits = [
    { key: 'tokenPerDay', label: '每日Token', format: (value: number) => `${value.toLocaleString()}/天` },
    { key: 'storageSpace', label: '文献管理空间', format: (value: number) => value >= 1024 ? `${value/1024}GB` : `${value}MB` },
    { key: 'literatureLimit', label: '文献综述篇数', format: (value: number) => `${value}篇` },
    { key: 'translateLimit', label: '全文翻译', format: (value: number) => `${value}页/天` },
    { key: 'pdfConvertLimit', label: 'PDF转Word', format: (value: number) => `${value}页/天` },
    { key: 'searchLimit', label: '学术搜索', format: (value: number) => value === -1 ? '不限次数' : `${value}次/天` },
    { key: 'uploadLimit', label: '单篇上传限制', format: (value: number) => `${value}MB` }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-t border-gray-200">
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">权益</th>
            {Object.values(VipType).filter(v => typeof v === 'number').map((type) => (
              <th
                key={type}
                className={clsx(
                  'py-4 px-6 text-left text-sm font-medium',
                  currentVipType === type ? 'text-blue-600' : 'text-gray-500'
                )}
              >
                {VIP_NAMES[type as VipType]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {benefits.map(({ key, label, format }) => (
            <tr key={key} className="hover:bg-gray-50">
              <td className="py-4 px-6 text-sm text-gray-500">{label}</td>
              {Object.values(VipType).filter(v => typeof v === 'number').map((type) => {
                const value = VIP_BENEFITS[type as VipType][key as keyof typeof VIP_BENEFITS[VipType]];
                return (
                  <td
                    key={type}
                    className={clsx(
                      'py-4 px-6 text-sm',
                      currentVipType === type ? 'text-blue-600 font-medium' : 'text-gray-900'
                    )}
                  >
                    {format(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}