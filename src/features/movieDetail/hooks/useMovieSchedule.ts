import { useQuery } from "@tanstack/react-query";
import { quanLyPhimServices } from "@/services/quanLyPhim/quanLyPhimServices";
import { queryKeys } from "@/constants/queryKey";

export const useMovieSchedule = (maPhim: number | string | undefined) => {
    return useQuery({
        queryKey: queryKeys.movieSchedule.detail(String(maPhim)),
        queryFn: () => quanLyPhimServices.getMovieSchedule(maPhim!),
        enabled: !!maPhim, // Chỉ fetch khi có maPhim
        select: (data) => data.data.content, // Trả về content thay vì toàn bộ response
        staleTime: 5 * 60 * 1000, // Cache 5 phút
    });
};

// useMovieSchedule: Hook để lấy thông tin chi tiết phim + lịch chiếu
// - Sử dụng React Query để fetch data
// - Cache data 5 phút để tránh fetch lại khi user quay lại
// - enabled: !!maPhim → chỉ fetch khi maPhim có giá trị
// - select: data.data.content → trả về MovieDetail object trực tiếp
