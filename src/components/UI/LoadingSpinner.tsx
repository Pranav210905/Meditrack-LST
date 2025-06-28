import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin ${className}`}>
      <div className="h-full w-full rounded-full border-4 border-gray-200 border-t-kelly-600 dark:border-gray-700 dark:border-t-kelly-400"></div>
    </div>
  );
};

export default LoadingSpinner;