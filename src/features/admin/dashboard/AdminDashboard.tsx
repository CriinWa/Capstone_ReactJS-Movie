export const AdminDashboard = () => {
    const currentDate = new Date().toLocaleDateString('vi-VN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <div className="min-h-screen space-y-8 pb-8">
            {/* Hero Header với animated gradient */}
            <div className="relative overflow-hidden bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl">
                <div className="absolute inset-0 opacity-30"></div>
                <div className="relative px-8 py-10 md:py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-white space-y-3">
                            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-2">
                                🎯 Admin Dashboard
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Chào mừng trở lại! 👋
                            </h1>
                            <p className="text-blue-100 text-lg md:text-xl max-w-2xl">
                                Quản lý toàn bộ hệ thống rạp phim một cách dễ dàng và hiệu quả
                            </p>
                            <div className="flex items-center gap-2 text-blue-50 text-sm pt-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{currentDate}</span>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="relative">
                                <div className="text-8xl animate-bounce">🎬</div>
                                <div className="absolute -bottom-4 -right-4 text-4xl animate-pulse">✨</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-blue-200 transition-shadow">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <span className="text-2xl">🎥</span>
                    </div>
                    <h3 className="text-gray-800 font-bold text-lg mb-1">Quản lý Phim</h3>
                    <p className="text-gray-500 text-sm mb-3">Thêm, sửa, xóa phim trong hệ thống</p>
                    <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                        <span>Xem chi tiết</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-linear-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-green-200 transition-shadow">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <span className="text-2xl">👥</span>
                    </div>
                    <h3 className="text-gray-800 font-bold text-lg mb-1">Người dùng</h3>
                    <p className="text-gray-500 text-sm mb-3">Quản lý tài khoản và phân quyền</p>
                    <div className="flex items-center text-green-600 text-sm font-semibold group-hover:gap-2 transition-all">
                        <span>Xem chi tiết</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-purple-200 transition-shadow">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-2xl">📅</span>
                    </div>
                    <h3 className="text-gray-800 font-bold text-lg mb-1">Lịch chiếu</h3>
                    <p className="text-gray-500 text-sm mb-3">Tạo và quản lý suất chiếu phim</p>
                    <div className="flex items-center text-purple-600 text-sm font-semibold group-hover:gap-2 transition-all">
                        <span>Xem chi tiết</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-orange-200 transform hover:-translate-y-2 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-orange-200 transition-shadow">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="text-gray-800 font-bold text-lg mb-1">Thống kê</h3>
                    <p className="text-gray-500 text-sm mb-3">Xem báo cáo và phân tích dữ liệu</p>
                    <div className="flex items-center text-orange-600 text-sm font-semibold group-hover:gap-2 transition-all">
                        <span>Xem chi tiết</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            Thao tác nhanh
                        </h2>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Shortcuts</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="/admin/movies" className="group flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all">
                            <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                🎬
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Quản lý phim</h3>
                                <p className="text-xs text-gray-500">Xem danh sách phim</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>

                        <a href="/admin/users" className="group flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all">
                            <div className="shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                👥
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">Quản lý user</h3>
                                <p className="text-xs text-gray-500">Phân quyền tài khoản</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>

                        <a href="/admin/schedules" className="group flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all">
                            <div className="shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                📅
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">Lịch chiếu</h3>
                                <p className="text-xs text-gray-500">Tạo suất chiếu mới</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>

                        <a href="/" className="group flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-cyan-200 hover:bg-cyan-50 transition-all">
                            <div className="shrink-0 w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                🏠
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 group-hover:text-cyan-600 transition-colors">Trang chủ</h3>
                                <p className="text-xs text-gray-500">Xem giao diện user</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="bg-linear-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-cyan-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <div className="p-2 bg-cyan-100 rounded-lg">
                            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        Trạng thái
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span className="text-lg">🌐</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Server</p>
                                    <p className="text-xs text-gray-500">API Connection</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-bold text-green-600">Online</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-lg">🔒</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Bảo mật</p>
                                    <p className="text-xs text-gray-500">SSL Certificate</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-bold text-blue-600">Secured</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-lg">⚡</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Hiệu suất</p>
                                    <p className="text-xs text-gray-500">Response Time</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-bold text-purple-600">Fast</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tips */}
            <div className="relative overflow-hidden bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl shadow-2xl">
                <div className="relative p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-white">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-3xl">🚀</span>
                                <h3 className="text-2xl md:text-3xl font-bold">Sẵn sàng bắt đầu?</h3>
                            </div>
                            <p className="text-purple-100 text-lg mb-4 max-w-2xl">
                                Khám phá toàn bộ tính năng quản lý và tối ưu hóa vận hành hệ thống rạp phim của bạn
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                                    <span className="text-lg">💡</span>
                                    <span className="text-sm font-medium">Tips: Dùng phím tắt để làm việc nhanh hơn</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                                    <span className="text-lg">📚</span>
                                    <span className="text-sm font-medium">Xem hướng dẫn chi tiết</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="relative">
                                <div className="text-7xl">🎯</div>
                                <div className="absolute -top-3 -right-3 text-3xl">⭐</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
