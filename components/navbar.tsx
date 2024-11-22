import React from 'react'
import { ModeToggle } from './ui/mode-toggle';

type Props = {}

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-3 fixed w-full max-w-[1300px]">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-xl font-bold text-gray-800 dark:text-white">
          Logo
        </span>
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          Connect X
        </button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;