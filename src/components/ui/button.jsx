// ../components/ui/button.js
import React from 'react';

export const Button = ({ variant = 'solid', size = 'md', className = '', children, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded focus:outline-none transition-all';
  const variantClasses = {
    solid: 'bg-primary text-white hover:bg-primary-dark',
    outline: 'border border-primary text-primary hover:bg-primary/10',
    ghost: 'bg-transparent hover:bg-gray-100',
  };
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
