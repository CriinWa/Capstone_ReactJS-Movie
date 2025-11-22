import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '@/services/quanLyRap/type';
import { ShowtimeSlots } from './ShowtimeSlots';

interface MovieShowtimeCardProps {
  movie: Movie;
}

/**
 * MovieShowtimeCard - Card hiển thị phim với lịch chiếu
 * 
 * SRP: Component này chỉ render 1 phim
 * - Poster (clickable) → /detail/:maPhim
 * - Tên phim + Thời lượng (fake - API không có)
 * - Tags nhỏ mờ: Hot, Đang chiếu
 * - ShowtimeSlots component
 * 
 * @example
 * <MovieShowtimeCard movie={movieData} />
 */
export const MovieShowtimeCard: React.FC<MovieShowtimeCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handlePosterClick = () => {
    navigate(`/detail/${movie.maPhim}`);
  };

  return (
    <div className="flex gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      {/* Poster */}
      <div 
        className="shrink-0 cursor-pointer group"
        onClick={handlePosterClick}
      >
        <div className="relative w-20 h-28 rounded-lg overflow-hidden">
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/96x144?text=No+Image';
            }}
          />
          
          {/* Overlay khi hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Movie Info & Showtimes */}
      <div className="flex-1 min-w-0">
        {/* Movie Title */}
        <h4 
          className="text-sm font-semibold text-gray-900 mb-1.5 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
          onClick={handlePosterClick}
        >
          {movie.tenPhim}
        </h4>

        {/* Tags - Nhỏ và mờ */}
        <div className="flex gap-1.5 mb-2">
          {movie.hot && (
            <span className="px-1.5 py-0.5 text-[10px] bg-red-50 text-red-600 rounded opacity-60">
              🔥 Hot
            </span>
          )}
          {movie.dangChieu && (
            <span className="px-1.5 py-0.5 text-[10px] bg-green-50 text-green-600 rounded opacity-60">
              Đang chiếu
            </span>
          )}
          {movie.sapChieu && (
            <span className="px-1.5 py-0.5 text-[10px] bg-blue-50 text-blue-600 rounded opacity-60">
              Sắp chiếu
            </span>
          )}
        </div>

        {/* Thời lượng (giả định 120 phút) */}
        <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>120 phút</span>
        </p>

        {/* Showtimes */}
        <ShowtimeSlots 
          showtimes={movie.lstLichChieuTheoPhim} 
          maPhim={movie.maPhim}
          maxVisible={6}
        />
      </div>
    </div>
  );
};
