import { useAppDispatch } from "@/store/config";
import { signInActions } from "@/features/signIn/redux/signIn.slice";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/paths";
import { STORAGEKEYS } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    // Xóa Redux state
    dispatch(signInActions.logout());
    
    // Xóa localStorage
    localStorage.removeItem(STORAGEKEYS.ACCESSTOKEN);
    localStorage.removeItem(STORAGEKEYS.USER);
    
    // Clear toàn bộ React Query cache
    // Fix bug: Tránh hiển thị data của user cũ khi đăng nhập user mới
    queryClient.clear();
    
    // Chuyển về trang chủ
    navigate(PATH.HOME);
  };

  return { logout };
};
