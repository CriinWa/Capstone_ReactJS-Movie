import { z } from 'zod';

/**
 * Zod schema validation cho form cập nhật profile
 * 
 * Validation rules:
 * - hoTen: Tối thiểu 2 ký tự
 * - email: Định dạng email hợp lệ
 * - soDt: Đúng 10 chữ số
 * - matKhauCu: Tối thiểu 6 ký tự (bắt buộc để xác nhận)
 * - matKhauMoi: Tối thiểu 6 ký tự (optional - chỉ nhập khi muốn đổi mật khẩu)
 */
export const profileUpdateSchema = z.object({
  hoTen: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ tên không được quá 50 ký tự'),
  
  email: z
    .string()
    .email('Email không hợp lệ')
    .min(1, 'Email không được để trống'),
  
  soDt: z
    .string()
    .regex(/^[0-9]{10}$/, 'Số điện thoại phải có đúng 10 chữ số'),
  
  matKhauCu: z
    .string()
    .min(1, 'Mật khẩu phải có ít nhất 1 ký tự')
    .min(1, 'Vui lòng nhập mật khẩu hiện tại để xác nhận'),
  
  matKhauMoi: z
    .string()
    .min(3, 'Mật khẩu mới phải có ít nhất 3 ký tự')
    .optional()
    .or(z.literal('')), // Cho phép empty string
});

export type ProfileUpdateFormValues = z.infer<typeof profileUpdateSchema>;
