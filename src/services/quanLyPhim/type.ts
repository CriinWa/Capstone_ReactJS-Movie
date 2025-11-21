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
//trả về danh sách banner dạng mảng
// export interface GetBannerResponse {
//   content: Banner[]
// }