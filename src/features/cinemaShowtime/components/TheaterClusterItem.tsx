import React from 'react';

interface TheaterClusterItemProps {
  tenCumRap: string;
  diaChi: string;
  isActive: boolean;
  onClick: () => void;
}

/**
 * TheaterClusterItem - Item cụm rạp
 * 
 * SRP: Component này chỉ render 1 cụm rạp
 * - Hiển thị: Tên + Địa chỉ
 * - Active state khi được chọn
 * - Click → scroll to danh sách phim
 * - Hover animation
 * 
 * @example
 * <TheaterClusterItem 
 *   tenCumRap="GLX - Huỳnh Tấn Phát"
 *   diaChi="1362 Huỳnh Tấn Phát..."
 *   isActive={selectedCluster === 'glx-huynh-tan-phat'}
 *   onClick={() => handleClusterClick('glx-huynh-tan-phat')}
 * />
 */
export const TheaterClusterItem: React.FC<TheaterClusterItemProps> = ({
  tenCumRap,
  diaChi,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-3 rounded-lg border transition-all duration-200
        ${isActive 
          ? 'bg-blue-50 border-blue-500 shadow-sm' 
          : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
        }
      `}
    >
      <h4 className={`text-sm font-semibold mb-1 line-clamp-1 ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
        {tenCumRap}
      </h4>
      <p className="text-xs text-gray-600 line-clamp-2">
        📍 {diaChi}
      </p>
    </button>
  );
};
