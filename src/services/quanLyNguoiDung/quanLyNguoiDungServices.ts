import type { FormSignInValues } from "@/features/signIn/schema/formSignIn.schema";
import { api } from "@/lib/api";
import type { SignInResponse } from "./type";

export const quanLyNguoiDungServices = {
    signIn: (data: FormSignInValues) => {
        // gọi API đăng nhập
        return api.post<SignInResponse>('/QuanLyNguoiDung/DangNhap', data);
    }
}