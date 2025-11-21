import { useAppDispatch, useAppSelector } from '@/store/config';
import { useEffect } from 'react';
import { fetchMovies, setFilter, setPage } from '../redux/movie.slice';
import type { MovieFilter } from '../redux/movie.slice';
import type { Movie } from '@/services/quanLyPhim/type';

export function useMoviesList() {
  const dispatch = useAppDispatch();
  const { movies, filter, loading, error, currentPage, pageSize } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies({ maNhom: 'GP01' }));
  }, [dispatch]);

  const setMovieFilter = (filter: MovieFilter) => dispatch(setFilter(filter));
  const setMoviePage = (page: number) => dispatch(setPage(page));

  // Lọc phim theo filter
  const filteredMovies = movies.filter((movie: Movie) => {
    if (filter === 'all') return true;
    if (filter === 'hot') return movie.hot;
    if (filter === 'dangChieu') return movie.dangChieu;
    if (filter === 'sapChieu') return movie.sapChieu;
    return true;
  });

  // Phân trang
  const totalPage = Math.ceil(filteredMovies.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const pageMovies = filteredMovies.slice(startIdx, startIdx + pageSize);

  return {
    movies,
    filter,
    loading,
    error,
    currentPage,
    pageSize,
    filteredMovies,
    pageMovies,
    totalPage,
    setMovieFilter,
    setMoviePage,
  };
}
