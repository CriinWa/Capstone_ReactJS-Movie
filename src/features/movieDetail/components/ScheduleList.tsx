import type { TheaterCluster } from "@/services/quanLyPhim/type";
import { formatScheduleDateTime, formatPrice, getDayOfWeek, DAY_FILTER_MAP } from "../utils/dateUtils";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "@/constants";

type ScheduleListProps = {
    clusters: TheaterCluster[];
    selectedDay: string;
};

export const ScheduleList = ({ clusters, selectedDay }: ScheduleListProps) => {
    const navigate = useNavigate();
    const { maPhim } = useParams<{ maPhim: string }>(); // Lấy maPhim từ URL

    // Filter schedules theo ngày đã chọn
    const filterSchedulesByDay = (schedules: any[]) => {
        if (selectedDay === 'all') return schedules;
        
        const targetDay = DAY_FILTER_MAP[selectedDay];
        return schedules.filter(schedule => {
            const dayOfWeek = getDayOfWeek(schedule.ngayChieuGioChieu);
            return dayOfWeek === targetDay;
        });
    };

    const handleBooking = (maLichChieu: string) => {
        // Truyền maPhim và maLichChieu vào URL booking
        navigate(PATH.BOOKING_BY_ID(maPhim!, maLichChieu));
    };

    if (clusters.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">
                    Chọn hệ thống rạp để xem lịch chiếu
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {clusters.map((cluster) => {
                const filteredSchedules = filterSchedulesByDay(cluster.lichChieuPhim);
                
                // Nếu không có lịch chiếu nào sau khi filter thì skip
                if (filteredSchedules.length === 0) return null;

                return (
                    <div key={cluster.maCumRap} className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        {/* Theater Cluster Info */}
                        <div className="mb-4">
                            <h4 className="text-lg font-bold text-gray-800 mb-1">
                                {cluster.tenCumRap}
                            </h4>
                            <p className="text-sm text-gray-600 flex items-start gap-2">
                                <span>📍</span>
                                <span>{cluster.diaChi}</span>
                            </p>
                        </div>

                        {/* Schedule Buttons */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {filteredSchedules.map((schedule) => (
                                <button
                                    key={schedule.maLichChieu}
                                    onClick={() => handleBooking(schedule.maLichChieu)}
                                    className="p-3 border-2 border-gray-300 rounded-lg text-sm font-medium hover:bg-cyan-50 hover:border-cyan-500 transition-all duration-200 text-left"
                                >
                                    <div className="flex flex-col gap-1">
                                        <span className="text-cyan-700 font-bold">
                                            {formatScheduleDateTime(schedule.ngayChieuGioChieu)}
                                        </span>
                                        <span className="text-gray-600 text-xs">
                                            {schedule.tenRap}
                                        </span>
                                        <span className="text-orange-600 font-semibold text-xs">
                                            {formatPrice(schedule.giaVe)}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* No schedules after filter */}
            {clusters.every(cluster => filterSchedulesByDay(cluster.lichChieuPhim).length === 0) && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">
                        Không có lịch chiếu cho ngày đã chọn
                    </p>
                </div>
            )}
        </div>
    );
};

// ScheduleList: Component hiển thị danh sách lịch chiếu theo cụm rạp
// - Nhận clusters (danh sách cụm rạp) và selectedDay (filter)
// - Filter lịch chiếu theo ngày đã chọn
// - Mỗi cluster hiển thị: Tên cụm rạp, địa chỉ, grid lịch chiếu
// - Mỗi schedule button hiển thị: Ngày giờ, tên rạp, giá vé
// - onClick schedule → navigate to /booking/:maLichChieu
