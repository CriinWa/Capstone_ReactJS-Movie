import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSignInSchema, type FormSignInValues  } from "../schema/formSignIn.schema";
import { useMutationSignIn } from "./useMutationSignIn";

export const useSignIn = () => {
    const form = useForm<FormSignInValues>({
        resolver: zodResolver(formSignInSchema)
    }) //sử dụng zodResolver để kết nối zod schema với react-hook-form, giúp validate form dựa trên schema đã định nghĩa

    const mutationSignIn = useMutationSignIn();

    const onSubmit: SubmitHandler<FormSignInValues> = async (data) => {
        //handle sign-in logic here
        console.log("Form data signin:", data);
        //gọi api login
        try {
            const response = await mutationSignIn.mutateAsync(data);
            //Xử lý thành công (chuyển hướng, hiển thị thông báo, v.v.)
            console.log("Sign-in successful:", response);

            //Lưu token vào localStorega 
            // localStorage.setItem("accessToken", response.data.content.accessToken);

            // Xóa accessToken khỏi object user trước khi lưu thông tin user vào localStorage
            const { accessToken, taiKhoan,  ...userWithoutToken } = response.data.content;

            localStorage.setItem("accessToken", accessToken);// Lưu accessToken riêng biệt
            localStorage.setItem("user", JSON.stringify(userWithoutToken)); // Lưu thông tin user không có accessToken



        } catch (error) {
            //Xử lý lỗi (hiển thị thông báo lỗi, v.v.)
            console.error("Sign-in error:", error);
        }

    }
  return {
    form, 
    onSubmit,
    isLoading: mutationSignIn.isPending
  }
}
