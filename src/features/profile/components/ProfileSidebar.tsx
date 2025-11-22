import React from 'react';

export type ProfileTab = 'info' | 'update' | 'history';

interface ProfileSidebarProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

/**
 * ProfileSidebar - Menu navigation cho profile page
 * 
 * SRP: Component này chỉ render sidebar menu
 * - 3 menu items: Thông tin, Cập nhật, Lịch sử
 * - Active state styling
 * - onClick → delegate về parent (ProfilePage)
 */
export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'info' as ProfileTab, label: 'Thông tin cá nhân', icon: '👤' },
    { id: 'update' as ProfileTab, label: 'Cập nhật thông tin', icon: '✏️' },
    { id: 'history' as ProfileTab, label: 'Lịch sử đặt vé', icon: '🎟️' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Tài khoản</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`
              w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200
              flex items-center gap-3
              ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
