import { useAuth, useRole } from "@/hooks";
import { PATH } from "@/constants/paths";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { type ReactNode } from "react";

type AdminRouteProps = {
    children: ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
    const { user } = useAuth();
    const { isAdmin } = useRole();
    
    // Kiểm tra 1: Chưa đăng nhập → Redirect về Sign In
    if (!user) {
        toast.error("Vui lòng đăng nhập để tiếp tục");
        return <Navigate to={PATH.SIGN_IN} replace />;
    }
    
    // Kiểm tra 2: Đã đăng nhập nhưng không phải Admin → Redirect về Home
    if (!isAdmin) {
        toast.error("Bạn không có quyền truy cập trang này");
        return <Navigate to={PATH.HOME} replace />;
    }
    
    // Kiểm tra 3: Là Admin → Cho phép truy cập
    return <>{children}</>;
};

// AdminRoute: Component bảo vệ các route chỉ dành cho Admin
// - Kiểm tra user đã đăng nhập chưa
// - Kiểm tra user có maLoaiNguoiDung === 'QuanTri' không
// - Nếu không đủ điều kiện → Redirect + hiển thị toast
// - Nếu đủ điều kiện → Render children (AdminLayout, AdminPages, etc.)
// AdminRouteProps: định nghĩa kiểu props cho AdminRoute, bao gồm children là các component con được bảo vệ bởi route này
// ReactNode: kiểu dữ liệu đại diện cho bất kỳ thành phần React nào (JSX, string, number, etc.)
