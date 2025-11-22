import React from 'react';
import type { Movie } from '@/services/quanLyRap/type';
import { MovieShowtimeCard } from './MovieShowtimeCard';

interface MovieShowtimeListProps {
  movies: Movie[];
  clusterName: string;
}

/**
 * MovieShowtimeList - Danh sách phim của 1 cụm rạp
 * 
 * SRP: Component này chỉ render danh sách phim
 * - Map qua danhSachPhim → MovieShowtimeCard
 * - Hiển thị tên cụm rạp làm header
 * - Empty state nếu không có phim
 * 
 * @example
 * <MovieShowtimeList movies={cluster.danhSachPhim} clusterName={cluster.tenCumRap} />
 */
export const MovieShowtimeList: React.FC<MovieShowtimeListProps> = ({ movies, clusterName }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-5xl mb-3">🎬</div>
        <p className="text-gray-600">Không có lịch chiếu tại {clusterName}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {movies.map((movie) => (
        <MovieShowtimeCard key={movie.maPhim} movie={movie} />
      ))}
    </div>
  );
};
