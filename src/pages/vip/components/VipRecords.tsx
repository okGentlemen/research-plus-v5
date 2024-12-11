import React from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';

interface VipRecord {
  id: string;
  time: string;
  project: string;
  validPeriod: string;
  amount: number;
  orderNo: string;
}

interface VipRecordsProps {
  onClose: () => void;
}

export function VipRecords({ onClose }: VipRecordsProps) {
  // Mock data - replace with real API data
  const records: VipRecord[] = [
    {
      id: '1',
      time: '2024-10-14 14:22:56',
      project: '2万Token加油包',
      validPeriod: '永久有效',
      amount: 0.01,
      orderNo: '420000237220241014024531560'
    },
    {
      id: '2',
      time: '2024-10-12 17:34:01',
      project: 'VIP-月度',
      validPeriod: '2024-11-12',
      amount: 0.01,
      orderNo: '420000236720241012995676320'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-medium">我的开通记录</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">支付时间</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">购买项目</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">有效期</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">金额</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">订单号</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map(record => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{record.time}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{record.project}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{record.validPeriod}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">¥{record.amount.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{record.orderNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}