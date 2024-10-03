import React from 'react';
import { ThemeToggle } from '../theme-toggle';

const Navbar = () => {
  return (
    <header className="bg-background border-b border-gray-100 dark:border-gray-800 sticky inset-x-0 top-0 z-[10] shadow-sm">
      <div className="h-16 flex gap-4 items-center justify-between max-w-screen-xl mx-auto px-3 lg:px-16">
        <span className="text-lg font-bold">ezzyPolls</span>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
