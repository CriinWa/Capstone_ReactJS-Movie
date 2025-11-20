import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSignUpSchema, type FormSignUpValues } from "../schema/formSignUp.schema";
import { useMutationSignUp } from "./useMutationSignUp";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/paths";
import toast from "react-hot-toast";

export const useSignUp = () => {
    const form = useForm<FormSignUpValues>({
        resolver: zodResolver(formSignUpSchema),
        defaultValues: {
            taiKhoan: "",
            matKhau: "",
            confirmPassword: "",
            email: "",
            soDT: "",
            hoTen: ""
        }
    }); // sử dụng zodResolver để kết nối zod schema với react-hook-form, giúp validate form dựa trên schema đã định nghĩa

    const mutationSignUp = useMutationSignUp();
    const navigate = useNavigate(); // sử dụng để chuyển hướng sau khi đăng ký thành công

    const onSubmit: SubmitHandler<FormSignUpValues> = async (data) => {
        // handle sign-up logic here
        console.log("Form data signup:", data);
        
        // Chuẩn bị payload để gửi lên API (loại bỏ confirmPassword và thêm maNhom)
        const { confirmPassword, ...signUpData } = data;
        const payload = {
            ...signUpData,
            maNhom: "GP00" // hardcode maNhom theo yêu cầu
        };

        try {
            const response = await mutationSignUp.mutateAsync(payload);
            // Xử lý thành công
            console.log("Sign-up successful:", response);
            
            // Hiển thị thông báo thành công
            toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
            
            // Chuyển hướng về trang HOME (không tự động đăng nhập)
            navigate(PATH.HOME);

        } catch (error: any) {
            // Xử lý lỗi
            console.error("Sign-up error:", error);
            
            // Hiển thị thông báo lỗi
            const errorMessage = error?.response?.data?.message || error?.response?.data?.content || "Đăng ký thất bại. Vui lòng thử lại.";
            toast.error(errorMessage);
        }
    };

    return {
        form,
        onSubmit,
        isLoading: mutationSignUp.isPending
    };
};
