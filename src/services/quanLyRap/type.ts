// ============ CINEMA SYSTEM TYPES ============

/**
 * Hệ thống rạp (CGV, Galaxy, BHD Star...)
 */
export interface CinemaSystem {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
}

/**
 * Suất chiếu của phim tại rạp cụ thể
 */
export interface ShowtimeSlot {
  maLichChieu: number;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
}

/**
 * Thông tin phim và lịch chiếu
 */
export interface Movie {
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  lstLichChieuTheoPhim: ShowtimeSlot[];
}

/**
 * Cụm rạp (VD: GLX - Huỳnh Tấn Phát, CGV - Vincom...)
 */
export interface TheaterCluster {
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
  danhSachPhim: Movie[];
}

/**
 * Lịch chiếu đầy đủ của hệ thống rạp
 */
export interface CinemaShowtime {
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  mahom: string;
  lstCumRap: TheaterCluster[];
}

// ============ ADMIN SCHEDULE MANAGEMENT TYPES ============

/**
 * Payload tạo lịch chiếu mới
 */
export interface CreateSchedulePayload {
  maPhim: number;
  ngayChieuGioChieu: string; // Format: DD/MM/YYYY HH:mm:ss
  maRap: string;
  giaVe: number;
}

/**
 * Thông tin rạp (phòng chiếu)
 */
export interface Theater {
  maRap: number;
  tenRap: string;
  maCumRap: string;
  tenCumRap?: string;
  maHeThongRap?: string;
  tenHeThongRap?: string;
}

/**
 * Thông tin cụm rạp
 */
export interface TheaterClusterInfo {
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
  danhSachRap: Theater[];
}

/**
 * Thông tin hệ thống rạp với danh sách cụm rạp
 */
export interface CinemaSystemWithTheaters {
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  lstCumRap: TheaterClusterInfo[];
}

/**
 * Response wrapper cho API
 */
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  content: T;
  dateTime: string;
}
