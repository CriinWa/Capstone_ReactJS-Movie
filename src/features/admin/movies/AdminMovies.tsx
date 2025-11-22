import { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { MovieTable, MovieForm } from "./components";
import { useMoviesAdmin, useAddMovie, useUpdateMovie, useDeleteMovie } from "./hooks";
import type { Movie, CreateMoviePayload, UpdateMoviePayload } from "@/services/quanLyPhim/type";

type ModalMode = 'create' | 'edit' | null;

export const AdminMovies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

    const itemsPerPage = 10;

    const { data: moviesData, isLoading } = useMoviesAdmin({ 
        soTrang: currentPage, 
        soPhanTuTrenTrang: itemsPerPage,
        tenPhim: searchTerm || undefined
    });

    const addMovieMutation = useAddMovie();
    const updateMovieMutation = useUpdateMovie();
    const deleteMovieMutation = useDeleteMovie();

    const handleOpenCreateModal = () => {
        setSelectedMovie(null);
        setModalMode('create');
    };

    const handleOpenEditModal = (movie: Movie) => {
        setSelectedMovie(movie);
        setModalMode('edit');
    };

    const handleCloseModal = () => {
        setModalMode(null);
        setSelectedMovie(null);
    };

    const handleSubmit = async (data: any) => {
        const maNhom = 'GP01';

        if (modalMode === 'create') {
            setSearchTerm('');
            const payload: CreateMoviePayload = {
                tenPhim: data.tenPhim,
                trailer: data.trailer || '',
                moTa: data.moTa,
                ngayKhoiChieu: data.ngayKhoiChieu,
                sapChieu: data.sapChieu,
                dangChieu: data.dangChieu,
                hot: data.hot,
                danhGia: data.danhGia,
                maNhom,
                hinhAnh: data.hinhAnh,
            };
            
            await addMovieMutation.mutateAsync(payload);
            handleCloseModal();
        } else if (modalMode === 'edit' && data.maPhim) {
            const payload: UpdateMoviePayload = {
                maPhim: data.maPhim,
                tenPhim: data.tenPhim,
                trailer: data.trailer || '',
                moTa: data.moTa,
                ngayKhoiChieu: data.ngayKhoiChieu,
                sapChieu: data.sapChieu,
                dangChieu: data.dangChieu,
                hot: data.hot,
                danhGia: data.danhGia,
                maNhom,
                hinhAnh: data.hinhAnh,
            };
            
            await updateMovieMutation.mutateAsync(payload);
            handleCloseModal();
        }
    };

    const handleOpenDeleteDialog = (movie: Movie) => {
        setMovieToDelete(movie);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (movieToDelete) {
            await deleteMovieMutation.mutateAsync(movieToDelete.maPhim);
            setDeleteDialogOpen(false);
            setMovieToDelete(null);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const movies = moviesData?.items || [];
    const totalCount = moviesData?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const isSubmitting = addMovieMutation.isPending || updateMovieMutation.isPending;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-linear-to-r from-blue-50 to-cyan-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">
                        Quản lý Phim
                    </h1>
                    <p className="text-sm text-gray-600">Quản lý danh sách phim và thông tin chi tiết</p>
                </div>
                <Button
                    onClick={handleOpenCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Thêm phim
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Tìm kiếm theo tên phim..."
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className="pl-10 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg"
                        />
                    </div>
                    <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 shadow-sm hover:shadow-md transition-all duration-200">
                        Tìm kiếm
                    </Button>
                    {searchTerm && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setSearchTerm('');
                                setCurrentPage(1);
                            }}
                            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </form>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <MovieTable
                    movies={movies}
                    isLoading={isLoading}
                    onEdit={handleOpenEditModal}
                    onDelete={handleOpenDeleteDialog}
                />
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 py-4 bg-white rounded-xl shadow-md border border-gray-200 p-4">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                    >
                        ««
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                    >
                        ‹
                    </Button>
                    
                    <div className="flex gap-1.5">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                                <Button
                                    key={pageNum}
                                    variant={currentPage === pageNum ? "default" : "outline"}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-4 py-1.5 min-w-10 font-medium transition-all duration-200 ${
                                        currentPage === pageNum 
                                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md scale-105' 
                                            : 'hover:bg-gray-100'
                                    }`}
                                >
                                    {pageNum}
                                </Button>
                            );
                        })}
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                    >
                        ›
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                    >
                        »»
                    </Button>
                </div>
            )}

            {modalMode && (
                <>
                    <div className="fixed inset-0 bg-black/40 z-40" onClick={handleCloseModal}></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border border-gray-200 pointer-events-auto">
                            <div className="sticky top-0 bg-linear-to-r from-blue-600 to-cyan-600 text-white px-6 py-5 flex items-center justify-between rounded-t-2xl">
                                <h2 className="text-xl font-bold">
                                    {modalMode === 'create' ? '✨ Thêm Phim Mới' : '✏️ Chỉnh Sửa Phim'}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6">
                                <MovieForm
                                    movie={selectedMovie}
                                    onSubmit={handleSubmit}
                                    onCancel={handleCloseModal}
                                    isSubmitting={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Delete Confirmation Dialog */}
            {deleteDialogOpen && (
                <>
                    <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setDeleteDialogOpen(false)}></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 mx-4 animate-in zoom-in-95 duration-200 border border-gray-200 pointer-events-auto">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Xác nhận xóa phim</h3>
                            <p className="text-gray-600 text-center mb-6">
                                Bạn có chắc chắn muốn xóa phim <span className="font-semibold text-gray-900">"{movieToDelete?.tenPhim}"</span>? 
                                <br/>
                                <span className="text-red-600 text-sm">Hành động này không thể hoàn tác.</span>
                            </p>
                            <div className="flex items-center justify-end gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setDeleteDialogOpen(false)}
                                    disabled={deleteMovieMutation.isPending}
                                    className="px-5 hover:bg-gray-100 transition-colors"
                                >
                                    Hủy
                                </Button>
                                <Button
                                    onClick={handleConfirmDelete}
                                    disabled={deleteMovieMutation.isPending}
                                    className="bg-red-600 hover:bg-red-700 px-5 shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                    {deleteMovieMutation.isPending ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Đang xóa...
                                        </span>
                                    ) : 'Xóa phim'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
