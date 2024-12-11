import React from 'react';
import { Logo } from './Logo';
import { BackButton } from './BackButton';
import { SearchBar } from './SearchBar';
import { NotificationBell } from './NotificationBell';
import { LanguageSelector } from './LanguageSelector';

export function Header() {
  return (
    <header className="h-16 px-8 border-b border-gray-200 bg-white flex items-center">
      <div className="flex items-center w-64">
        <BackButton />
        <Logo />
      </div>
      
      <div className="flex-1 flex justify-center max-w-3xl mx-auto">
        <SearchBar />
      </div>
      
      <div className="w-64 flex items-center justify-end gap-2">
        <NotificationBell />
        <LanguageSelector />
      </div>
    </header>
  );
}