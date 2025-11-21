import React from 'react';

export const SeatLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center py-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
        <span className="text-sm text-gray-700">Ghế trống</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-red-500 rounded"></div>
        <span className="text-sm text-gray-700">Đã đặt</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-green-500 rounded"></div>
        <span className="text-sm text-gray-700">Đang chọn</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-orange-400 rounded"></div>
        <span className="text-sm text-gray-700">Ghế VIP</span>
      </div>
    </div>
  );
};
