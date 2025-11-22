const newsData = [
  {
    id: 1,
    title: "Dune: Part Two - Bom tấn khoa học viễn tưởng đáng mong đợi nhất 2025",
    description:
      "Phần tiếp theo của Dune hứa hẹn mang đến những khung hình hoành tráng và câu chuyện sâu sắc hơn về hành tinh sa mạc Arrakis.",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
    date: "2025-11-15",
    category: "Phim Mới",
  },
  {
    id: 2,
    title: "Khai trương chi nhánh Bịp Cinema Thủ Đức",
    description:
      "Chi nhánh mới nhất của chúng tôi tại TP. Thủ Đức chính thức đi vào hoạt động với hệ thống âm thanh Dolby Atmos và 8 phòng chiếu hiện đại.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    date: "2025-11-10",
    category: "Chi Nhánh Mới",
  },
  {
    id: 3,
    title: "Ưu đãi cuối tháng - Giảm 30% cho thẻ thành viên",
    description:
      "Mua vé xem phim và nhận ngay ưu đãi giảm giá 30% khi đăng ký thẻ thành viên VIP. Áp dụng đến hết tháng 11.",
    image:
      "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800&q=80",
    date: "2025-11-20",
    category: "Ưu Đãi",
  },
  {
    id: 4,
    title: "Avatar 3 - James Cameron hé lộ những hình ảnh đầu tiên",
    description:
      "Đạo diễn James Cameron vừa công bố teaser đầu tiên của Avatar 3 với những cảnh quay dưới nước tuyệt đẹp và công nghệ CGI đột phá.",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    date: "2025-11-18",
    category: "Phim Mới",
  },
  {
    id: 5,
    title: "Combo bắp nước siêu ưu đãi chỉ 99K",
    description:
      "Thưởng thức bộ đôi bắp rang bơ size L và nước ngọt size L chỉ với 99K. Chương trình áp dụng từ thứ 2 đến thứ 5 hàng tuần.",
    image:
      "https://images.unsplash.com/photo-1585647347384-2593bc35786b?w=800&q=80",
    date: "2025-11-22",
    category: "Ưu Đãi",
  },
  {
    id: 6,
    title: "Bịp Cinema Landmark 81 ra mắt phòng chiếu IMAX",
    description:
      "Trải nghiệm điện ảnh đỉnh cao với công nghệ IMAX mới nhất tại chi nhánh Landmark 81. Đặt vé ngay hôm nay!",
    image:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80",
    date: "2025-11-12",
    category: "Chi Nhánh Mới",
  },
  {
    id: 7,
    title: "Joker: Folie à Deux - Joaquin Phoenix trở lại vai diễn kinh điển",
    description:
      "Sau thành công vang dội của Joker 2019, phần 2 hứa hẹn sẽ khám phá sâu hơn về tâm lý và mối quan hệ của Joker với Harley Quinn.",
    image:
      "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&q=80",
    date: "2025-11-08",
    category: "Phim Mới",
  },
];

export const NewsPage = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Phim Mới":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Chi Nhánh Mới":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Ưu Đãi":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tin Tức & Sự Kiện
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Cập nhật những tin tức mới nhất về phim ảnh và các chương trình ưu đãi
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news) => (
            <article
              key={news.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                      news.category
                    )}`}
                  >
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{formatDate(news.date)}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {news.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                  {news.description}
                </p>

                <button className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-2 group">
                  Xem chi tiết
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <div className="h-px w-16 bg-gray-300 dark:bg-gray-700"></div>
            <span className="text-sm">Hết danh sách tin tức</span>
            <div className="h-px w-16 bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
