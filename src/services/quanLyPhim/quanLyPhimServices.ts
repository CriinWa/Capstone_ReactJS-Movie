import type { Banner } from "./type";
import { api } from "@/lib/api";

export const quanLyPhimServices = {
    getBanners: () => {
        return api.get< { content: Banner[] } >("/QuanLyPhim/LayDanhSachBanner");
        
    }
}