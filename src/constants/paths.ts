export const PATH = {
    HOME: "/",
    MOVIE_DETAIL: (id: number | string) => `/movie/${id}`,
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    PROFILE: "/profile",
} as const; //dùng as const để read only

//file index.ts trong /constants/paths.ts để quản lí các path và xuất path