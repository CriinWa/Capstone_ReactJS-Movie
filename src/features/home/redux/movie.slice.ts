import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { quanLyPhimServices } from '@/services/quanLyPhim/quanLyPhimServices';
import type { Movie } from '@/services/quanLyPhim/type';

// Đã dùng chung type Movie từ services/quanLyPhim/type.ts

export type MovieFilter = 'all' | 'hot' | 'dangChieu' | 'sapChieu';

export interface MovieState {
  movies: Movie[];
  filter: MovieFilter;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
}

const initialState: MovieState = {
  movies: [],
  filter: 'all',
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 12, // 3 hàng x 4 phim
};

export const fetchMovies = createAsyncThunk<Movie[], { maNhom?: string; tenPhim?: string }>(
  'movies/fetchMovies',
  async ({ maNhom = 'GP01', tenPhim }, { rejectWithValue }) => {
    try {
      const res = await quanLyPhimServices.getMovies({ maNhom, tenPhim });
      return res.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Lỗi lấy danh sách phim');
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<MovieFilter>) {
      state.filter = action.payload;
      state.currentPage = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilter, setPage } = movieSlice.actions;
export default movieSlice.reducer;
