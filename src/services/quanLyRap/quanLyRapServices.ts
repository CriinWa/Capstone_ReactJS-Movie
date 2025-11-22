import { api } from "@/lib/api";
import type { CinemaSystem, CinemaShowtime, CreateSchedulePayload, CinemaSystemWithTheaters, ApiResponse } from "./type";

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

  // ============ ADMIN SCHEDULE MANAGEMENT APIs ============

  /**
   * Lấy thông tin hệ thống rạp và cụm rạp (để chọn rạp khi tạo lịch chiếu)
   * GET /QuanLyRap/LayThongTinCumRapTheoHeThong
   */
  getTheatersBySystem: (maHeThongRap: string) => {
    return api.get<{ content: CinemaSystemWithTheaters[] }>(
      '/QuanLyRap/LayThongTinCumRapTheoHeThong',
      {
        params: { maHeThongRap }
      }
    );
  },

  /**
   * Tạo lịch chiếu mới
   * POST /QuanLyDatVe/TaoLichChieu
   * 
   * NOTE: API này trả về 404 - có thể không khả dụng cho học viên
   * Đang sử dụng mock để demo UI
   */
  createSchedule: async (data: CreateSchedulePayload) => {
    // Thử gọi API thật trước
    try {
      return await api.post<ApiResponse<string>>('/QuanLyDatVe/TaoLichChieu', data, {
        params: { maNhom: 'GP01' }
      });
    } catch (error: any) {
      // Nếu 404, sử dụng mock
      if (error?.response?.status === 404) {
        console.warn('⚠️ API không khả dụng (404), sử dụng mock data');
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
          data: {
            statusCode: 200,
            message: 'Tạo lịch chiếu thành công (MOCK - API không khả dụng)',
            content: `Đã tạo lịch chiếu cho phim ${data.maPhim}`,
            dateTime: new Date().toISOString()
          }
        } as any;
      }
      throw error;
    }
  },
};
