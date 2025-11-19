import { queryKeys } from '@/constants'
import { quanLyPhimServices } from '@/services/quanLyPhim/quanLyPhimServices'
import { useQuery } from '@tanstack/react-query'

export const useQueryBanners = () => {
  return useQuery( {
    queryKey: queryKeys.banner.lists(),
    queryFn: () => quanLyPhimServices.getBanners(),
    // select: (data) => data?.data.content, //nếu chỉ muốn lấy content thì dùng select, bên Banner khi dùng ko cần phải .data.content nữa
  })
}
