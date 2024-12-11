import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <Brain className="w-7 h-7 text-blue-600" />
      <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
        ResearchPlus
      </span>
    </Link>
  );
}