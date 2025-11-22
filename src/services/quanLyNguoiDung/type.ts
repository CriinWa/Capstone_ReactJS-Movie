export type SignInResponse = {
    content: {
        taiKhoan: string;
        hoTen: string;
        email: string;
        soDT: string;
        maNhom: string;
        maLoaiNguoiDung: 'QuanTri' | 'KhachHang';
        accessToken: string;
    }
}

//Định nghĩa kiểu dữ liệu của phản hồi đăng nhập từ API
//SignInResponse: kiểu dữ liệu trả về khi người dùng đăng nhập thành công

export type SignUpResponse = {
    statusCode: number;
    message: string;
    content: {
        taiKhoan: string;
        matKhau: string;
        email: string;
        soDT: string;
        maNhom: string;
        hoTen: string;
    };
    dateTime: string;
    messageConstants: string | null;
}

//Định nghĩa kiểu dữ liệu của phản hồi đăng ký từ API
//SignUpResponse: kiểu dữ liệu trả về khi người dùng đăng ký thành công

// ============ PROFILE TYPES ============

// User Profile Response - Thông tin chi tiết người dùng
export interface UserProfile {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  loaiNguoiDung: {
    maLoaiNguoiDung: string;
    tenLoai: string;
  } | null;
  thongTinDatVe: BookingHistoryItem[];
}

// Booking History Item - Thông tin lịch sử đặt vé
export interface BookingHistoryItem {
  maVe: number;
  ngayDat: string;
  tenPhim: string;
  hinhAnh: string;
  giaVe: number;
  thoiLuongPhim: number;
  danhSachGhe: BookingSeatInfo[];
}

// Booking Seat Info - Thông tin ghế đã đặt
export interface BookingSeatInfo {
  maHeThongRap: string;
  tenHeThongRap: string;
  maCumRap: string;
  tenCumRap: string;
  maRap: number;
  tenRap: string;
  maGhe: number;
  tenGhe: string;
}

// Update Profile Request - Dữ liệu cập nhật thông tin người dùng
export interface UpdateProfileRequest {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
}

// ============ ADMIN USER MANAGEMENT TYPES ============

// User List Response
export interface UserListResponse {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: User[];
}

// User Item
export interface User {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDt: string;
  maNhom: string;
  maLoaiNguoiDung: string;
}

// Create User Payload
export interface CreateUserPayload {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
}

// Update User Payload
export interface UpdateUserPayload {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
}

// API Response Wrapper
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  content: T;
  dateTime: string;
}
