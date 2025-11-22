import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui/input';
import type { Movie } from '@/services/quanLyPhim/type';
import type { TheaterClusterInfo } from '@/services/quanLyRap/type';

const scheduleSchema = z.object({
    maPhim: z.number().min(1, 'Vui lòng chọn phim'),
    maHeThongRap: z.string().min(1, 'Vui lòng chọn hệ thống rạp'),
    maCumRap: z.string().min(1, 'Vui lòng chọn cụm rạp'),
    ngayChieu: z.string().min(1, 'Vui lòng chọn ngày chiếu'),
    gioChieu: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Giờ chiếu không hợp lệ (HH:mm)'),
    giaVe: z.number().min(1000, 'Giá vé tối thiểu 1,000đ'),
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

interface ScheduleFormProps {
    movies: Movie[];
    cinemaSystems: any[];
    theaters: TheaterClusterInfo[];
    onSubmit: (data: ScheduleFormData) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
    onCinemaSystemChange: (maHeThongRap: string) => void;
    isLoadingTheaters?: boolean;
}

export const ScheduleForm = ({
    movies,
    cinemaSystems,
    theaters,
    onSubmit,
    onCancel,
    isSubmitting,
    onCinemaSystemChange,
    isLoadingTheaters = false
}: ScheduleFormProps) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ScheduleFormData>({
        resolver: zodResolver(scheduleSchema),
        defaultValues: {
            giaVe: 75000,
        },
    });

    const selectedCinemaSystem = watch('maHeThongRap');

    const theaterClusters = theaters;

    const handleCinemaSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setValue('maHeThongRap', value);
        setValue('maCumRap', '');
        onCinemaSystemChange(value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Chọn phim */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phim <span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register('maPhim', { valueAsNumber: true })}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.maPhim 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'
                        }`}
                    >
                        <option value="">Chọn phim</option>
                        {movies.map((movie) => (
                            <option key={movie.maPhim} value={movie.maPhim}>
                                {movie.tenPhim}
                            </option>
                        ))}
                    </select>
                    {errors.maPhim && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.maPhim.message}</p>
                    )}
                </div>

                {/* Hệ thống rạp */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Hệ thống rạp <span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register('maHeThongRap')}
                        onChange={handleCinemaSystemChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.maHeThongRap 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'
                        }`}
                    >
                        <option value="">Chọn hệ thống rạp</option>
                        {cinemaSystems.map((system) => (
                            <option key={system.maHeThongRap} value={system.maHeThongRap}>
                                {system.tenHeThongRap}
                            </option>
                        ))}
                    </select>
                    {errors.maHeThongRap && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.maHeThongRap.message}</p>
                    )}
                </div>

                {/* Cụm rạp */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cụm rạp <span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register('maCumRap')}
                        disabled={!selectedCinemaSystem || isLoadingTheaters}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.maCumRap 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'
                        } ${!selectedCinemaSystem || isLoadingTheaters ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    >
                        <option value="">
                            {isLoadingTheaters ? 'Đang tải...' : theaterClusters.length === 0 ? 'Không có cụm rạp' : 'Chọn cụm rạp'}
                        </option>
                        {theaterClusters.map((cluster) => (
                            <option key={cluster.maCumRap} value={cluster.maCumRap}>
                                {cluster.tenCumRap} - {cluster.diaChi}
                            </option>
                        ))}
                    </select>
                    {errors.maCumRap && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.maCumRap.message}</p>
                    )}
                </div>

                {/* Ngày chiếu */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ngày chiếu <span className="text-red-500">*</span>
                    </label>
                    <Input
                        {...register('ngayChieu')}
                        type="date"
                        className={errors.ngayChieu ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
                    />
                    {errors.ngayChieu && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.ngayChieu.message}</p>
                    )}
                </div>

                {/* Giờ chiếu */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Giờ chiếu <span className="text-red-500">*</span>
                    </label>
                    <Input
                        {...register('gioChieu')}
                        type="time"
                        placeholder="19:00"
                        className={errors.gioChieu ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
                    />
                    {errors.gioChieu && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.gioChieu.message}</p>
                    )}
                </div>

                {/* Giá vé */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Giá vé <span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register('giaVe', { valueAsNumber: true })}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.giaVe 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'
                        }`}
                    >
                        <option value="">Chọn giá vé</option>
                        <option value="75000">75,000đ</option>
                        <option value="85000">85,000đ</option>
                        <option value="95000">95,000đ</option>
                        <option value="120000">120,000đ</option>
                        <option value="150000">150,000đ</option>
                    </select>
                    {errors.giaVe && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.giaVe.message}</p>
                    )}
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="px-6 hover:bg-gray-100 transition-colors"
                >
                    Hủy
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-cyan-600 hover:bg-cyan-700 px-6 shadow-md hover:shadow-lg transition-all duration-200"
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Đang tạo...
                        </span>
                    ) : (
                        'Tạo lịch chiếu'
                    )}
                </Button>
            </div>
        </form>
    );
};
