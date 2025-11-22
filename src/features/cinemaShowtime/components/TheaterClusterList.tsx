import React from 'react';
import type { TheaterCluster } from '@/services/quanLyRap/type';
import { TheaterClusterItem } from './TheaterClusterItem';

interface TheaterClusterListProps {
  clusters: TheaterCluster[];
  selectedClusterId: string | null;
  onClusterSelect: (clusterId: string) => void;
}

/**
 * TheaterClusterList - Danh sách cụm rạp (cột giữa)
 * 
 * SRP: Component này quản lý danh sách cụm rạp
 * - Map qua lstCumRap → TheaterClusterItem
 * - Truyền active state và onClick handler
 * - Scroll container
 * 
 * @example
 * <TheaterClusterList 
 *   clusters={showtime.lstCumRap}
 *   selectedClusterId={selectedCluster}
 *   onClusterSelect={setSelectedCluster}
 * />
 */
export const TheaterClusterList: React.FC<TheaterClusterListProps> = ({
  clusters,
  selectedClusterId,
  onClusterSelect,
}) => {
  if (clusters.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không có cụm rạp nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {clusters.map((cluster) => (
        <TheaterClusterItem
          key={cluster.maCumRap}
          tenCumRap={cluster.tenCumRap}
          diaChi={cluster.diaChi}
          isActive={selectedClusterId === cluster.maCumRap}
          onClick={() => onClusterSelect(cluster.maCumRap)}
        />
      ))}
    </div>
  );
};
