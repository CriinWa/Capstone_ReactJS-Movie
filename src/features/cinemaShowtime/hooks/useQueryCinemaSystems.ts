import { useQuery } from '@tanstack/react-query';
import { quanLyRapServices } from '@/services/quanLyRap/quanLyRapServices';
import { queryKeys } from '@/constants/queryKey';

/**
 * Custom hook để fetch danh sách hệ thống rạp
 * 
 * SRP: Hook này chỉ làm 1 việc - Fetch danh sách hệ thống rạp (CGV, Galaxy, BHD...)
 * - Sử dụng React Query để cache và manage server state
 * - Cache 10 phút vì danh sách hệ thống rạp ít thay đổi
 * - Auto refetch khi window focus để đảm bảo data fresh
 * 
 * @returns UseQueryResult với danh sách hệ thống rạp
 * 
 * @example
 * const { data: cinemaSystems, isLoading } = useQueryCinemaSystems();
 * cinemaSystems?.map(system => <div>{system.tenHeThongRap}</div>)
 */
export function useQueryCinemaSystems() {
  return useQuery({
    queryKey: queryKeys.cinema.systems,
    queryFn: async () => {
      const response = await quanLyRapServices.getCinemaSystems();
      return response.data.content;
    },
    staleTime: 10 * 60 * 1000, // Cache 10 phút - data ít thay đổi
    refetchOnWindowFocus: false, // Không refetch khi focus vì data stable
  });
}
