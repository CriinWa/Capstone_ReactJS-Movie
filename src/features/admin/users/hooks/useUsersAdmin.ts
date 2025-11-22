import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quanLyNguoiDungServices } from '@/services/quanLyNguoiDung/quanLyNguoiDungServices';
import type { CreateUserPayload, UpdateUserPayload } from '@/services/quanLyNguoiDung/type';
import toast from 'react-hot-toast';

// Hook lấy danh sách người dùng
export const useUsersAdmin = (params: { 
    soTrang: number; 
    soPhanTuTrenTrang: number;
    tuKhoa?: string;
}) => {
    return useQuery({
        queryKey: ['usersAdmin', params],
        queryFn: async () => {
            const response = await quanLyNguoiDungServices.getUsersAdmin({
                MaNhom: 'GP01',
                soTrang: params.soTrang,
                soPhanTuTrenTrang: params.soPhanTuTrenTrang,
                tuKhoa: params.tuKhoa
            });
            return response.data.content;
        },
        staleTime: 5 * 60 * 1000,
    });
};

// Hook thêm người dùng
export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateUserPayload) => {
            const response = await quanLyNguoiDungServices.addUser(data);
            return response.data.content;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usersAdmin'] });
            toast.success('Thêm người dùng thành công!');
        },
        onError: (error: any) => {
            console.error('Add user error:', error);
            const errorMessage = error?.response?.data?.content || error?.response?.data?.message || error?.message || 'Thêm người dùng thất bại';
            toast.error(errorMessage);
        },
    });
};

// Hook cập nhật người dùng
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateUserPayload) => {
            const response = await quanLyNguoiDungServices.updateUser(data);
            return response.data.content;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usersAdmin'] });
            toast.success('Cập nhật người dùng thành công!');
        },
        onError: (error: any) => {
            console.error('Update user error:', error);
            const errorMessage = error?.response?.data?.content || error?.response?.data?.message || error?.message || 'Cập nhật người dùng thất bại';
            toast.error(errorMessage);
        },
    });
};

// Hook xóa người dùng
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (taiKhoan: string) => {
            const response = await quanLyNguoiDungServices.deleteUser(taiKhoan);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usersAdmin'] });
            toast.success('Xóa người dùng thành công!');
        },
        onError: (error: any) => {
            console.error('Delete user error:', error);
            const errorMessage = error?.response?.data?.content || error?.response?.data?.message || error?.message || 'Xóa người dùng thất bại';
            toast.error(errorMessage);
        },
    });
};
