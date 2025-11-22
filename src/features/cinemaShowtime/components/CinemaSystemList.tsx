import React from 'react';
import type { CinemaSystem } from '@/services/quanLyRap/type';
import { CinemaSystemItem } from './CinemaSystemItem';

interface CinemaSystemListProps {
  systems: CinemaSystem[];
  selectedSystemId: string | null;
  onSystemSelect: (systemId: string) => void;
}

/**
 * CinemaSystemList - Danh sách hệ thống rạp (cột trái)
 * 
 * SRP: Component này quản lý vertical tabs hệ thống rạp
 * - Map qua cinemaSystems → CinemaSystemItem
 * - Truyền active state và onClick
 * - Scroll container
 * 
 * @example
 * <CinemaSystemList 
 *   systems={cinemaSystems}
 *   selectedSystemId={selectedSystem}
 *   onSystemSelect={setSelectedSystem}
 * />
 */
export const CinemaSystemList: React.FC<CinemaSystemListProps> = ({
  systems,
  selectedSystemId,
  onSystemSelect,
}) => {
  return (
    <div className="space-y-2">
      {systems.map((system) => (
        <CinemaSystemItem
          key={system.maHeThongRap}
          logo={system.logo}
          tenHeThongRap={system.tenHeThongRap}
          isActive={selectedSystemId === system.maHeThongRap}
          onClick={() => onSystemSelect(system.maHeThongRap)}
        />
      ))}
    </div>
  );
};
