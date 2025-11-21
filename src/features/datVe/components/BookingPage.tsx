import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useBookingSeats } from '../hooks/useBookingSeats';
import { useSeatSelection } from '../hooks/useSeatSelection';
import { useBookingMutation } from '../hooks/useBookingMutation';
import { SeatLegend } from './SeatLegend';
import { SeatMap } from './SeatMap';
import { BookingSidebar } from './BookingSidebar';
import { ConfirmBookingModal } from './ConfirmBookingModal';
import { PATH } from '@/constants';
import type { BookingSeat } from '@/services/quanLyDatVe/type';

export const BookingPage: React.FC = () => {
  const { maPhim, maLichChieu } = useParams<{ maPhim: string; maLichChieu: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch booking data
  const { data, isLoading, error, refetch } = useBookingSeats(maLichChieu!);

  // Seat selection logic
  const {
    selectedSeats,
    toggleSeat,
    canSelectSeat,
    getTotalPrice,
    clearSelection,
  } = useSeatSelection();

  // Booking mutation
  const { mutate: bookTickets, isPending } = useBookingMutation(maLichChieu!, {
    onSuccess: async () => {
      // Đợi invalidate queries và refetch xong trước khi navigate
      // Để đảm bảo khi quay lại booking page, data đã cập nhật
      await refetch();
      toast.success('Đặt vé thành công!');
      
      // Sử dụng maPhim từ URL params (luôn đáng tin cậy)
      // Không dùng từ API response vì có thể không trả về hoặc bị invalidate
      navigate(PATH.MOVIE_DETAIL_BY_ID(maPhim!));
    },
    onError: async (error: Error) => {
      toast.error(error.message || 'Đặt vé thất bại. Vui lòng thử lại.');
      setIsModalOpen(false);
      // Đợi refetch xong mới clear selection để đảm bảo data mới đã về
      await refetch();
      clearSelection();
    },
  });

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    if (!maLichChieu || selectedSeats.length === 0) return;

    const bookingData = {
      maLichChieu: parseInt(maLichChieu),
      danhSachVe: selectedSeats.map((seat) => ({
        maGhe: seat.maGhe,
        giaVe: seat.giaVe,
      })),
    };

    bookTickets(bookingData);
  };

  // Handle seat click
  const handleSeatClick = (seat: BookingSeat) => {
    if (seat.daDat) return;
    
    if (!canSelectSeat(seat)) {
      toast.error('Bạn chỉ có thể chọn tối đa 8 ghế');
      return;
    }

    toggleSeat(seat);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg">Không thể tải thông tin đặt vé</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Đặt vé xem phim</h1>
          <p className="text-gray-600">Chọn ghế và xác nhận đặt vé của bạn</p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section - Seat Selection */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <SeatLegend />
            <div className="mt-6">
              <SeatMap
                seats={data.data.content.danhSachGhe}
                selectedSeats={selectedSeats}
                onSeatClick={handleSeatClick}
              />
            </div>
          </div>

          {/* Right Section - Booking Info */}
          <div className="lg:w-80">
            <BookingSidebar
              movieInfo={data.data.content.thongTinPhim}
              selectedSeats={selectedSeats}
              totalPrice={getTotalPrice()}
              onBooking={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmBooking}
        movieInfo={data.data.content.thongTinPhim}
        selectedSeats={selectedSeats}
        totalPrice={getTotalPrice()}
        isLoading={isPending}
      />
    </div>
  );
};
