import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { STORAGEKEYS } from "@/constants"
import type { UserProfile } from "@/services/quanLyNguoiDung/type"

type SignInState = {
    accessToken?: string
    user?: {
        email: string
        hoTen: string
        maLoaiNguoiDung: 'QuanTri' | 'KhachHang'
        maNhom: string
        soDT?: string
        taiKhoan?: string
    }
}

const initialState: SignInState = {
    accessToken: localStorage.getItem(STORAGEKEYS.ACCESSTOKEN) || '',
    user: localStorage.getItem(STORAGEKEYS.USER) 
        ? JSON.parse(localStorage.getItem(STORAGEKEYS.USER) as string) 
        : undefined
}

export const { reducer: signInReducer, actions: signInActions } = createSlice({
    name: "signIn",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
        setUser: (state, action: PayloadAction<SignInState["user"]>) => {
            state.user = action.payload
        },
        updateUser: (state, action: PayloadAction<Partial<UserProfile>>) => {
            // Cập nhật thông tin user sau khi update profile
            if (state.user && action.payload) {
                state.user = {
                    ...state.user,
                    hoTen: action.payload.hoTen || state.user.hoTen,
                    email: action.payload.email || state.user.email,
                    soDT: action.payload.soDT,
                    taiKhoan: action.payload.taiKhoan,
                };
                // Cập nhật localStorage
                localStorage.setItem(STORAGEKEYS.USER, JSON.stringify(state.user));
            }
        },
        logout: (state) => {
            state.accessToken = undefined
            state.user = undefined
        }
    }
})