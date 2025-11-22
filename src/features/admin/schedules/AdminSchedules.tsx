import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui";
import toast from 'react-hot-toast';
import { ScheduleForm, ScheduleList } from "./components";
import { 
    useCinemaSystems, 
    useTheatersBySystem, 
    useCinemaShowtime, 
    useMoviesForSchedule,
    useCreateSchedule 
} from "./hooks";
import type { CreateSchedulePayload } from "@/services/quanLyRap/type";

export const AdminSchedules = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCinemaSystem, setSelectedCinemaSystem] = useState<string | null>(null);
    const [selectedSystemForForm, setSelectedSystemForForm] = useState<string | null>(null);
    const [selectedTheaterCluster, setSelectedTheaterCluster] = useState<string>('all');

    const { data: cinemaSystems = [], isLoading: loadingSystems } = useCinemaSystems();
    const { data: theaters = [], isLoading: loadingTheaters } = useTheatersBySystem(selectedSystemForForm);
    const { data: theatersForFilter = [] } = useTheatersBySystem(selectedCinemaSystem);
    const { data: showtimes = [], isLoading: loadingShowtimes } = useCinemaShowtime(selectedCinemaSystem);
    const { data: movies = [] } = useMoviesForSchedule();
    const createScheduleMutation = useCreateSchedule();

    // Lấy danh sách cụm rạp từ API theaters (dùng cho filter)
    const theaterClusters = theatersForFilter;

    // Lọc showtimes theo cụm rạp đã chọn
    const filteredShowtimes = selectedTheaterCluster === 'all' 
        ? showtimes 
        : showtimes.filter(st => {
            // Kiểm tra nếu showtime có lstCumRap (nested structure)
            if (st.lstCumRap) {
                return st.lstCumRap.some((cumRap: any) => cumRap.maCumRap === selectedTheaterCluster);
            }
            // Hoặc nếu maCumRap ở cấp root
            return st.maCumRap === selectedTheaterCluster;
        });

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedSystemForForm(null);
    };

    const handleCinemaSystemChange = (maHeThongRap: string) => {
        setSelectedSystemForForm(maHeThongRap);
    };

    const handleSubmit = async (data: any) => {
        if (!data.maCumRap) {
            toast.error('Vui lòng chọn cụm rạp', {
                duration: 3000,
                icon: '⚠️',
            });
            return;
        }

        console.log('📋 Form data:', data);

        const [year, month, day] = data.ngayChieu.split('-');
        const ngayChieuGioChieu = `${day}/${month}/${year} ${data.gioChieu}:00`;

        const payload: CreateSchedulePayload = {
            maPhim: data.maPhim,
            ngayChieuGioChieu,
            maRap: data.maCumRap, // Gửi mã cụm rạp thay vì mã rạp
            giaVe: data.giaVe,
        };

        try {
            console.log('📋 Form data:', data);
            console.log('📤 Payload gửi đi:', payload);
            console.log('🔍 Type check - maCumRap:', typeof payload.maRap, payload.maRap);
            const result = await createScheduleMutation.mutateAsync(payload);
            console.log('✅ Kết quả:', result);
            toast.success('Tạo lịch chiếu thành công! 🎉', {
                duration: 4000,
                style: {
                    background: '#10b981',
                    color: '#fff',
                    fontWeight: '600',
                    padding: '16px',
                    borderRadius: '12px',
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#10b981',
                },
            });
            handleCloseModal();
        } catch (error: any) {
            console.error('❌ Lỗi tạo lịch chiếu:', error);
            console.error('Response:', error?.response?.data);
            const errorMsg = error?.response?.data?.content || error?.response?.data?.message || error?.message || 'Lỗi không xác định';
            toast.error(errorMsg, {
                duration: 4000,
                style: {
                    background: '#ef4444',
                    color: '#fff',
                    fontWeight: '600',
                    padding: '16px',
                    borderRadius: '12px',
                },
                icon: '❌',
            });
        }
    };

    const isSubmitting = createScheduleMutation.isPending;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-linear-to-r from-blue-50 to-cyan-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">
                        Quản lý lịch chiếu
                    </h1>
                    <p className="text-sm text-gray-600">Quản lý lịch chiếu phim tại các rạp</p>
                </div>
                <Button
                    onClick={handleOpenModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Tạo lịch chiếu
                </Button>
            </div>

            {/* Chọn hệ thống rạp */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Chọn hệ thống rạp để xem lịch chiếu
                </label>
                <div className="flex gap-3 flex-wrap">
                    {loadingSystems ? (
                        <div className="text-gray-500">Đang tải hệ thống rạp...</div>
                    ) : (
                        cinemaSystems.map((system) => (
                            <button
                                key={system.maHeThongRap}
                                onClick={() => {
                                    setSelectedCinemaSystem(system.maHeThongRap);
                                    setSelectedTheaterCluster('all');
                                }}
                                className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium ${
                                    selectedCinemaSystem === system.maHeThongRap
                                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-md'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-cyan-400 hover:shadow-sm'
                                }`}
                            >
                                {system.tenHeThongRap}
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Chọn cụm rạp */}
            {selectedCinemaSystem && theaterClusters.length > 0 && (
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Lọc theo cụm rạp
                    </label>
                    <select
                        value={selectedTheaterCluster}
                        onChange={(e) => setSelectedTheaterCluster(e.target.value)}
                        className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        <option value="all">Tất cả cụm rạp</option>
                        {Array.from(theaterClusters).map((cluster) => (
                            <option key={cluster.maCumRap} value={cluster.maCumRap}>
                                {cluster.tenCumRap}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Danh sách lịch chiếu */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <ScheduleList 
                    showtimes={filteredShowtimes} 
                    isLoading={loadingShowtimes}
                    selectedTheaterCluster={selectedTheaterCluster}
                />
            </div>

            {/* Modal tạo lịch chiếu */}
            {modalOpen && (
                <>
                    <div className="fixed inset-0 bg-black/40 z-40" onClick={handleCloseModal}></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border border-gray-200 pointer-events-auto">
                            <div className="sticky top-0 bg-linear-to-r from-blue-600 to-cyan-600 text-white px-6 py-5 flex items-center justify-between rounded-t-2xl">
                                <h2 className="text-xl font-bold">
                                    ✨ Tạo Lịch Chiếu Mới
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6">
                                <ScheduleForm
                                    movies={movies}
                                    cinemaSystems={cinemaSystems}
                                    theaters={theaters}
                                    onSubmit={handleSubmit}
                                    onCancel={handleCloseModal}
                                    isSubmitting={isSubmitting}
                                    onCinemaSystemChange={handleCinemaSystemChange}
                                    isLoadingTheaters={loadingTheaters}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
