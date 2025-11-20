import { PATH } from "@/constants/paths";
import { useNavigate } from "react-router-dom";
import { useDropdown, useLogout } from "@/hooks";

type UserDropdownProps = {
  user: {
    hoTen: string;
    email: string;
    maLoaiNguoiDung: 'QuanTri' | 'KhachHang';
    maNhom: string;
  };
};

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { isOpen, toggle, close, dropdownRef } = useDropdown();

  const handleProfileClick = () => {
    navigate(PATH.PROFILE);
    close();
  };

  const handleLogoutClick = () => {
    logout();
    close();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-2 text-sm bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
          {user.hoTen?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span className="font-medium text-gray-900 dark:text-white">
          {user.hoTen}
        </span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 dark:bg-gray-700">
          <button
            onClick={handleProfileClick}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </div>
          </button>
          <hr className="my-1 border-gray-200 dark:border-gray-600" />
          <button
            onClick={handleLogoutClick}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
