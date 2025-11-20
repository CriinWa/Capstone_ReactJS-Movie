import { PATH } from "@/constants/paths";
import { Link } from "react-router-dom";

export const AdminMovies = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Quản lý Phim
                </h1>
                <Link
                    to={PATH.ADMIN_MOVIES_CREATE}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                    + Thêm Phim Mới
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <p className="text-gray-500 text-center py-8">
                        Chức năng quản lý phim đang được phát triển...
                    </p>
                </div>
            </div>
        </div>
    );
};
