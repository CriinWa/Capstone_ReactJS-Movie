import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quanLyRapServices } from '@/services/quanLyRap/quanLyRapServices';
import { quanLyPhimServices } from '@/services/quanLyPhim/quanLyPhimServices';
import type { CreateSchedulePayload } from '@/services/quanLyRap/type';

// Hook lấy danh sách hệ thống rạp
export const useCinemaSystems = () => {
    return useQuery({
        queryKey: ['cinemaSystems'],
        queryFn: async () => {
            const response = await quanLyRapServices.getCinemaSystems();
            return response.data.content;
        },
        staleTime: 30 * 60 * 1000, // Cache 30 phút
    });
};

// Hook lấy thông tin cụm rạp theo hệ thống
export const useTheatersBySystem = (maHeThongRap: string | null) => {
    return useQuery({
        queryKey: ['theatersBySystem', maHeThongRap],
        queryFn: async () => {
            if (!maHeThongRap) return [];
            const response = await quanLyRapServices.getTheatersBySystem(maHeThongRap);
            return response.data.content;
        },
        enabled: !!maHeThongRap,
        staleTime: 30 * 60 * 1000,
    });
};

// Hook lấy lịch chiếu theo hệ thống rạp
export const useCinemaShowtime = (maHeThongRap: string | null) => {
    return useQuery({
        queryKey: ['cinemaShowtime', maHeThongRap],
        queryFn: async () => {
            if (!maHeThongRap) return [];
            const response = await quanLyRapServices.getCinemaShowtime(maHeThongRap);
            return response.data.content;
        },
        enabled: !!maHeThongRap,
        staleTime: 5 * 60 * 1000,
    });
};

// Hook lấy danh sách phim (để chọn phim khi tạo lịch chiếu)
export const useMoviesForSchedule = () => {
    return useQuery({
        queryKey: ['moviesForSchedule'],
        queryFn: async () => {
            const response = await quanLyPhimServices.getMoviesAdmin({
                maNhom: 'GP01',
                soTrang: 1,
                soPhanTuTrenTrang: 100 // Lấy nhiều phim để chọn
            });
            return response.data.content.items;
        },
        staleTime: 10 * 60 * 1000,
    });
};

// Hook tạo lịch chiếu
export const useCreateSchedule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateSchedulePayload) => {
            const response = await quanLyRapServices.createSchedule(data);
            return response.data;
        },
        onSuccess: () => {
            // Chỉ invalidate queries, không hiển thị toast (để handleSubmit xử lý)
            queryClient.invalidateQueries({ queryKey: ['cinemaShowtime'] });
        },
        onError: (error: any) => {
            // Không hiển thị toast ở đây, để handleSubmit xử lý
            console.error('Create schedule error:', error);
        },
    });
};
