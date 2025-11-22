import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui/input';
import type { Movie } from '@/services/quanLyPhim/type';
import { useEffect, useState } from 'react';

const movieSchema = z.object({
    tenPhim: z.string().min(1, 'Tên phim không được để trống'),
    trailer: z.string().optional(),
    moTa: z.string().min(1, 'Mô tả không được để trống'),
    ngayKhoiChieu: z.string().min(1, 'Ngày khởi chiếu không được để trống'),
    danhGia: z.number().min(0).max(5, 'Đánh giá từ 0-5'),
    hot: z.boolean(),
    dangChieu: z.boolean(),
    sapChieu: z.boolean(),
});

type MovieFormData = z.infer<typeof movieSchema>;

interface MovieFormProps {
    movie?: Movie | null;
    onSubmit: (data: MovieFormData & { hinhAnh?: File; maPhim?: number }) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
}

export const MovieForm = ({ movie, onSubmit, onCancel, isSubmitting }: MovieFormProps) => {
    const [previewImage, setPreviewImage] = useState<string>(movie?.hinhAnh || '');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
        defaultValues: movie ? {
            tenPhim: movie.tenPhim,
            trailer: movie.trailer || '',
            moTa: movie.moTa,
            ngayKhoiChieu: movie.ngayKhoiChieu.split('T')[0],
            danhGia: movie.danhGia,
            hot: movie.hot,
            dangChieu: movie.dangChieu,
            sapChieu: movie.sapChieu,
        } : {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            danhGia: 0,
            hot: false,
            dangChieu: false,
            sapChieu: false,
        },
    });

    useEffect(() => {
        if (movie) {
            reset({
                tenPhim: movie.tenPhim,
                trailer: movie.trailer || '',
                moTa: movie.moTa,
                ngayKhoiChieu: movie.ngayKhoiChieu.split('T')[0],
                danhGia: movie.danhGia,
                hot: movie.hot,
                dangChieu: movie.dangChieu,
                sapChieu: movie.sapChieu,
            });
            setPreviewImage(movie.hinhAnh);
        }
    }, [movie, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onFormSubmit = (data: MovieFormData) => {
        onSubmit({
            ...data,
            hinhAnh: selectedFile || undefined,
            maPhim: movie?.maPhim,
        });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên phim <span className="text-red-500">*</span>
                        </label>
                        <Input {...register('tenPhim')} placeholder="Nhập tên phim" />
                        {errors.tenPhim && (
                            <p className="mt-1 text-sm text-red-600">{errors.tenPhim.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trailer (URL)
                        </label>
                        <Input {...register('trailer')} placeholder="https://youtube.com/..." />
                        {errors.trailer && (
                            <p className="mt-1 text-sm text-red-600">{errors.trailer.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ngày khởi chiếu <span className="text-red-500">*</span>
                        </label>
                        <Input type="date" {...register('ngayKhoiChieu')} />
                        {errors.ngayKhoiChieu && (
                            <p className="mt-1 text-sm text-red-600">{errors.ngayKhoiChieu.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Đánh giá (0-10) <span className="text-red-500">*</span>
                        </label>
                        <Input 
                            type="number" 
                            step="0.1"
                            min="0"
                            max="10"
                            {...register('danhGia', { valueAsNumber: true })} 
                            placeholder="0-10" 
                        />
                        {errors.danhGia && (
                            <p className="mt-1 text-sm text-red-600">{errors.danhGia.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mô tả <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register('moTa')}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Nhập mô tả phim..."
                        />
                        {errors.moTa && (
                            <p className="mt-1 text-sm text-red-600">{errors.moTa.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hình ảnh
                        </label>
                        <div className="space-y-3">
                            {previewImage && (
                                <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                                    <img 
                                        src={previewImage} 
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://placehold.co/300x400?text=No+Image';
                                        }}
                                    />
                                </div>
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <p className="text-xs text-gray-500">
                                {movie ? 'Chọn ảnh mới để thay thế (không bắt buộc)' : 'Chọn file ảnh cho phim'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Trạng thái
                        </label>
                        
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register('hot')}
                                className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                            />
                            <label className="text-sm text-gray-700">Hot</label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register('dangChieu')}
                                className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                            />
                            <label className="text-sm text-gray-700">Đang chiếu</label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register('sapChieu')}
                                className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                            />
                            <label className="text-sm text-gray-700">Sắp chiếu</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Hủy
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-cyan-600 hover:bg-cyan-700"
                >
                    {isSubmitting ? 'Đang xử lý...' : movie ? 'Cập nhật' : 'Thêm mới'}
                </Button>
            </div>
        </form>
    );
};
