import React from 'react';
import type { BookingMovieInfo, BookingSeat } from '@/services/quanLyDatVe/type';

interface BookingSidebarProps {
  movieInfo: BookingMovieInfo;
  selectedSeats: BookingSeat[];
  totalPrice: number;
  onBooking: () => void;
}

export const BookingSidebar: React.FC<BookingSidebarProps> = ({
  movieInfo,
  selectedSeats,
  totalPrice,
  onBooking,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Thông tin đặt vé</h2>
      
      {/* Hình ảnh phim - Hiển đầy đủ với aspect ratio 2:3 */}
      <div className="w-full mb-4 overflow-hidden rounded-lg shadow-md">
        <img 
          src={movieInfo.hinhAnh} 
          alt={movieInfo.tenPhim}
          className="w-full h-auto object-contain"
          style={{ aspectRatio: '2/3' }}
        />
      </div>
      
      {/* Thông tin phim */}
      <div className="space-y-2 mb-4">
        <h3 className="font-bold text-lg text-gray-900">{movieInfo.tenPhim}</h3>
        <p className="text-sm text-gray-600">{movieInfo.tenCumRap}</p>
        <p className="text-sm text-gray-600">{movieInfo.tenRap}</p>
        <p className="text-sm text-gray-600">
          {movieInfo.ngayChieu} - {movieInfo.gioChieu}
        </p>
      </div>
      
      <div className="border-t pt-4">
        <h4 className="font-semibold mb-2 text-gray-800">Ghế đã chọn</h4>
        {selectedSeats.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Chưa chọn ghế nào</p>
        ) : (
          <div className="space-y-1 mb-4">
            {selectedSeats.map((seat) => (
              <div key={seat.maGhe} className="flex justify-between text-sm">
                <span>Ghế {seat.tenGhe} ({seat.loaiGhe})</span>
                <span>{seat.giaVe.toLocaleString('vi-VN')}đ</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-lg">Tổng tiền</span>
          <span className="font-bold text-xl text-blue-600">
            {totalPrice.toLocaleString('vi-VN')}đ
          </span>
        </div>
        
        <button
          onClick={onBooking}
          disabled={selectedSeats.length === 0}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
            hover:bg-blue-700 transition-colors duration-200
            disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Đặt vé
        </button>
      </div>
    </div>
  );
};
