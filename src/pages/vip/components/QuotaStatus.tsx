import React from 'react';
import { VipBenefits } from '@/types/vip';
import { Database } from 'lucide-react';

interface QuotaStatusProps {
  benefits: VipBenefits;
  usedQuotas: Partial<VipBenefits>;
}

export function QuotaStatus({ benefits, usedQuotas }: QuotaStatusProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col h-[300px]">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-medium">我的权益余量</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-custom">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-500 whitespace-nowrap">Token</span>
              <span className="text-gray-900 whitespace-nowrap">
                {usedQuotas.tokenPerDay} / {benefits.tokenPerDay}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ 
                  width: `${Math.min(100, (usedQuotas.tokenPerDay || 0) / benefits.tokenPerDay * 100)}%` 
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-500 whitespace-nowrap">文献管理空间</span>
              <span className="text-gray-900 whitespace-nowrap">
                {usedQuotas.storageSpace}MB / {benefits.storageSpace}MB
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full transition-all"
                style={{ 
                  width: `${Math.min(100, (usedQuotas.storageSpace || 0) / benefits.storageSpace * 100)}%` 
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-500 whitespace-nowrap">全文翻译</span>
              <span className="text-gray-900 whitespace-nowrap">
                {usedQuotas.translateLimit} / {benefits.translateLimit} 页/天
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-600 rounded-full transition-all"
                style={{ 
                  width: `${Math.min(100, (usedQuotas.translateLimit || 0) / benefits.translateLimit * 100)}%` 
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-500 whitespace-nowrap">PDF转WORD</span>
              <span className="text-gray-900 whitespace-nowrap">
                {usedQuotas.pdfConvertLimit} / {benefits.pdfConvertLimit} 页/天
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all"
                style={{ 
                  width: `${Math.min(100, (usedQuotas.pdfConvertLimit || 0) / benefits.pdfConvertLimit * 100)}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}