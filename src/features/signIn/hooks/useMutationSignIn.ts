import { useMutation } from '@tanstack/react-query'
import type { FormSignInValues } from '../schema/formSignIn.schema'
import { quanLyNguoiDungServices } from '@/services/quanLyNguoiDung/quanLyNguoiDungServices'

export const useMutationSignIn = () => {
  return useMutation({
    mutationFn: (data: FormSignInValues) => quanLyNguoiDungServices.signIn(data),
    //mutationFn là hàm thực hiện mutation, nhận dữ liệu từ form sign-in (data: FormSignInValues) và gọi dịch vụ đăng nhập quanLyNguoiDungServices.signIn(data) 
    // để gửi yêu cầu đăng nhập đến API. return về dữ liệu có type SignInResponse đc định nghĩa trong quanLyNguoiDungServices.ts, sau đó useSignIn sẽ nhận đc dữ liệu này để xử lý tiếp. Ví dụ: lưu token, chuyển hướng người dùng, hiển thị thông báo, v.v.
    // dự liệu useSignIn nhận đc định nghĩa tại services/quanLyNguoiDung/type.ts 
  })
}
