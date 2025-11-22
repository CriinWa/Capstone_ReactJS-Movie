import React from 'react';
import type { BookingHistoryItem } from '@/services/quanLyNguoiDung/type';

interface BookingHistoryTableProps {
  bookings: BookingHistoryItem[];
  onViewDetail: (booking: BookingHistoryItem) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * BookingHistoryTable - Table hiển thị danh sách vé đã đặt
 * 
 * SRP: Component này chỉ render table với pagination
 * - Columns: Hình ảnh, Mã vé, Phim, Rạp, Ghế, Ngày đặt, Tổng tiền, Action
 * - Pagination controls
 * - Button "Xem chi tiết" → callback to parent
 */
export const BookingHistoryTable: React.FC<BookingHistoryTableProps> = ({
  bookings,
  onViewDetail,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatSeats = (booking: BookingHistoryItem) => {
    return booking.danhSachGhe.map((ghe) => ghe.tenGhe).join(', ');
  };

  const calculateTotal = (booking: BookingHistoryItem) => {
    return booking.giaVe * booking.danhSachGhe.length;
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">Bạn chưa có lịch sử đặt vé nào</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Hình ảnh</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mã vé</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phim</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rạp</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ghế</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày đặt</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Tổng tiền</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {bookings.map((booking) => (
              <tr key={booking.maVe} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <img
                    src={booking.hinhAnh}
                    alt={booking.tenPhim}
                    className="w-16 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  #{booking.maVe}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{booking.tenPhim}</p>
                  <p className="text-xs text-gray-500">{booking.thoiLuongPhim} phút</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <p>{booking.danhSachGhe[0]?.tenCumRap}</p>
                  <p className="text-xs text-gray-500">{booking.danhSachGhe[0]?.tenRap}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {formatSeats(booking)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {formatDate(booking.ngayDat)}
                </td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-blue-600">
                  {calculateTotal(booking).toLocaleString('vi-VN')}đ
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onViewDetail(booking)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden divide-y">
        {bookings.map((booking) => (
          <div key={booking.maVe} className="p-4">
            <div className="flex gap-3 mb-3">
              <img
                src={booking.hinhAnh}
                alt={booking.tenPhim}
                className="w-20 h-28 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">{booking.tenPhim}</p>
                <p className="text-xs text-gray-600 mb-1">Mã vé: #{booking.maVe}</p>
                <p className="text-xs text-gray-600">{booking.danhSachGhe[0]?.tenCumRap}</p>
                <p className="text-xs text-gray-500 mt-2">{formatDate(booking.ngayDat)}</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="font-semibold text-blue-600">
                {calculateTotal(booking).toLocaleString('vi-VN')}đ
              </span>
              <button
                onClick={() => onViewDetail(booking)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t px-4 py-3 flex items-center justify-between bg-gray-50">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Trước
          </button>
          <span className="text-sm text-gray-700">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};
