import { api } from "@/lib/api";
import type { CinemaSystem, CinemaShowtime } from "./type";

/**
 * Services cho Quản lý Rạp
 * API Base: /QuanLyRap
 */
export const quanLyRapServices = {
  /**
   * Lấy danh sách hệ thống rạp (CGV, Galaxy, BHD Star...)
   * GET /QuanLyRap/LayThongTinHeThongRap
   */
  getCinemaSystems: () => {
    return api.get<{ content: CinemaSystem[] }>('/QuanLyRap/LayThongTinHeThongRap');
  },

  /**
   * Lấy lịch chiếu theo hệ thống rạp
   * GET /QuanLyRap/LayThongTinLichChieuHeThongRap
   * @param maHeThongRap - Mã hệ thống rạp (CGV, Galaxy...)
   */
  getCinemaShowtime: (maHeThongRap: string) => {
    return api.get<{ content: CinemaShowtime[] }>(
      `/QuanLyRap/LayThongTinLichChieuHeThongRap`,
      {
        params: {
          maHeThongRap,
          maNhom: 'GP01',
        },
      }
    );
  },
};
