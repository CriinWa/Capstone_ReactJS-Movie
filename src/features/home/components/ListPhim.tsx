
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieItem } from './MovieItem';
import { useAppDispatch, useAppSelector } from '@/store/config';
import { fetchMovies, setFilter, setPage } from '../redux/movie.slice';
import type { MovieFilter } from '../redux/movie.slice';
import type { Movie } from '@/services/quanLyPhim/type';


const FILTERS: { label: string; value: MovieFilter }[] = [
	{ label: 'Tất cả', value: 'all' },
	{ label: 'Phim hot', value: 'hot' },
	{ label: 'Đang chiếu', value: 'dangChieu' },
	{ label: 'Sắp chiếu', value: 'sapChieu' },
];

export const ListPhim: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { movies, filter, loading, error, currentPage, pageSize } = useAppSelector((state) => state.movies);

	useEffect(() => {
		dispatch(fetchMovies({ maNhom: 'GP01' }));
	}, [dispatch]);

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

	return (
		<div className="w-full px-2 py-4">
			<div className="flex gap-2 mb-4">
				{FILTERS.map((f) => (
					<button
						key={f.value}
						className={`px-4 py-2 rounded border font-semibold transition-colors duration-200
							${filter === f.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
						onClick={() => dispatch(setFilter(f.value))}
					>
						{f.label}
					</button>
				))}
			</div>

			{loading ? (
				<div className="flex justify-center">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl w-full">
						{Array.from({ length: pageSize }).map((_, idx) => (
							<div key={idx} className="animate-pulse bg-gray-200 rounded-lg h-72 w-full" />
						))}
					</div>
				</div>
			) : error ? (
				<div className="text-red-500 text-center font-semibold py-8">{error}</div>
			) : (
				<div className="flex justify-center">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl w-full">
						{pageMovies.map((movie) => (
							<MovieItem
								key={movie.maPhim}
								movie={movie}
								onClick={(id) => navigate(`/movie/${id}`)}
								showBadge={filter === 'all'}
							/>
						))}
					</div>
				</div>
			)}

			<div className="flex justify-center items-center gap-2 mt-6">
				<button
					className="px-3 py-1 rounded border transition-colors duration-200 font-medium bg-white text-gray-700 border-gray-300 hover:bg-blue-50 disabled:opacity-50"
					onClick={() => currentPage > 1 && dispatch(setPage(currentPage - 1))}
					disabled={currentPage === 1}
				>
					&#8592;
				</button>
				{/* Phân trang rút gọn */}
				{(() => {
					const pages: (number | string)[] = [];
					if (totalPage <= 7) {
						for (let i = 1; i <= totalPage; i++) pages.push(i);
					} else {
						if (currentPage > 3) pages.push(1, '...');
						for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPage - 1, currentPage + 1); i++) {
							pages.push(i);
						}
						if (currentPage < totalPage - 2) pages.push('...', totalPage);
						else if (currentPage >= totalPage - 2) {
							for (let i = totalPage - 2; i <= totalPage; i++) pages.push(i);
						}
					}
					return pages.map((p, idx) =>
						typeof p === 'number' ? (
							<button
								key={p}
								className={`px-3 py-1 rounded border transition-colors duration-200 font-medium ${currentPage === p ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
								onClick={() => dispatch(setPage(p))}
							>
								{p}
							</button>
						) : (
							<span key={idx} className="px-2 text-gray-400 select-none">{p}</span>
						)
					);
				})()}
				<button
					className="px-3 py-1 rounded border transition-colors duration-200 font-medium bg-white text-gray-700 border-gray-300 hover:bg-blue-50 disabled:opacity-50"
					onClick={() => currentPage < totalPage && dispatch(setPage(currentPage + 1))}
					disabled={currentPage === totalPage}
				>
					&#8594;
				</button>
			</div>
		</div>
	);
};
