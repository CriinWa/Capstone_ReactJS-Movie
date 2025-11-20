import type { FormSignInValues } from "@/features/signIn/schema/formSignIn.schema";
import { api } from "@/lib/api";
import type { SignInResponse, SignUpResponse } from "./type";

export type SignUpPayload = {
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDT: string;
    maNhom: string;
    hoTen: string;
}

export const quanLyNguoiDungServices = {
    signIn: (data: FormSignInValues) => {
        // gọi API đăng nhập
        return api.post<SignInResponse>('/QuanLyNguoiDung/DangNhap', data);
    },
    
    signUp: (data: SignUpPayload) => {
        // gọi API đăng ký
        return api.post<SignUpResponse>('/QuanLyNguoiDung/DangKy', data);
    }
}