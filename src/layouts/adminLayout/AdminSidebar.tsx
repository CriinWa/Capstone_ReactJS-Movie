import { PATH } from "@/constants/paths";
import { Link, useLocation } from "react-router-dom";

export const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        {
            title: "Dashboard",
            path: PATH.ADMIN,
            icon: "📊"
        },
        {
            title: "Quản lý Phim",
            path: PATH.ADMIN_MOVIES,
            icon: "🎬"
        },
        {
            title: "Quản lý User",
            path: PATH.ADMIN_USERS,
            icon: "👥"
        },
        {
            title: "Quản lý Lịch chiếu",
            path: PATH.ADMIN_SCHEDULES,
            icon: "📅"
        }
    ];

    const isActive = (path: string) => {
        if (path === PATH.ADMIN) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-16 bottom-0 overflow-y-auto">
            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    isActive(item.path)
                                        ? 'bg-cyan-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};
