import React, { useState } from 'react';
import type { BookingHistoryItem } from '@/services/quanLyNguoiDung/type';
import { useBookingHistory } from '../hooks';
import { BookingHistoryTable } from './BookingHistoryTable';
import { BookingDetailModal } from './BookingDetailModal';

interface BookingHistoryProps {
  bookings: BookingHistoryItem[];
}

/**
 * BookingHistory - Container cho lịch sử đặt vé
 * 
 * SRP: Component này quản lý state và coordinate giữa table và modal
 * - useBookingHistory hook (pagination logic)
 * - Render BookingHistoryTable + BookingDetailModal
 * - State: selectedBooking, isModalOpen
 */
export const BookingHistory: React.FC<BookingHistoryProps> = ({ bookings }) => {
  const [selectedBooking, setSelectedBooking] = useState<BookingHistoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    paginatedBookings,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useBookingHistory(bookings || []);

  const handleViewDetail = (booking: BookingHistoryItem) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  // Hiển thị empty state nếu không có booking
  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Lịch sử đặt vé</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Chưa có lịch sử đặt vé</h3>
          <p className="text-gray-500">Bạn chưa đặt vé xem phim nào. Hãy khám phá và đặt vé ngay!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Lịch sử đặt vé</h2>
        <p className="text-sm text-gray-600 mt-1">
          Tổng số vé đã đặt: <span className="font-semibold">{bookings.length}</span>
        </p>
      </div>

      <BookingHistoryTable
        bookings={paginatedBookings}
        onViewDetail={handleViewDetail}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <BookingDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        booking={selectedBooking}
      />
    </div>
  );
};
