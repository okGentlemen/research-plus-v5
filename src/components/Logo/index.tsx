import React from 'react';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface LogoProps {
  className?: string;
  asLink?: boolean;
  justify?: 'start' | 'center';
}

export function Logo({ className, asLink = true, justify = 'start' }: LogoProps) {
  const content = (
    <>
      <Brain className="w-7 h-7 text-blue-600" />
      <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
        ResearchPlus
      </span>
    </>
  );

  const containerClass = clsx(
    "flex items-center gap-2",
    justify === 'center' && "justify-center w-full",
    className
  );

  if (asLink) {
    return (
      <Link to="/" className={containerClass}>
        {content}
      </Link>
    );
  }

  return (
    <div className={containerClass}>
      {content}
    </div>
  );
}