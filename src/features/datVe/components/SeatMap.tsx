import React from 'react';
import { SeatItem } from './SeatItem';
import { ScreenDisplay } from './ScreenDisplay';
import type { BookingSeat } from '@/services/quanLyDatVe/type';

interface SeatMapProps {
  seats: BookingSeat[];
  selectedSeats: BookingSeat[];
  onSeatClick: (seat: BookingSeat) => void;
}

const SEATS_PER_ROW = 16;

export const SeatMap: React.FC<SeatMapProps> = ({
  seats,
  selectedSeats,
  onSeatClick,
}) => {
  const isSelected = (maGhe: number) => {
    return selectedSeats.some(s => s.maGhe === maGhe);
  };
  return (
    <div className="w-full">
      <ScreenDisplay />
      
      <div className="flex justify-center">
        {/* 
          Grid layout: 16 ghế/hàng (SEATS_PER_ROW)
          Số hàng: Tự động tính dựa trên số ghế từ API (seats.length / 16)
          Ví dụ: 160 ghế = 10 hàng x 16 ghế/hàng
        */}
        <div 
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${SEATS_PER_ROW}, minmax(0, 1fr))` }}
        >
          {seats.map((seat) => (
            <SeatItem
              key={seat.maGhe}
              seat={seat}
              isSelected={isSelected(seat.maGhe)}
              onClick={onSeatClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
