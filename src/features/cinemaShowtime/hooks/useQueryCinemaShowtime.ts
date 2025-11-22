import { useQuery } from '@tanstack/react-query';
import { quanLyRapServices } from '@/services/quanLyRap/quanLyRapServices';
import { queryKeys } from '@/constants/queryKey';

/**
 * Custom hook để fetch lịch chiếu theo hệ thống rạp
 * 
 * SRP: Hook này chỉ làm 1 việc - Fetch lịch chiếu khi có maHeThongRap
 * - Sử dụng React Query với enabled để tránh fetch khi chưa chọn hệ thống
 * - Cache 3 phút vì lịch chiếu update thường xuyên hơn
 * - Mỗi hệ thống rạp có cache riêng (queryKey khác nhau)
 * 
 * @param maHeThongRap - Mã hệ thống rạp (CGV, Galaxy...), null nếu chưa chọn
 * @returns UseQueryResult với lịch chiếu đầy đủ của hệ thống
 * 
 * @example
 * const [selectedSystem, setSelectedSystem] = useState('CGV');
 * const { data: showtime, isLoading } = useQueryCinemaShowtime(selectedSystem);
 * showtime?.lstCumRap.map(cluster => ...)
 */
export function useQueryCinemaShowtime(maHeThongRap: string | null) {
  return useQuery({
    queryKey: queryKeys.cinema.showtime(maHeThongRap || ''),
    queryFn: async () => {
      if (!maHeThongRap) return null;
      
      const response = await quanLyRapServices.getCinemaShowtime(maHeThongRap);
      // API trả về array nhưng chỉ có 1 phần tử
      return response.data.content[0] || null;
    },
    enabled: !!maHeThongRap, // Chỉ fetch khi đã chọn hệ thống rạp
    staleTime: 3 * 60 * 1000, // Cache 3 phút - lịch chiếu update thường xuyên
    refetchOnWindowFocus: true, // Refetch khi focus để cập nhật lịch mới
  });
}
