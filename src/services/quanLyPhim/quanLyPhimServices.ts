import type { Banner } from "./type";
import type { Movie } from "./type";
import { api } from "@/lib/api";

export const    quanLyPhimServices = {
    getBanners: () => {
        return api.get< { content: Banner[] } >("/QuanLyPhim/LayDanhSachBanner");
        
    }
    ,
    getMovies: ({ maNhom = 'GP01', tenPhim }: { maNhom?: string; tenPhim?: string }) => {
        return api.get<{ content: Movie[] }>("/QuanLyPhim/LayDanhSachPhim", {
            params: { maNhom, tenPhim }
        });
    }
}