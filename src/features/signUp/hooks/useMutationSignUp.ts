import { useMutation } from '@tanstack/react-query'
import type { SignUpPayload} from '@/services/quanLyNguoiDung/quanLyNguoiDungServices'
import { quanLyNguoiDungServices as nguoiDungServices } from '@/services/quanLyNguoiDung/quanLyNguoiDungServices'

export const useMutationSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpPayload) => nguoiDungServices.signUp(data),
    // mutationFn là hàm thực hiện mutation, nhận dữ liệu từ form sign-up (data: SignUpPayload) 
    // và gọi dịch vụ đăng ký nguoiDungServices.signUp(data) để gửi yêu cầu đăng ký đến API
    // return về dữ liệu có type SignUpResponse được định nghĩa trong services/quanLyNguoiDung/type.ts
  })
}
