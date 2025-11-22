import React from 'react';
import type { UserProfile } from '@/services/quanLyNguoiDung/type';

interface ProfileInfoProps {
  userProfile: UserProfile;
}

/**
 * ProfileInfo - Tab hiển thị thông tin user (read-only)
 * 
 * SRP: Component này chỉ render user info dạng cards
 * - Không có form, không edit được
 * - Hiển thị: Tài khoản, Họ tên, Email, SĐT
 * - Conditional: Hiển thị loại người dùng nếu là QuanTri
 */
export const ProfileInfo: React.FC<ProfileInfoProps> = ({ userProfile }) => {
  const infoItems = [
    { label: 'Tài khoản', value: userProfile?.taiKhoan || 'N/A', icon: '👤' },
    { label: 'Họ tên', value: userProfile?.hoTen || 'N/A', icon: '📝' },
    { label: 'Email', value: userProfile?.email || 'N/A', icon: '✉️' },
    { label: 'Số điện thoại', value: userProfile?.soDT || 'N/A', icon: '📞' },
  ];

  // Chỉ hiển thị loại người dùng nếu là Quản trị
  if (userProfile.maLoaiNguoiDung === 'QuanTri' && userProfile.loaiNguoiDung) {
    infoItems.push({
      label: 'Loại người dùng',
      value: userProfile.loaiNguoiDung.tenLoai,
      icon: '🔑',
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                <p className="text-base font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">💡 Lưu ý:</span> Để cập nhật thông tin, vui lòng chọn tab "Cập nhật thông tin"
        </p>
      </div>
    </div>
  );
};
