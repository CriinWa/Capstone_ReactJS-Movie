import { PATH } from "@/constants";
import { HomePages } from "@/features/home/components";
import { SignInPage } from "@/features/signIn/components";
import { MainLayout } from "@/layouts/mainLayout/MainLayout";
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
                path: PATH.MOVIE_DETAIL(":id"),
                element: <div>Movie Page</div>
            },
            {
                path: PATH.SIGN_IN,
                element: <SignInPage />
            }
        ],
    },
    {
        path: "*",
        element: <div>404 Not Found</div>
    }
] as const;
// children như là Nested Routes đã từng làm
// path tách ra để trong constants/paths.ts dễ quản lí hơn