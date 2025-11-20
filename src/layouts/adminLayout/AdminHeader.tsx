import { useLogout } from "@/hooks";
import { PATH } from "@/constants/paths";
import { Link } from "react-router-dom";

export const AdminHeader = () => {
    const { logout } = useLogout();

    return (
        <header className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Admin Dashboard
                    </h1>
                </div>
                
                <div className="flex items-center gap-4">
                    <Link 
                        to={PATH.HOME}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Về trang chủ
                    </Link>
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        </header>
    );
};
