import type { CinemaShowtime } from '@/services/quanLyRap/type';
import { Calendar, Clock, MapPin, Film } from 'lucide-react';

interface ScheduleListProps {
    showtimes: CinemaShowtime[];
    isLoading: boolean;
    selectedTheaterCluster?: string;
}

export const ScheduleList = ({ showtimes, isLoading, selectedTheaterCluster }: ScheduleListProps) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-10 w-10 text-blue-600" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <p className="text-gray-600 font-medium">Đang tải lịch chiếu...</p>
                </div>
            </div>
        );
    }

    if (!showtimes || showtimes.length === 0) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Chưa có lịch chiếu</h3>
                    <p className="text-gray-500">Vui lòng chọn hệ thống rạp để xem lịch chiếu</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {showtimes.map((cinema) => {
                // Lọc cụm rạp theo selectedTheaterCluster
                const clustersToShow = selectedTheaterCluster && selectedTheaterCluster !== 'all'
                    ? cinema.lstCumRap.filter(cluster => cluster.maCumRap === selectedTheaterCluster)
                    : cinema.lstCumRap;

                return (
                    <div key={cinema.maHeThongRap} className="space-y-4">
                        {clustersToShow.map((cluster) => (
                        <div key={cluster.maCumRap} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                            {/* Header cụm rạp */}
                            <div className="bg-linear-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">{cluster.tenCumRap}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{cluster.diaChi}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Danh sách phim */}
                            <div className="divide-y divide-gray-200">
                                {cluster.danhSachPhim.map((movie) => (
                                    <div key={movie.maPhim} className="p-6 hover:bg-blue-50 transition-colors duration-150">
                                        <div className="flex gap-4">
                                            {/* Poster phim */}
                                            <img
                                                src={movie.hinhAnh}
                                                alt={movie.tenPhim}
                                                className="w-20 h-28 object-cover rounded-lg shadow-md shrink-0"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'https://placehold.co/80x112?text=No+Image';
                                                }}
                                            />

                                            <div className="flex-1">
                                                {/* Tên phim và badges */}
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-lg mb-2 flex items-center gap-2">
                                                            <Film className="w-5 h-5 text-cyan-600" />
                                                            {movie.tenPhim}
                                                        </h4>
                                                        <div className="flex gap-2">
                                                            {movie.hot && (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                                                    🔥 Hot
                                                                </span>
                                                            )}
                                                            {movie.dangChieu && (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                                                    Đang chiếu
                                                                </span>
                                                            )}
                                                            {movie.sapChieu && (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                                    Sắp chiếu
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Lịch chiếu */}
                                                {movie.lstLichChieuTheoPhim.length > 0 ? (
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                                        {movie.lstLichChieuTheoPhim.map((showtime) => {
                                                            const date = new Date(showtime.ngayChieuGioChieu);
                                                            const timeStr = date.toLocaleTimeString('vi-VN', { 
                                                                hour: '2-digit', 
                                                                minute: '2-digit' 
                                                            });
                                                            const dateStr = date.toLocaleDateString('vi-VN');

                                                            return (
                                                                <div
                                                                    key={showtime.maLichChieu}
                                                                    className="border border-cyan-300 rounded-lg px-3 py-2 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all duration-200 cursor-pointer group"
                                                                >
                                                                    <div className="flex items-center gap-1.5 text-sm">
                                                                        <Clock className="w-4 h-4 text-cyan-600 group-hover:text-white" />
                                                                        <span className="font-semibold">{timeStr}</span>
                                                                    </div>
                                                                    <div className="text-xs text-gray-600 group-hover:text-cyan-100 mt-1">
                                                                        {dateStr}
                                                                    </div>
                                                                    <div className="text-xs font-semibold text-cyan-600 group-hover:text-white mt-1">
                                                                        {showtime.giaVe.toLocaleString('vi-VN')}đ
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-500 italic">Chưa có suất chiếu</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    </div>
                );
            })}
        </div>
    );
};
