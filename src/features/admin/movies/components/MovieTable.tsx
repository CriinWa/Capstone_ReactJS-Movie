import type { Movie } from '@/services/quanLyPhim/type';
import { Edit, Trash2 } from 'lucide-react';

interface MovieTableProps {
    movies: Movie[];
    isLoading: boolean;
    onEdit: (movie: Movie) => void;
    onDelete: (movie: Movie) => void;
}

export const MovieTable = ({ movies, isLoading, onEdit, onDelete }: MovieTableProps) => {
    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-500 font-medium">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (!movies || movies.length === 0) {
        return (
            <div className="text-center py-12">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                <p className="text-gray-500 text-lg font-medium">Không có phim nào</p>
                <p className="text-gray-400 text-sm mt-1">Hãy thêm phim mới để bắt đầu</p>
            </div>
        );
    }

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating / 2);
        const hasHalfStar = (rating / 2) % 1 >= 0.5;
        const stars = [];

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<span key={i} className="text-yellow-400 text-lg">★</span>);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<span key={i} className="text-yellow-400 text-lg">⯨</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300 text-lg">★</span>);
            }
        }
        return stars;
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Mã phim
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Hình ảnh
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Tên phim
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Mô tả
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Đánh giá
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Ngày khởi chiếu
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Trạng thái
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {movies.map((movie) => (
                        <tr key={movie.maPhim} className="hover:bg-blue-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                #{movie.maPhim}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img 
                                    src={movie.hinhAnh} 
                                    alt={movie.tenPhim}
                                    className="h-20 w-14 object-cover rounded-lg shadow-md border-2 border-gray-200 hover:scale-105 transition-transform duration-200"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/100x150?text=No+Image';
                                    }}
                                />
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                <div className="max-w-xs">
                                    <p className="truncate hover:text-blue-600 transition-colors">{movie.tenPhim}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                                <div className="max-w-md">
                                    <p className="line-clamp-2 leading-relaxed">{movie.moTa}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-0.5">
                                    {renderStars(movie.danhGia)}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                {new Date(movie.ngayKhoiChieu).toLocaleDateString('vi-VN')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-wrap gap-1.5">
                                    {movie.hot && (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-sm">
                                            🔥 HOT
                                        </span>
                                    )}
                                    {movie.dangChieu && (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow-sm">
                                            ▶ Đang chiếu
                                        </span>
                                    )}
                                    {movie.sapChieu && (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500 text-white shadow-sm">
                                            ⏰ Sắp chiếu
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => onEdit(movie)}
                                        className="p-2.5 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                                        title="Chỉnh sửa"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(movie)}
                                        className="p-2.5 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                                        title="Xóa"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
