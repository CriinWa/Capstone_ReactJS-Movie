import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui/input';
import type { User } from '@/services/quanLyNguoiDung/type';

const userSchema = z.object({
    taiKhoan: z.string().min(1, 'Tài khoản không được để trống'),
    matKhau: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    hoTen: z.string().min(1, 'Họ tên không được để trống'),
    email: z.string().email('Email không hợp lệ'),
    soDt: z.string().regex(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số'),
    maLoaiNguoiDung: z.enum(['QuanTri', 'KhachHang']),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
    user: User | null;
    onSubmit: (data: UserFormData) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
}

export const UserForm = ({ user, onSubmit, onCancel, isSubmitting }: UserFormProps) => {
    const isEditMode = !!user;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: user ? {
            taiKhoan: user.taiKhoan,
            matKhau: user.matKhau,
            hoTen: user.hoTen,
            email: user.email,
            soDt: user.soDt,
            maLoaiNguoiDung: user.maLoaiNguoiDung as 'QuanTri' | 'KhachHang',
        } : {
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            email: '',
            soDt: '',
            maLoaiNguoiDung: 'KhachHang',
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Tài khoản */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tài khoản <span className="text-red-500">*</span>
                    </label>
                    <Input
                        {...register('taiKhoan')}
                        placeholder="Nhập tài khoản"
                        disabled={isEditMode}
                        className={`${errors.taiKhoan ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'} ${isEditMode ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                    {errors.taiKhoan && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.taiKhoan.message}</p>
                    )}
                </div>

                {/* Mật khẩu */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <Input
                        {...register('matKhau')}
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className={errors.matKhau ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
                    />
                    {errors.matKhau && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.matKhau.message}</p>
                    )}
                </div>

                {/* Họ tên */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ tên <span className="text-red-500">*</span>
                    </label>
                    <Input
                        {...register('hoTen')}
                        placeholder="Nhập họ tên"
                        className={errors.hoTen ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
                    />
                    {errors.hoTen && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.hoTen.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                        {...register('email')}
                        type="email"
                        placeholder="Nhập email"
                        className={errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
                    )}
                </div>

                {/* Số điện thoại */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <Input
                        {...register('soDt')}
                        placeholder="Nhập số điện thoại"
                        className={errors.soDt ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
                    />
                    {errors.soDt && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.soDt.message}</p>
                    )}
                </div>

                {/* Loại người dùng */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Loại người dùng <span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register('maLoaiNguoiDung')}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.maLoaiNguoiDung 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'
                        }`}
                    >
                        <option value="KhachHang">Khách hàng</option>
                        <option value="QuanTri">Quản trị</option>
                    </select>
                    {errors.maLoaiNguoiDung && (
                        <p className="text-red-500 text-xs mt-1.5">{errors.maLoaiNguoiDung.message}</p>
                    )}
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="px-6 hover:bg-gray-100 transition-colors"
                >
                    Hủy
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-cyan-600 hover:bg-cyan-700 px-6 shadow-md hover:shadow-lg transition-all duration-200"
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {isEditMode ? 'Đang cập nhật...' : 'Đang thêm...'}
                        </span>
                    ) : (
                        isEditMode ? 'Cập nhật' : 'Thêm mới'
                    )}
                </Button>
            </div>
        </form>
    );
};
