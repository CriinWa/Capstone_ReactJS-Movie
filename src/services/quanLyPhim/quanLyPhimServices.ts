import type { Banner, Movie, MovieScheduleResponse, CreateMoviePayload, UpdateMoviePayload, ApiResponse } from "./type";
import { api } from "@/lib/api";

export const quanLyPhimServices = {
    getBanners: () => {
        return api.get<{ content: Banner[] }>("/QuanLyPhim/LayDanhSachBanner");
    },
    
    getMovies: ({ maNhom = 'GP01', tenPhim }: { maNhom?: string; tenPhim?: string }) => {
        return api.get<{ content: Movie[] }>("/QuanLyPhim/LayDanhSachPhim", {
            params: { maNhom, tenPhim }
        });
    },
    
    // API lấy thông tin chi tiết phim kèm lịch chiếu
    getMovieSchedule: (maPhim: number | string) => {
        return api.get<MovieScheduleResponse>("/QuanLyRap/LayThongTinLichChieuPhim", {
            params: { MaPhim: maPhim }
        });
    },

    // Admin APIs
    getMoviesAdmin: ({ maNhom = 'GP01', soTrang = 1, soPhanTuTrenTrang = 10, tenPhim }: { 
        maNhom?: string; 
        soTrang?: number; 
        soPhanTuTrenTrang?: number;
        tenPhim?: string;
    }) => {
        return api.get<ApiResponse<{ items: Movie[]; totalCount: number }>>("/QuanLyPhim/LayDanhSachPhimPhanTrang", {
            params: { maNhom, soTrang, soPhanTuTrenTrang, tenPhim }
        });
    },

    getMovieById: (maPhim: number | string) => {
        return api.get<ApiResponse<Movie>>("/QuanLyPhim/LayThongTinPhim", {
            params: { MaPhim: maPhim }
        });
    },

    addMovie: (data: CreateMoviePayload) => {
        const formData = new FormData();
        formData.append('tenPhim', data.tenPhim);
        formData.append('trailer', data.trailer || '');
        formData.append('moTa', data.moTa);
        // Format date to DD/MM/YYYY
        const date = new Date(data.ngayKhoiChieu);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        formData.append('ngayKhoiChieu', formattedDate);
        formData.append('sapChieu', String(data.sapChieu));
        formData.append('dangChieu', String(data.dangChieu));
        formData.append('hot', String(data.hot));
        formData.append('danhGia', String(data.danhGia));
        formData.append('maNhom', data.maNhom);
        if (data.hinhAnh) {
            formData.append('File', data.hinhAnh);
        }
        return api.post<ApiResponse<Movie>>("/QuanLyPhim/ThemPhimUploadHinh", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    updateMovie: (data: UpdateMoviePayload) => {
        const formData = new FormData();
        formData.append('maPhim', String(data.maPhim));
        formData.append('tenPhim', data.tenPhim);
        formData.append('trailer', data.trailer || '');
        formData.append('moTa', data.moTa);
        // Format date to DD/MM/YYYY
        const date = new Date(data.ngayKhoiChieu);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        formData.append('ngayKhoiChieu', formattedDate);
        formData.append('sapChieu', String(data.sapChieu));
        formData.append('dangChieu', String(data.dangChieu));
        formData.append('hot', String(data.hot));
        formData.append('danhGia', String(data.danhGia));
        formData.append('maNhom', data.maNhom);
        if (data.hinhAnh instanceof File) {
            formData.append('File', data.hinhAnh);
        }
        return api.post<ApiResponse<Movie>>("/QuanLyPhim/CapNhatPhimUpload", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    deleteMovie: (maPhim: number | string) => {
        return api.delete<ApiResponse<string>>("/QuanLyPhim/XoaPhim", {
            params: { maPhim: maPhim }
        });
    }
}