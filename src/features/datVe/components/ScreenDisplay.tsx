import React from 'react';

export const ScreenDisplay: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative w-full max-w-2xl">
        <div className="h-2 bg-linear-to-b from-gray-400 to-gray-200 rounded-t-full shadow-lg"></div>
        <div className="text-center py-2 text-gray-600 font-semibold text-sm">
          SCREEN
        </div>
      </div>
    </div>
  );
};
