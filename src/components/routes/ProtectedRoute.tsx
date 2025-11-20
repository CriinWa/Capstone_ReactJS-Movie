import { useAuth } from "@/hooks";
import { PATH } from "@/constants/paths";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { type ReactNode } from "react";

type ProtectedRouteProps = {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useAuth();
    
    // Kiểm tra: Chưa đăng nhập → Redirect về Sign In
    if (!user) {
        toast.error("Vui lòng đăng nhập để tiếp tục");
        return <Navigate to={PATH.SIGN_IN} replace />;
    }
    
    // Đã đăng nhập (Admin hoặc Customer đều được) → Cho phép truy cập
    return <>{children}</>;
};

// ProtectedRoute: Component bảo vệ các route yêu cầu đăng nhập
// - Chỉ kiểm tra user có tồn tại trong Redux store không
// - KHÔNG kiểm tra role (cả Admin và Customer đều truy cập được)
// - Sử dụng cho: Profile, Booking History, My Tickets, etc.
// - Nếu chưa đăng nhập → Redirect về SIGN_IN + toast warning
