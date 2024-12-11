import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack = location.pathname !== '/';

  if (!canGoBack) {
    return null;
  }

  return (
    <button 
      onClick={() => navigate(-1)}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="返回"
    >
      <ChevronLeft className="w-5 h-5 text-gray-600" />
    </button>
  );
}