// ../components/ui/avatar.js
import React from 'react';

export const Avatar = ({ className = '', children }) => (
  <div className={`inline-flex items-center justify-center rounded-full bg-gray-200 ${className}`}>{children}</div>
);

export const AvatarImage = ({ src, alt }) => <img className="rounded-full" src={src} alt={alt} />;

export const AvatarFallback = ({ children }) => <span className="text-sm text-gray-500">{children}</span>;
