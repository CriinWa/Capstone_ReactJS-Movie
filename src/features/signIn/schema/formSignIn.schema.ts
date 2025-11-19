import { z } from "zod";
export const formSignInSchema = z.object(
    {
        taiKhoan: z.string({error: 'Tài khoản là bắt buộc'}).min(1, "Vui lòng nhập tài khoản"),
        matKhau: z.string({error: 'Mật khẩu là bắt buộc'}).min(1, "Vui lòng nhập mật khẩu"),
    },
)

export type FormSignInValues = z.infer<typeof formSignInSchema>;
//FormSignInValue: định nghĩa kiểu dữ liệu của formSignInSchema để sử dụng trong useForm