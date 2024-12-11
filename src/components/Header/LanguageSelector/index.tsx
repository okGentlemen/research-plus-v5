import React from 'react';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  return (
    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
      <Globe className="w-5 h-5 text-gray-600" />
    </button>
  );
}