// Type cho ghế ngồi
export interface BookingSeat {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: 'Thuong' | 'Vip';
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat?: string;
}

// Type cho thông tin phim trong booking
export interface BookingMovieInfo {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieu: string;
  gioChieu: string;
  maPhim: number; // Required - dùng để navigate về movie detail sau khi đặt vé
}

// Type cho response API lấy danh sách ghế
export interface BookingResponse {
  thongTinPhim: BookingMovieInfo;
  danhSachGhe: BookingSeat[];
}

// Type cho request đặt vé
export interface BookingRequest {
  maLichChieu: number;
  danhSachVe: {
    maGhe: number;
    giaVe: number;
  }[];
}
