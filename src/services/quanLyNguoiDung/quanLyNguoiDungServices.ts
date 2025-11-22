import type { FormSignInValues } from "@/features/signIn/schema/formSignIn.schema";
import { api } from "@/lib/api";
import type { SignInResponse, SignUpResponse, UserProfile, UpdateProfileRequest, UserListResponse, User, CreateUserPayload, UpdateUserPayload, ApiResponse } from "./type";

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
    },

    // Lấy thông tin user hiện tại (cần Bearer token)
    // API yêu cầu POST và trả về wrapper {content: UserProfile}
    getUserProfile: () => {
        return api.post<{ content: UserProfile }>('/QuanLyNguoiDung/ThongTinTaiKhoan');
    },

    // Cập nhật thông tin user (cần Bearer token)
    updateUserProfile: (data: UpdateProfileRequest) => {
        return api.put<{ content: UserProfile }>('/QuanLyNguoiDung/CapNhatThongTinNguoiDung', data);
    },

    // ============ ADMIN USER MANAGEMENT APIs ============
    
    // Lấy danh sách người dùng phân trang
    getUsersAdmin: (params: { 
        MaNhom?: string; 
        soTrang?: number; 
        soPhanTuTrenTrang?: number;
        tuKhoa?: string;
    }) => {
        return api.get<ApiResponse<UserListResponse>>('/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang', { params });
    },

    // Thêm người dùng mới
    addUser: (data: CreateUserPayload) => {
        return api.post<ApiResponse<User>>('/QuanLyNguoiDung/ThemNguoiDung', data);
    },

    // Cập nhật người dùng
    updateUser: (data: UpdateUserPayload) => {
        return api.post<ApiResponse<User>>('/QuanLyNguoiDung/CapNhatThongTinNguoiDung', data);
    },

    // Xóa người dùng
    deleteUser: (taiKhoan: string) => {
        return api.delete<ApiResponse<string>>('/QuanLyNguoiDung/XoaNguoiDung', {
            params: { TaiKhoan: taiKhoan }
        });
    },

    // Tìm kiếm người dùng
    searchUsers: (tuKhoa: string, maNhom: string = 'GP01') => {
        return api.get<ApiResponse<User[]>>('/QuanLyNguoiDung/TimKiemNguoiDung', {
            params: { MaNhom: maNhom, tuKhoa }
        });
    }
}