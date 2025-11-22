export const PATH = {
    HOME: "/",
    MOVIE_DETAIL: "/detail/:maPhim",
    MOVIE_DETAIL_BY_ID: (id: number | string) => `/detail/${id}`,
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    PROFILE: "/profile",

    // Admin routes
    ADMIN: "/admin",
    ADMIN_MOVIES: "/admin/movies",
    ADMIN_MOVIES_CREATE: "/admin/movies/create",
    ADMIN_MOVIES_EDIT: (id: number | string) => `/admin/movies/edit/${id}`,
    ADMIN_USERS: "/admin/users", 
    ADMIN_USERS_CREATE: "/admin/users/create",
    ADMIN_USERS_EDIT: (id: number | string) => `/admin/users/edit/${id}`,
    ADMIN_SCHEDULES: "/admin/schedules",
    
    // Booking route
    BOOKING: "/booking/:maPhim/:maLichChieu",
    BOOKING_BY_ID: (maPhim: number | string, maLichChieu: number | string) => `/booking/${maPhim}/${maLichChieu}`,
    
    // Static pages
    CONTACT: "/contact",
    NEWS: "/news",
    APP: "/app",
} as const; //dùng as const để read only

//file index.ts trong /constants/paths.ts để quản lí các path và xuất path