import React from 'react';
import type { BookingSeat } from '@/services/quanLyDatVe/type';

interface SeatItemProps {
  seat: BookingSeat;
  isSelected: boolean;
  onClick: (seat: BookingSeat) => void;
}

export const SeatItem: React.FC<SeatItemProps> = ({ seat, isSelected, onClick }) => {
  const getSeatColor = () => {
    if (seat.daDat) return 'bg-red-500 cursor-not-allowed'; // Đã đặt
    if (isSelected) return 'bg-green-500 hover:bg-green-600'; // Đang chọn
    if (seat.loaiGhe === 'Vip') return 'bg-orange-400 hover:bg-orange-500'; // VIP
    return 'bg-gray-300 hover:bg-gray-400'; // Trống
  };

  const handleClick = () => {
    onClick(seat);
  };

  return (
    <button
      onClick={handleClick}
      disabled={seat.daDat}
      className={`
        w-8 h-8 sm:w-10 sm:h-10 rounded text-xs sm:text-sm font-semibold text-white
        transition-all duration-200 transform hover:scale-110
        ${getSeatColor()}
      `}
      title={`Ghế ${seat.tenGhe} - ${seat.giaVe.toLocaleString('vi-VN')}đ - ${seat.loaiGhe}`}
    >
      {seat.tenGhe}
    </button>
  );
};
