import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ShowtimeSlot } from '@/services/quanLyRap/type';
import { formatShowtime, formatDate, isPastShowtime } from '../utils/formatShowtime';
import { PATH } from '@/constants/paths';

interface ShowtimeSlotsProps {
  showtimes: ShowtimeSlot[];
  maPhim: number;
  maxVisible?: number;
}

/**
 * ShowtimeSlots - Hiển thị các suất chiếu dạng buttons grouped by date
 * 
 * SRP: Component này chỉ render danh sách suất chiếu
 * - Group theo ngày (Hôm nay, Ngày mai, T2 27/07...)
 * - Format thời gian "10:21 PM"
 * - Disable nếu đã qua giờ chiếu
 * - Click → navigate /booking/:maPhim/:maLichChieu
 * - Lazy expand nếu quá nhiều ngày
 * 
 * @example
 * <ShowtimeSlots showtimes={lstLichChieu} maPhim={1234} />
 */
export const ShowtimeSlots: React.FC<ShowtimeSlotsProps> = ({ 
  showtimes, 
  maPhim,
  maxVisible = 3 // Max 3 ngày hiển thị ban đầu
}) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = React.useState(false);

  // Group showtimes by date
  const groupedByDate = React.useMemo(() => {
    const groups: Record<string, ShowtimeSlot[]> = {};
    
    showtimes.forEach((showtime) => {
      const dateKey = new Date(showtime.ngayChieuGioChieu).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(showtime);
    });
    
    // Sort groups by date and filter out future showtimes only
    return Object.entries(groups)
      .map(([dateKey, dayShowtimes]) => {
        // Filter chỉ giữ các suất chưa qua
        const futureShowtimes = dayShowtimes.filter(s => !isPastShowtime(s.ngayChieuGioChieu));
        return [dateKey, futureShowtimes] as [string, ShowtimeSlot[]];
      })
      .filter(([, dayShowtimes]) => dayShowtimes.length > 0) // Chỉ giữ ngày còn suất chiếu
      .sort((a, b) => {
        return new Date(a[1][0].ngayChieuGioChieu).getTime() - new Date(b[1][0].ngayChieuGioChieu).getTime();
      });
  }, [showtimes]);

  const visibleGroups = showAll ? groupedByDate : groupedByDate.slice(0, maxVisible);
  const hasMore = groupedByDate.length > maxVisible;

  const handleShowtimeClick = (maLichChieu: number) => {
    navigate(PATH.BOOKING_BY_ID(maPhim, maLichChieu));
  };

  if (showtimes.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">Chưa có lịch chiếu</p>
    );
  }

  return (
    <div className="space-y-3">
      {visibleGroups.map(([dateKey, dayShowtimes]) => {
        const firstShowtime = dayShowtimes[0];
        const dateLabel = formatDate(firstShowtime.ngayChieuGioChieu);
        
        return (
          <div key={dateKey} className="space-y-1.5">
            {/* Date Header */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                📅 {dateLabel}
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            
            {/* Showtime Buttons */}
            <div className="flex flex-wrap gap-2">
              {dayShowtimes.map((showtime) => {
                return (
                  <button
                    key={showtime.maLichChieu}
                    onClick={() => handleShowtimeClick(showtime.maLichChieu)}
                    className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white hover:shadow-sm hover:scale-105"
                  >
                    {formatShowtime(showtime.ngayChieuGioChieu)}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Nút "Xem thêm" nếu có nhiều ngày */}
      {hasMore && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          <span>Xem thêm {groupedByDate.length - maxVisible} ngày</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* Nút "Thu gọn" */}
      {showAll && hasMore && (
        <button
          onClick={() => setShowAll(false)}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          <span>Thu gọn</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};
