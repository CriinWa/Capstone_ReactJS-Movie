import { useAppDispatch } from "@/store/config";
import { signInActions } from "@/features/signIn/redux/signIn.slice";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/paths";
import { STORAGEKEYS } from "@/constants";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    // Xóa Redux state
    dispatch(signInActions.logout());
    
    // Xóa localStorage
    localStorage.removeItem(STORAGEKEYS.ACCESSTOKEN);
    localStorage.removeItem(STORAGEKEYS.USER);
    
    // Chuyển về trang chủ
    navigate(PATH.HOME);
  };

  return { logout };
};
