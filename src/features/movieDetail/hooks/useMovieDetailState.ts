import { useState, useEffect } from 'react';
import type { MovieDetail } from '@/services/quanLyPhim/type';

/**
 * Custom hook quản lý state cho MovieDetailPage
 * - selectedTheater: Hệ thống rạp đang chọn
 * - selectedDay: Ngày đang chọn (all, mon, tue, ...)
 * - isTrailerModalOpen: Trạng thái modal trailer
 */
export const useMovieDetailState = (movie: MovieDetail | undefined) => {
    const [selectedTheater, setSelectedTheater] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string>('all');
    const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

    // Auto-select theater đầu tiên khi data load xong
    useEffect(() => {
        if (movie?.heThongRapChieu && movie.heThongRapChieu.length > 0 && !selectedTheater) {
            setSelectedTheater(movie.heThongRapChieu[0].maHeThongRap);
        }
    }, [movie, selectedTheater]);

    const openTrailerModal = () => setIsTrailerModalOpen(true);
    const closeTrailerModal = () => setIsTrailerModalOpen(false);

    const handleBookingClick = () => {
        const schedulesSection = document.getElementById('schedules-section');
        schedulesSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return {
        selectedTheater,
        setSelectedTheater,
        selectedDay,
        setSelectedDay,
        isTrailerModalOpen,
        openTrailerModal,
        closeTrailerModal,
        handleBookingClick,
    };
};
