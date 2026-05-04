import React from 'react';

export function GlassCard({ children, className = '', ...props }) {
  return (
    <div className={`glass p-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
