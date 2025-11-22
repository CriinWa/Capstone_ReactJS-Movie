import { useState, useMemo } from 'react';
import type { BookingHistoryItem } from '@/services/quanLyNguoiDung/type';

const ITEMS_PER_PAGE = 5;

/**
 * Custom hook để xử lý logic phân trang booking history
 * 
 * SRP: Hook này chỉ làm 1 việc - Quản lý pagination logic
 * - Sort bookings theo ngày đặt (mới nhất lên đầu)
 * - Tính toán pagination (totalPages, currentPage)
 * - Slice data theo trang hiện tại
 * 
 * KHÔNG LÀM:
 * ❌ Không render UI
 * ❌ Không fetch data
 * ❌ Không biết về table structure
 * 
 * @param bookings - Danh sách booking history từ API
 * @returns Object chứa paginated data và pagination controls
 */
export function useBookingHistory(bookings: BookingHistoryItem[]) {
  const [currentPage, setCurrentPage] = useState(1);

  // Sort: Gần nhất lên đầu (useMemo để avoid re-sort mỗi lần render)
  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => 
      new Date(b.ngayDat).getTime() - new Date(a.ngayDat).getTime()
    );
  }, [bookings]);

  // Tính toán pagination
  const totalPages = Math.ceil(sortedBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Slice data theo trang hiện tại
  const paginatedBookings = useMemo(() => {
    return sortedBookings.slice(startIndex, endIndex);
  }, [sortedBookings, startIndex, endIndex]);

  // Reset về trang 1 nếu currentPage vượt quá totalPages
  // (Xảy ra khi bookings.length thay đổi)
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  return {
    paginatedBookings,
    currentPage,
    totalPages,
    totalItems: sortedBookings.length,
    itemsPerPage: ITEMS_PER_PAGE,
    setCurrentPage,
  };
}
