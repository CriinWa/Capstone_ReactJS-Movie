import { useQuery } from '@tanstack/react-query';
import { quanLyDatVeServices } from '@/services/quanLyDatVe/quanLyDatVeServices';
import { queryKeys } from '@/constants/queryKey';

export function useBookingSeats(maLichChieu: string) {
  return useQuery({
    queryKey: queryKeys.booking.detail(maLichChieu),
    queryFn: () => quanLyDatVeServices.getBookingSeats(maLichChieu),
    enabled: !!maLichChieu,
    staleTime: 0, // Không cache, luôn fetch mới
    refetchOnMount: 'always', // Luôn refetch khi mount component
    refetchOnWindowFocus: true, // Refetch khi focus lại window
  });
}
