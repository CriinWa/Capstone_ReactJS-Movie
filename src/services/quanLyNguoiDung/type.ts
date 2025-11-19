export type SignInResponse = {
    content: {
        taiKhoan: string;
        hoTen: string;
        email: string;
        soDT: string;
        maNhom: string;
        maLoaiNguoiDung: string;
        accessToken: string;
    }
}

//Định nghĩa kiểu dữ liệu của phản hồi đăng nhập từ API
//SignInResponse: kiểu dữ liệu trả về khi người dùng đăng nhập thành công
