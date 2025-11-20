export const AdminDashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Dashboard
            </h1>
            
            {/* Thống kê Card */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Tổng Phim</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                        </div>
                        <div className="text-4xl">🎬</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Tổng User</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                        </div>
                        <div className="text-4xl">👥</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Lịch chiếu</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                        </div>
                        <div className="text-4xl">📅</div>
                    </div>
                </div>
            </div> */}

            <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Chào mừng đến trang quản trị
                </h2>
                <p className="text-gray-600">
                    Sử dụng menu bên trái để quản lý phim, user và lịch chiếu.
                </p>
            </div>
        </div>
    );
};
