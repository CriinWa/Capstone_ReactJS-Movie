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
