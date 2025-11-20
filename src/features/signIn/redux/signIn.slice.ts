import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { STORAGEKEYS } from "@/constants"

type SignInState = {
    accessToken?: string
    user?: {
        email: string
        hoTen: string
        maLoaiNguoiDung: 'QuanTri' | 'KhachHang'
        maNhom: string
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
        logout: (state) => {
            state.accessToken = undefined
            state.user = undefined
        }
    }
})