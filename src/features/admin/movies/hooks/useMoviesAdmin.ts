import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quanLyPhimServices } from '@/services/quanLyPhim/quanLyPhimServices';
import type { CreateMoviePayload, UpdateMoviePayload } from '@/services/quanLyPhim/type';
import toast from 'react-hot-toast';

export const useMoviesAdmin = ({ 
    maNhom = 'GP01', 
    soTrang = 1, 
    soPhanTuTrenTrang = 10,
    tenPhim 
}: { 
    maNhom?: string; 
    soTrang?: number; 
    soPhanTuTrenTrang?: number;
    tenPhim?: string;
}) => {
    return useQuery({
        queryKey: ['moviesAdmin', maNhom, soTrang, soPhanTuTrenTrang, tenPhim],
        queryFn: async () => {
            const response = await quanLyPhimServices.getMoviesAdmin({ 
                maNhom, 
                soTrang, 
                soPhanTuTrenTrang,
                tenPhim 
            });
            return response.data.content;
        },
    });
};

export const useMovieById = (maPhim: number | string) => {
    return useQuery({
        queryKey: ['movie', maPhim],
        queryFn: async () => {
            const response = await quanLyPhimServices.getMovieById(maPhim);
            return response.data.content;
        },
        enabled: !!maPhim,
    });
};

export const useAddMovie = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: CreateMoviePayload) => {
            const response = await quanLyPhimServices.addMovie(data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['moviesAdmin'] });
            toast.success('Thêm phim thành công!');
        },
        onError: (error: any) => {
            console.error('Add movie error:', error);
            const errorMessage = error?.response?.data?.content || error?.response?.data?.message || error?.message || 'Thêm phim thất bại!';
            toast.error(errorMessage);
        },
    });
};

export const useUpdateMovie = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (data: UpdateMoviePayload) => {
            const response = await quanLyPhimServices.updateMovie(data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['moviesAdmin'] });
            queryClient.invalidateQueries({ queryKey: ['movie'] });
            toast.success('Cập nhật phim thành công!');
        },
        onError: (error: any) => {
            console.error('Update movie error:', error);
            const errorMessage = error?.response?.data?.content || error?.response?.data?.message || error?.message || 'Cập nhật phim thất bại!';
            toast.error(errorMessage);
        },
    });
};

export const useDeleteMovie = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (maPhim: number | string) => {
            const response = await quanLyPhimServices.deleteMovie(maPhim);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['moviesAdmin'] });
            toast.success('Xóa phim thành công!');
        },
        onError: (error: any) => {
            console.error('Delete movie error:', error);
            const errorMessage = error?.response?.data?.content || error?.response?.data?.message || error?.message || 'Xóa phim thất bại!';
            toast.error(errorMessage);
        },
    });
};
