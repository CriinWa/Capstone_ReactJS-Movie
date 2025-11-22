import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { profileUpdateSchema, type ProfileUpdateFormValues } from '../schema/profileUpdate.schema';
import { useUpdateProfile } from '../hooks';
import type { UserProfile } from '@/services/quanLyNguoiDung/type';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';

interface ProfileUpdateProps {
  userProfile: UserProfile;
  onUpdateSuccess?: () => void;
}

/**
 * ProfileUpdate - Form cập nhật thông tin user
 * 
 * SRP: Component này chỉ render form và xử lý submit
 * - React Hook Form + Zod validation
 * - Fields: hoTen, email, soDt, matKhauCu, matKhauMoi
 * - Submit → useUpdateProfile mutation
 * - Toast notification
 */
export const ProfileUpdate: React.FC<ProfileUpdateProps> = ({ userProfile, onUpdateSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileUpdateFormValues>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      hoTen: userProfile?.hoTen || '',
      email: userProfile?.email || '',
      soDt: userProfile?.soDT || '',
      matKhauCu: '',
      matKhauMoi: '',
    },
  });

  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => {
      toast.success('Cập nhật thông tin thành công!');
      reset({
        hoTen: userProfile?.hoTen || '',
        email: userProfile?.email || '',
        soDt: userProfile?.soDT || '',
        matKhauCu: '',
        matKhauMoi: '',
      });
      onUpdateSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Cập nhật thất bại. Vui lòng thử lại.');
    },
  });

  // Reset form khi userProfile thay đổi (sau khi refetch)
  useEffect(() => {
    if (userProfile) {
      reset({
        hoTen: userProfile.hoTen || '',
        email: userProfile.email || '',
        soDt: userProfile.soDT || '',
        matKhauCu: '',
        matKhauMoi: '',
      });
    }
  }, [userProfile, reset]);

  const onSubmit = (data: ProfileUpdateFormValues) => {
    // Chuẩn bị payload theo format API
    const updateData = {
      taiKhoan: userProfile.taiKhoan,
      matKhau: data.matKhauMoi || data.matKhauCu, // Nếu có mật khẩu mới thì dùng, không thì giữ nguyên
      email: data.email,
      soDt: data.soDt,
      maNhom: userProfile.maNhom,
      maLoaiNguoiDung: userProfile.maLoaiNguoiDung,
      hoTen: data.hoTen,
    };

    updateProfile(updateData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Cập nhật thông tin</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Họ tên */}
        <div>
          <label htmlFor="hoTen" className="block text-sm font-medium text-gray-700 mb-2">
            Họ tên <span className="text-red-500">*</span>
          </label>
          <Input
            id="hoTen"
            {...register('hoTen')}
            placeholder="Nhập họ tên"
            className={errors.hoTen ? 'border-red-500' : ''}
          />
          {errors.hoTen && (
            <p className="mt-1 text-sm text-red-600">{errors.hoTen.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Nhập email"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Số điện thoại */}
        <div>
          <label htmlFor="soDt" className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <Input
            id="soDt"
            {...register('soDt')}
            placeholder="Nhập số điện thoại (10 chữ số)"
            className={errors.soDt ? 'border-red-500' : ''}
          />
          {errors.soDt && (
            <p className="mt-1 text-sm text-red-600">{errors.soDt.message}</p>
          )}
        </div>

        <div className="border-t pt-5 mt-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Thay đổi mật khẩu</h3>
          
          {/* Mật khẩu hiện tại */}
          <div className="mb-5">
            <label htmlFor="matKhauCu" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu hiện tại <span className="text-red-500">*</span>
            </label>
            <Input
              id="matKhauCu"
              type="password"
              {...register('matKhauCu')}
              placeholder="Nhập mật khẩu hiện tại để xác nhận"
              className={errors.matKhauCu ? 'border-red-500' : ''}
            />
            {errors.matKhauCu && (
              <p className="mt-1 text-sm text-red-600">{errors.matKhauCu.message}</p>
            )}
          </div>

          {/* Mật khẩu mới */}
          <div>
            <label htmlFor="matKhauMoi" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu mới (tùy chọn)
            </label>
            <Input
              id="matKhauMoi"
              type="password"
              {...register('matKhauMoi')}
              placeholder="Nhập mật khẩu mới nếu muốn thay đổi"
              className={errors.matKhauMoi ? 'border-red-500' : ''}
            />
            {errors.matKhauMoi && (
              <p className="mt-1 text-sm text-red-600">{errors.matKhauMoi.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Để trống nếu không muốn thay đổi mật khẩu
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1"
          >
            {isPending ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            disabled={isPending}
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};
