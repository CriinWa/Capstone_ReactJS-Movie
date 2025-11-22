const features = [
  {
    icon: "🎬",
    title: "Đặt Vé Nhanh Chóng",
    description: "Đặt vé chỉ với vài thao tác đơn giản, tiết kiệm thời gian xếp hàng",
  },
  {
    icon: "💳",
    title: "Thanh Toán Đa Dạng",
    description: "Hỗ trợ nhiều phương thức thanh toán: VNPAY, MoMo, ZaloPay, Thẻ ngân hàng",
  },
  {
    icon: "📅",
    title: "Xem Lịch Chiếu",
    description: "Cập nhật lịch chiếu mới nhất của tất cả các rạp trên toàn quốc",
  },
  {
    icon: "⭐",
    title: "Tích Điểm Thành Viên",
    description: "Tích điểm sau mỗi lần đặt vé và đổi quà hấp dẫn",
  },
  {
    icon: "🎁",
    title: "Ưu Đãi Độc Quyền",
    description: "Nhận thông báo về các chương trình khuyến mãi và ưu đãi đặc biệt",
  },
  {
    icon: "🔔",
    title: "Thông Báo Phim Mới",
    description: "Cập nhật ngay khi có phim mới, suất chiếu sớm và sự kiện đặc biệt",
  },
  {
    icon: "🎫",
    title: "Quản Lý Vé Điện Tử",
    description: "Lưu trữ và quản lý vé xem phim điện tử tiện lợi trên ứng dụng",
  },
  {
    icon: "📱",
    title: "Giao Diện Thân Thiện",
    description: "Thiết kế hiện đại, dễ sử dụng với trải nghiệm mượt mà",
  },
];

export const AppPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Ứng Dụng Bịp Cinema
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Trải nghiệm đặt vé xem phim tiện lợi ngay trên điện thoại
          </p>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="flex items-center gap-3 bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <p className="text-xs">Download on the</p>
                <p className="text-lg font-semibold">App Store</p>
              </div>
            </button>

            <button className="flex items-center gap-3 bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <p className="text-xs">GET IT ON</p>
                <p className="text-lg font-semibold">Google Play</p>
              </div>
            </button>
          </div>

          {/* QR Code Section */}
          <div className="inline-block bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <div className="text-center">
                <div className="text-6xl mb-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Rickrolling_QR_code.png" alt="" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  QR Code
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quét mã để tải ứng dụng
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "500K+", label: "Lượt Tải" },
            { number: "4.8⭐", label: "Đánh Giá" },
            { number: "100K+", label: "Người Dùng" },
            { number: "50+", label: "Rạp Phim" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Tính Năng Nổi Bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
