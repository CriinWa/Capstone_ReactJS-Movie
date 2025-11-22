import React from 'react';
import type { BookingHistoryItem } from '@/services/quanLyNguoiDung/type';

interface BookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingHistoryItem | null;
}

/**
 * BookingDetailModal - Modal hiển thị chi tiết vé đã đặt
 * 
 * SRP: Component này chỉ render modal với booking details
 * - Hiển thị: Poster, Tên phim, Danh sách ghế, Rạp, Thời lượng, Giá vé, Tổng tiền
 * - Close button
 */
export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  if (!isOpen || !booking) return null;

  const totalPrice = booking.giaVe * booking.danhSachGhe.length;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)'}}>
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Chi tiết vé #{booking.maVe}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Movie Info */}
          <div className="flex gap-4 mb-6">
            <img
              src={booking.hinhAnh}
              alt={booking.tenPhim}
              className="w-32 h-48 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.tenPhim}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Thời lượng:</span> {booking.thoiLuongPhim} phút
                </p>
                <p>
                  <span className="font-semibold">Ngày đặt:</span> {formatDate(booking.ngayDat)}
                </p>
              </div>
            </div>
          </div>

          {/* Theater Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Thông tin rạp</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Hệ thống:</span>{' '}
                {booking.danhSachGhe[0]?.tenHeThongRap}
              </p>
              <p>
                <span className="font-medium">Cụm rạp:</span>{' '}
                {booking.danhSachGhe[0]?.tenCumRap}
              </p>
              <p>
                <span className="font-medium">Rạp:</span> {booking.danhSachGhe[0]?.tenRap}
              </p>
            </div>
          </div>

          {/* Seats */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Danh sách ghế</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {booking.danhSachGhe.map((ghe) => (
                <div
                  key={ghe.maGhe}
                  className="bg-green-100 border-2 border-green-500 rounded-lg p-2 text-center"
                >
                  <p className="text-sm font-semibold text-green-700">{ghe.tenGhe}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Price Info */}
          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Giá vé (x{booking.danhSachGhe.length}):</span>
                <span>{booking.giaVe.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                <span>Tổng tiền:</span>
                <span className="text-blue-600">{totalPrice.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
