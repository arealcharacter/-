
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-10">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
      <p className="text-lg text-gray-600 dark:text-gray-300">در حال دریافت پیشنهادهای خوشمزه...</p>
    </div>
  );
};

export default LoadingSpinner;
