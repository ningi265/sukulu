// ../components/ui/dropdown-menu.js
import React, { useState } from 'react';

export const DropdownMenu = ({ children }) => <div className="relative">{children}</div>;

export const DropdownMenuTrigger = ({ children }) => <div>{children}</div>;

export const DropdownMenuContent = ({ children, className = '' }) => (
  <div className={`absolute mt-2 w-48 bg-white shadow-md rounded ${className}`}>{children}</div>
);

export const DropdownMenuItem = ({ children }) => <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{children}</div>;

export const DropdownMenuLabel = ({ children }) => <div className="px-4 py-2 text-sm text-gray-500">{children}</div>;

export const DropdownMenuSeparator = () => <div className="h-px bg-gray-200"></div>;
