import type { MovieDetail } from "@/services/quanLyPhim/type";
import { formatReleaseDate } from "../utils/dateUtils";
import { Star, StarHalf } from "lucide-react";

type MovieInfoProps = {
    movie: MovieDetail;
    onTrailerClick: () => void;
    onBookingClick: () => void;
};

export const MovieInfo = ({ movie, onTrailerClick, onBookingClick }: MovieInfoProps) => {
    return (
        <div className="flex gap-8 mb-8 bg-black p-8 rounded-lg relative overflow-hidden">
            {/* Stars background effect */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => {
                    const size = Math.random() * 2 + 3;
                    return (
                        <div
                            key={i}
                            className="absolute bg-white rounded-full animate-pulse"
                            style={{
                                width: size + 'px',
                                height: size + 'px',
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                                animationDelay: Math.random() * 3 + 's',
                                opacity: Math.random() * 0.7 + 0.3
                            }}
                        />
                    );
                })}
            </div>

            {/* Movie Poster */}
            <img
                src={movie.hinhAnh}
                alt={movie.tenPhim}
                className="w-80 h-96 object-cover rounded border-8 border-white shadow-2xl relative z-10"
            />

            {/* Movie Info */}
            <div className="flex-1 relative z-10">
                <h1 className="text-3xl font-bold mb-4 text-white">
                    {movie.tenPhim}
                </h1>

                {/* Rating */}
                <div className="mb-4 flex items-center gap-2">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => {
                            const rating = movie.danhGia / 2; // Convert 10-scale to 5-scale
                            const filled = i < Math.floor(rating);
                            const half = i === Math.floor(rating) && rating % 1 >= 0.5;
                            
                            return (
                                <span key={i} className="inline-flex">
                                    {filled ? (
                                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    ) : half ? (
                                        <StarHalf className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    ) : (
                                        <Star className="w-6 h-6 text-gray-400" />
                                    )}
                                </span>
                            );
                        })}
                    </div>
                    <span className="text-gray-300 text-lg">
                        ({movie.danhGia}/10)
                    </span>
                </div>

                {/* Description */}
                <div className="space-y-3 text-gray-200 mb-6">
                    <p>
                        <strong className="text-white">Mô tả:</strong> {movie.moTa}
                    </p>
                    <p>
                        <strong className="text-white">Ngày khởi chiếu:</strong>{" "}
                        {formatReleaseDate(movie.ngayKhoiChieu)}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-6">
                    {movie.hot && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                            🔥 HOT
                        </span>
                    )}
                    {movie.dangChieu && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                            ▶️ Đang chiếu
                        </span>
                    )}
                    {movie.sapChieu && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                            ⏰ Sắp chiếu
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={onTrailerClick}
                        className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors shadow-lg"
                    >
                        🎥 Xem Trailer
                    </button>
                    <button
                        onClick={onBookingClick}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-lg"
                    >
                        🎫 Mua vé ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

// MovieInfo: Component hiển thị thông tin chi tiết phim
// - Poster phim với border trắng nổi bật
// - Background stars animation
// - Rating với ngôi sao (⭐/☆)
// - Mô tả, ngày khởi chiếu
// - Tags: Hot, Đang chiếu, Sắp chiếu
// - Action buttons: Trailer + Mua vé
