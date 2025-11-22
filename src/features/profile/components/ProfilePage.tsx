import React, { useState } from 'react';
import { useUserProfile } from '../hooks';
import { ProfileSidebar, type ProfileTab } from './ProfileSidebar';
import { ProfileInfo } from './ProfileInfo';
import { ProfileUpdate } from './ProfileUpdate';
import { BookingHistory } from './BookingHistory';

/**
 * ProfilePage - Main container cho trang profile
 * 
 * SRP: Component này quản lý layout và tab navigation
 * - Fetch user profile với useUserProfile
 * - State: activeTab
 * - Render: Sidebar + Content (based on activeTab)
 * - Loading/Error states
 */
export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('info');
  const { data, isLoading, error } = useUserProfile();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Không thể tải thông tin tài khoản</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  const userProfile = data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Tài khoản của tôi</h1>
          <p className="text-gray-600 mt-1">Quản lý thông tin và lịch sử đặt vé</p>
        </div>

        {/* Main Layout: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - 1 column on desktop */}
          <div className="lg:col-span-1">
            <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Content Area - 3 columns on desktop */}
          <div className="lg:col-span-3">
            {activeTab === 'info' && <ProfileInfo userProfile={userProfile} />}
            
            {activeTab === 'update' && (
              <ProfileUpdate
                userProfile={userProfile}
                onUpdateSuccess={() => setActiveTab('info')}
              />
            )}
            
            {activeTab === 'history' && (
              <BookingHistory bookings={userProfile?.thongTinDatVe || []} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
