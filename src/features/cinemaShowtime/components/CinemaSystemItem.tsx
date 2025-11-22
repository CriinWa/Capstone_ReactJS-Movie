import React from 'react';

interface CinemaSystemItemProps {
  logo: string;
  tenHeThongRap: string;
  isActive: boolean;
  onClick: () => void;
}

/**
 * CinemaSystemItem - Item hệ thống rạp với logo
 * 
 * SRP: Component này chỉ render 1 hệ thống rạp
 * - Logo + Tên (hidden trên mobile)
 * - Active state với highlight
 * - Hover animation scale
 * 
 * @example
 * <CinemaSystemItem 
 *   logo="https://..."
 *   tenHeThongRap="CGV"
 *   isActive={selected === 'CGV'}
 *   onClick={() => setSelected('CGV')}
 * />
 */
export const CinemaSystemItem: React.FC<CinemaSystemItemProps> = ({
  logo,
  tenHeThongRap,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg transition-all duration-200 min-h-20
        ${isActive 
          ? 'bg-red-50 border-2 border-red-500 shadow-md' 
          : 'bg-white border-2 border-transparent hover:bg-gray-50 hover:shadow-sm'
        }
      `}
    >
      <div className={`
        w-12 h-12 rounded-full overflow-hidden border-2 transition-transform duration-200 shrink-0
        ${isActive ? 'border-red-500 scale-105' : 'border-gray-200 hover:scale-105'}
      `}>
        <img
          src={logo}
          alt={tenHeThongRap}
          className="w-full h-full object-contain p-1.5 bg-white"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/48?text=Cinema';
          }}
        />
      </div>
      <span className={`
        text-xs font-medium text-center line-clamp-2 leading-tight
        ${isActive ? 'text-red-600' : 'text-gray-700'}
      `}>
        {tenHeThongRap}
      </span>
    </button>
  );
};
