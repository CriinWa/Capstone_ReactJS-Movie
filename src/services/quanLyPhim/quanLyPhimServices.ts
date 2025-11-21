import type { Banner, Movie, MovieScheduleResponse } from "./type";
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
    }
}