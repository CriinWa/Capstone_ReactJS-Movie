import React from 'react';
import type { BookingMovieInfo, BookingSeat } from '@/services/quanLyDatVe/type';

interface ConfirmBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  movieInfo: BookingMovieInfo;
  selectedSeats: BookingSeat[];
  totalPrice: number;
  isLoading?: boolean;
}

export const ConfirmBookingModal: React.FC<ConfirmBookingModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  movieInfo,
  selectedSeats,
  totalPrice,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Xác nhận đặt vé</h2>
        
        <div className="space-y-3 mb-6">
          <div>
            <h3 className="font-semibold text-lg">{movieInfo.tenPhim}</h3>
            <p className="text-sm text-gray-600">{movieInfo.tenCumRap}</p>
            <p className="text-sm text-gray-600">{movieInfo.tenRap}</p>
            <p className="text-sm text-gray-600">
              {movieInfo.ngayChieu} - {movieInfo.gioChieu}
            </p>
          </div>
          
          <div className="border-t pt-3">
            <h4 className="font-semibold mb-2">Ghế đã chọn:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <span key={seat.maGhe} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                  {seat.tenGhe}
                </span>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Tổng tiền:</span>
              <span className="font-bold text-xl text-blue-600">
                {totalPrice.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50
              transition-colors duration-200 disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
              transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Đang xử lý...' : 'Xác nhận đặt vé'}
          </button>
        </div>
      </div>
    </div>
  );
};
