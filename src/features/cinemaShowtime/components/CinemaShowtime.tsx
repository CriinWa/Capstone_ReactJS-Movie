import React, { useState, useEffect } from 'react';
import { useQueryCinemaSystems, useQueryCinemaShowtime } from '../hooks';
import { CinemaSystemList } from './CinemaSystemList';
import { TheaterClusterList } from './TheaterClusterList';
import { MovieShowtimeList } from './MovieShowtimeList';

/**
 * CinemaShowtime - Main Container cho tính năng lịch chiếu
 * 
 * SRP: Component này orchestrate tất cả sub-components
 * - Quản lý state: selectedSystem, selectedCluster
 * - Fetch data: systems & showtime
 * - Layout: Grid 3 cột (Systems | Clusters | Movies)
 * - Loading & Error states
 * 
 * Data flow:
 * 1. Mount → Fetch systems
 * 2. Set default system (đầu tiên)
 * 3. Fetch showtime theo system
 * 4. Set default cluster (đầu tiên)
 * 5. Hiển thị movies của cluster
 */
export const CinemaShowtime: React.FC = () => {
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);

  // Fetch hệ thống rạp
  const { 
    data: cinemaSystems, 
    isLoading: isLoadingSystems,
    error: systemsError 
  } = useQueryCinemaSystems();

  // Fetch lịch chiếu theo hệ thống đã chọn
  const { 
    data: showtime, 
    isLoading: isLoadingShowtime,
    error: showtimeError 
  } = useQueryCinemaShowtime(selectedSystemId);

  // Set default hệ thống rạp khi data về
  useEffect(() => {
    if (cinemaSystems && cinemaSystems.length > 0 && !selectedSystemId) {
      setSelectedSystemId(cinemaSystems[0].maHeThongRap);
    }
  }, [cinemaSystems, selectedSystemId]);

  // Set default cụm rạp khi showtime về
  useEffect(() => {
    if (showtime && showtime.lstCumRap.length > 0) {
      setSelectedClusterId(showtime.lstCumRap[0].maCumRap);
    }
  }, [showtime]);

  // Handler khi chọn hệ thống rạp khác
  const handleSystemSelect = (systemId: string) => {
    setSelectedSystemId(systemId);
    setSelectedClusterId(null); // Reset cluster khi đổi system
  };

  // Handler khi chọn cụm rạp
  const handleClusterSelect = (clusterId: string) => {
    setSelectedClusterId(clusterId);
    // Scroll to top của movie list
    document.getElementById('movie-list-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' 
    });
  };

  // Get selected cluster data
  const selectedCluster = showtime?.lstCumRap.find(
    cluster => cluster.maCumRap === selectedClusterId
  );

  return (
    <section className="px-4 py-8">
      {/* Section Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Lịch chiếu theo rạp
        </h2>
        <p className="text-sm text-gray-600">
          Chọn hệ thống rạp và cụm rạp để xem lịch chiếu
        </p>
      </div>

      {/* Loading state - Systems */}
      {isLoadingSystems && (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
            <p className="text-gray-600">Đang tải hệ thống rạp...</p>
          </div>
        </div>
      )}

      {/* Error state - Systems */}
      {systemsError && (
        <div className="text-center py-12">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-gray-700 mb-4">Không thể tải danh sách rạp</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Main Content */}
      {cinemaSystems && cinemaSystems.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Column 1: Cinema Systems (2 cols) */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Hệ thống rạp</h3>
              <CinemaSystemList
                systems={cinemaSystems}
                selectedSystemId={selectedSystemId}
                onSystemSelect={handleSystemSelect}
              />
            </div>
          </div>

          {/* Column 2: Theater Clusters (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Cụm rạp</h3>
              
              {/* Loading showtime */}
              {isLoadingShowtime && (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
                </div>
              )}

              {/* Error showtime */}
              {showtimeError && (
                <div className="text-center py-8">
                  <p className="text-red-600 mb-3">Không thể tải lịch chiếu</p>
                  <button
                    onClick={() => setSelectedSystemId(selectedSystemId)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Thử lại
                  </button>
                </div>
              )}

              {/* Cluster list */}
              {showtime && (
                <TheaterClusterList
                  clusters={showtime.lstCumRap}
                  selectedClusterId={selectedClusterId}
                  onClusterSelect={handleClusterSelect}
                />
              )}
            </div>
          </div>

          {/* Column 3: Movies & Showtimes (7 cols) */}
          <div className="lg:col-span-7" id="movie-list-section">
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 truncate">
                {selectedCluster ? selectedCluster.tenCumRap : 'Danh sách phim'}
              </h3>

              {/* Loading */}
              {isLoadingShowtime && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
                </div>
              )}

              {/* Movie list */}
              {selectedCluster && (
                <div className="h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <MovieShowtimeList
                    movies={selectedCluster.danhSachPhim}
                    clusterName={selectedCluster.tenCumRap}
                  />
                </div>
              )}

              {/* No cluster selected */}
              {!selectedCluster && !isLoadingShowtime && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-5xl mb-3">👈</div>
                  <p className="text-gray-600">Vui lòng chọn cụm rạp</p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </section>
  );
};
