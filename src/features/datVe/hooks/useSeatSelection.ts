import { useState, useCallback } from 'react';
import type { BookingSeat } from '@/services/quanLyDatVe/type';

const MAX_SEATS = 8;

export function useSeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState<BookingSeat[]>([]);

  const toggleSeat = useCallback((seat: BookingSeat) => {
    setSelectedSeats((prev) => {
      const isSelected = prev.some(s => s.maGhe === seat.maGhe);
      
      if (isSelected) {
        // Bỏ chọn ghế
        return prev.filter(s => s.maGhe !== seat.maGhe);
      } else {
        // Chọn ghế mới
        if (prev.length >= MAX_SEATS) {
          return prev; // Đã đủ 8 ghế
        }
        return [...prev, seat];
      }
    });
  }, []);

  const canSelectSeat = useCallback((seat: BookingSeat) => {
    // Không thể chọn ghế đã đặt
    if (seat.daDat) return false;
    
    // Nếu ghế đã được chọn, có thể bỏ chọn
    const isSelected = selectedSeats.some(s => s.maGhe === seat.maGhe);
    if (isSelected) return true;
    
    // Kiểm tra số lượng ghế đã chọn
    return selectedSeats.length < MAX_SEATS;
  }, [selectedSeats]);

  const clearSelection = useCallback(() => {
    setSelectedSeats([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    return selectedSeats.reduce((total, seat) => total + seat.giaVe, 0);
  }, [selectedSeats]);

  const isSelected = useCallback((maGhe: number) => {
    return selectedSeats.some(s => s.maGhe === maGhe);
  }, [selectedSeats]);

  return {
    selectedSeats,
    toggleSeat,
    canSelectSeat,
    clearSelection,
    getTotalPrice,
    isSelected,
    maxSeats: MAX_SEATS,
  };
}
