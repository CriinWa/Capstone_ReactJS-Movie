import { useAuth } from "./useAuth";

export const useRole = () => {
    const { user } = useAuth();
    
    // Kiểm tra xem user có phải Admin không
    const isAdmin = user?.maLoaiNguoiDung === 'QuanTri';
    
    // Kiểm tra xem user có phải Khách hàng không
    const isCustomer = user?.maLoaiNguoiDung === 'KhachHang';
    
    // Trả về role hiện tại
    const role = user?.maLoaiNguoiDung;
    
    return { 
        isAdmin, 
        isCustomer, 
        role 
    };
};

// useRole: Hook để kiểm tra quyền hạn của user
// - isAdmin: true nếu user là QuanTri
// - isCustomer: true nếu user là KhachHang  
// - role: giá trị 'QuanTri' | 'KhachHang' | undefined
