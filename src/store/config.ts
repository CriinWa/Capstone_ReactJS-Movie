import { signInReducer } from '@/features/signIn/redux/signIn.slice';
import movieReducer from '@/features/home/redux/movie.slice';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        // Thêm các slice reducer tại đây
        signIn: signInReducer,
        movies: movieReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// (17:06) chỉnh lại chút trong store/config.ts để có thể dùng useDispath, useSelecter trong Typescript
// Sử dụng useAppDispatch và useAppSelector trong các component để thay thế cho useDispatch và useSelector thông thường, giúp đảm bảo kiểu dữ liệu chính xác khi làm việc với Redux store trong ứng dụng TypeScript của bạn.