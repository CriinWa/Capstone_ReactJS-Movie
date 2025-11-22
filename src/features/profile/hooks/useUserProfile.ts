import { useQuery } from '@tanstack/react-query';
import { quanLyNguoiDungServices } from '@/services/quanLyNguoiDung/quanLyNguoiDungServices';
import { queryKeys } from '@/constants/queryKey';

/**
 * Custom hook để fetch thông tin user profile
 * 
 * SRP: Hook này chỉ làm 1 việc - Fetch user profile từ API
 * - Sử dụng React Query để cache và manage server state
 * - Cache 5 phút để giảm số lần gọi API không cần thiết
 * - Auto refetch khi window focus để đảm bảo data fresh
 * 
 * @returns UseQueryResult với user profile data
 */
export function useUserProfile() {
  return useQuery({
    queryKey: queryKeys.user.profile,
    queryFn: async () => {
      const response = await quanLyNguoiDungServices.getUserProfile();
      
      // API trả về response.data.content
      return response.data.content;
    },
    staleTime: 5 * 60 * 1000, // Cache 5 phút
    refetchOnWindowFocus: true, // Refetch khi focus lại window
  });
}
