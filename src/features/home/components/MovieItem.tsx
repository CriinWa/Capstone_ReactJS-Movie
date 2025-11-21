import React from 'react';
import type { Movie } from '@/services/quanLyPhim/type';

interface MovieItemProps {
  movie: Movie;
  onClick?: (id: number) => void;
  showBadge?: boolean;
}

const MovieBadge: React.FC<{ hot?: boolean; dangChieu?: boolean; sapChieu?: boolean }> = ({ hot, dangChieu, sapChieu }) => (
  <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
    {hot && <span className="px-2 py-0.5 text-xs rounded bg-red-500 text-white font-bold shadow">HOT</span>}
    {dangChieu && <span className="px-2 py-0.5 text-xs rounded bg-green-600 text-white font-semibold shadow">Đang chiếu</span>}
    {sapChieu && <span className="px-2 py-0.5 text-xs rounded bg-yellow-400 text-gray-900 font-semibold shadow">Sắp chiếu</span>}
  </div>
);

export const MovieItem: React.FC<MovieItemProps> = ({ movie, onClick, showBadge }) => {
  return (
    <div
      className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 hover:border-blue-500 transition-all duration-200 flex flex-col items-center p-4 group relative"
      onClick={() => onClick?.(movie.maPhim)}
      style={{ aspectRatio: '2/3', minWidth: '180px', maxWidth: '260px' }}
    >
      <div className="overflow-hidden rounded-lg w-full flex-1 flex items-center justify-center bg-gray-100 relative" style={{ minHeight: '300px', maxHeight: '400px' }}>
        {showBadge && (
          <MovieBadge hot={movie.hot} dangChieu={movie.dangChieu} sapChieu={movie.sapChieu} />
        )}
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="object-contain w-full h-full max-h-full max-w-full transform group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="mt-3 text-center font-semibold text-gray-800 line-clamp-2 text-base">
        {movie.tenPhim}
      </div>
    </div>
  );
};