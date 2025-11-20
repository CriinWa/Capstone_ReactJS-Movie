import { Outlet } from "react-router-dom";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <AdminHeader />
            
            {/* Sidebar */}
            <AdminSidebar />
            
            {/* Main Content */}
            <main className="ml-64 pt-16">
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

// AdminLayout: Layout dành riêng cho trang Admin
// - AdminHeader: Header cố định với title và nút logout
// - AdminSidebar: Sidebar menu bên trái (Dashboard, Phim, User, Lịch chiếu)
// - Main content: Vùng hiển thị nội dung chính với Outlet cho nested routes
// - ml-64: margin-left để tránh bị sidebar che
// - pt-16: padding-top để tránh bị header che
