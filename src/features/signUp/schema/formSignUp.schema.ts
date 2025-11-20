import { z } from "zod";

export const formSignUpSchema = z.object({
    taiKhoan: z.string({ error: 'Tài khoản là bắt buộc' })
        .min(3, "Tài khoản phải có ít nhất 3 ký tự"),
    
    matKhau: z.string({ error: 'Mật khẩu là bắt buộc' })
        .min(1, "Vui lòng nhập mật khẩu"),
    
    confirmPassword: z.string({ error: 'Xác nhận mật khẩu là bắt buộc' })
        .min(1, "Vui lòng xác nhận mật khẩu"),
    
    email: z.string({ error: 'Email là bắt buộc' })
        .email("Email không đúng định dạng"),
    
    soDT: z.string({ error: 'Số điện thoại là bắt buộc' })
        .regex(/^0[0-9]{9}$/, "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số"),
    
    hoTen: z.string({ error: 'Họ tên là bắt buộc' })
        .min(2, "Họ tên phải có ít nhất 2 ký tự")
        .regex(/^[a-zA-ZÀ-ỹ\s]+$/, "Họ tên chỉ được chứa chữ cái và khoảng trắng"),
}).refine((data) => data.matKhau === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});

export type FormSignUpValues = z.infer<typeof formSignUpSchema>;
// FormSignUpValues: định nghĩa kiểu dữ liệu của formSignUpSchema để sử dụng trong useForm
// Nhưng lỡ có thêm confirmPassword nên tạo dỡ type riêng ở 'quanLyNguoiDungServices' cho payload gửi lên API bên quanLyNguoiDungServices và useMutationSignUp (ko làm giống của SignIn)

// refine: thêm điều kiện xác nhận mật khẩu phải khớp với mật khẩu đã nhập 