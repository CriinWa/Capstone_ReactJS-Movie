import { PATH } from "@/constants";
import { HomePages } from "@/features/home/components";
import { SignInPage } from "@/features/signIn/components";
import { SignUpPage } from "@/features/signUp/components";
import { MovieDetailPage } from "@/features/movieDetail/components";
import { MainLayout } from "@/layouts/mainLayout/MainLayout";
import { AdminLayout } from "@/layouts/adminLayout/AdminLayout";
import { AdminRoute } from "@/components/routes";
import { AdminDashboard } from "@/features/admin/dashboard/AdminDashboard";
import { AdminMovies } from "@/features/admin/movies/AdminMovies";
import { AdminUsers } from "@/features/admin/users/AdminUsers";
import { AdminSchedules } from "@/features/admin/schedules/AdminSchedules";
import { type RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
    {
        //Main layout
        path: PATH.HOME,
        // element: <div>Main Layout <Outlet /></div>, //Chỉnh sửa ở buổi 39
        element: <MainLayout />,
        //có thẻ Outlet để hiển thị chứa các thẻ con bên dưới
        children: [
            {
                index: true,
                element: <HomePages />
            },
            {
                path: PATH.MOVIE_DETAIL,
                element: <MovieDetailPage />
            },
            {
                path: PATH.SIGN_IN,
                element: <SignInPage />
            },
            {
                path: PATH.SIGN_UP,
                element: <SignUpPage />
            }
        ],
    },
    {
        // Admin Layout - Chỉ Admin mới truy cập được
        path: PATH.ADMIN,
        element: (
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
        ),
        children: [
            {
                index: true,
                element: <AdminDashboard />
            },
            {
                path: "movies",
                element: <AdminMovies />
            },
            {
                path: "users",
                element: <AdminUsers />
            },
            {
                path: "schedules",
                element: <AdminSchedules />
            }
        ]
    },
    {
        path: "*",
        element: <div>404 Not Found</div>
    }
] as const;
// children như là Nested Routes đã từng làm
// path tách ra để trong constants/paths.ts dễ quản lí hơn