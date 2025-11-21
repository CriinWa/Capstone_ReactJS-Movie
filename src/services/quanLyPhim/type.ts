export interface Banner {
  maBanner: number
  maPhim: number
  hinhAnh: string
}

// Movie type dùng cho list phim
export interface Movie {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

// MovieDetail type dùng cho trang chi tiết phim (có thêm heThongRapChieu)
export interface MovieDetail {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  ngayKhoiChieu: string;
  danhGia: number;
  heThongRapChieu: TheaterSystem[];
}

// Hệ thống rạp chiếu (CGV, BHD, Galaxy, etc.)
export interface TheaterSystem {
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  cumRapChieu: TheaterCluster[];
}

// Cụm rạp (CGV Vincom, CGV Landmark, etc.)
export interface TheaterCluster {
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
  lichChieuPhim: Schedule[];
}

// Lịch chiếu cụ thể
export interface Schedule {
  maLichChieu: string;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
  thoiLuong: number;
}

// Response từ API LayThongTinPhim
export interface MovieDetailResponse {
  statusCode: number;
  message: string;
  content: Movie; // Chỉ có thông tin phim cơ bản, không có lịch chiếu
  dateTime: string;
  messageConstants: string | null;
}

// Response từ API LayThongTinLichChieuPhim
export interface MovieScheduleResponse {
  statusCode: number;
  message: string;
  content: MovieDetail; // Có đầy đủ thông tin phim + lịch chiếu + hệ thống rạp chiếu 
  dateTime: string;
  messageConstants: string | null;
}