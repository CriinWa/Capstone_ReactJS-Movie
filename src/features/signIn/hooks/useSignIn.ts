import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSignInSchema, type FormSignInValues  } from "../schema/formSignIn.schema";
import { useMutationSignIn } from "./useMutationSignIn";
import { useAppDispatch } from "@/store/config";
import { signInActions } from "../redux/signIn.slice";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/paths";
import { STORAGEKEYS } from "@/constants";
import { toast } from "react-hot-toast";

export const useSignIn = () => {
    const form = useForm<FormSignInValues>({
        resolver: zodResolver(formSignInSchema),
        defaultValues: {
            taiKhoan: "",
            matKhau: ""
        }
    }) //sử dụng zodResolver để kết nối zod schema với react-hook-form, giúp validate form dựa trên schema đã định nghĩa


    const mutationSignIn = useMutationSignIn();
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); //sử dụng để chuyển hướng sau khi đăng nhập thành công

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

            localStorage.setItem(STORAGEKEYS.ACCESSTOKEN, accessToken);// Lưu accessToken riêng biệt
            localStorage.setItem(STORAGEKEYS.USER, JSON.stringify(userWithoutToken)); // Lưu thông tin user không có accessToken

            // Lưu thông tin vào Redux store 
            dispatch(signInActions.setAccessToken(accessToken))
            dispatch(signInActions.setUser(userWithoutToken))

            // REDIRECT DỰA TRÊN ROLE
            if (userWithoutToken.maLoaiNguoiDung === 'QuanTri') {
            navigate(PATH.ADMIN); // Admin → /admin
            } else {
            navigate(PATH.HOME); // Customer → /
            }

            toast.success(`Chào mừng ${userWithoutToken.hoTen}!`);
        } catch (error) {
            toast.error("Đăng nhập thất bại");
        }

    }
  return {
    form, 
    onSubmit,
    isLoading: mutationSignIn.isPending
  }
}
