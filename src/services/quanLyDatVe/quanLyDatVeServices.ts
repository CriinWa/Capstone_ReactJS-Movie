import { api } from "@/lib/api";
import type { BookingResponse, BookingRequest } from "./type";

export const quanLyDatVeServices = {
  // Lấy danh sách ghế theo mã lịch chiếu
  getBookingSeats: (maLichChieu: number | string) => {
    return api.get<{ content: BookingResponse }>("/QuanLyDatVe/LayDanhSachPhongVe", {
      params: { MaLichChieu: maLichChieu }
    });
  },

  // Đặt vé
  bookTickets: (data: BookingRequest) => {
    return api.post<{ content: string }>("/QuanLyDatVe/DatVe", data);
  }
};
