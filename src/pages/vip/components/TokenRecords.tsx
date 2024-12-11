import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TokenRecord {
  id: string;
  time: string;
  project: string;
  tokenAmount: number;
}

interface TokenRecordsProps {
  onClose: () => void;
}

export function TokenRecords({ onClose }: TokenRecordsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalRecords = 35; // This should come from API

  // Mock data - replace with real API data
  const records: TokenRecord[] = [
    {
      id: '1',
      time: '2024-10-21 16:48:10',
      project: '[对话] 1个鸡蛋是多少卡路里',
      tokenAmount: -1073
    },
    {
      id: '2',
      time: '2024-10-21 16:46:36',
      project: '[对话] 100g米饭包含多少能量',
      tokenAmount: -1010
    },
    // Add more mock data to test pagination
    ...Array.from({ length: 8 }, (_, i) => ({
      id: `${i + 3}`,
      time: '2024-10-21 16:46:36',
      project: `[对话] 测试记录 ${i + 1}`,
      tokenAmount: -1000 + i * 100
    }))
  ];

  const totalPages = Math.ceil(totalRecords / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Here you would fetch the new page of data from the API
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] h-[500px] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-medium">Token消耗记录</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">时间</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">项目</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">消耗Token数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map(record => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{record.time}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{record.project}</td>
                  <td className="py-3 px-4 text-sm text-red-500">{record.tokenAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            共 {totalRecords} 条记录
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一页
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1.5 text-sm rounded ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}