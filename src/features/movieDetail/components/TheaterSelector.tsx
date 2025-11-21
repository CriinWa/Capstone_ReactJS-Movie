import type { TheaterSystem } from "@/services/quanLyPhim/type";

type TheaterSelectorProps = {
    theaters: TheaterSystem[];
    selectedTheater: string | null;
    onSelectTheater: (maHeThongRap: string) => void;
};

export const TheaterSelector = ({ theaters, selectedTheater, onSelectTheater }: TheaterSelectorProps) => {
    return (
        <div className="w-1/3">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Hệ thống rạp
            </h3>
            <div className="space-y-2">
                {theaters.map((theater) => (
                    <div
                        key={theater.maHeThongRap}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedTheater === theater.maHeThongRap
                                ? 'bg-cyan-50 border-cyan-500 shadow-md'
                                : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                        onClick={() => onSelectTheater(theater.maHeThongRap)}
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={theater.logo}
                                alt={theater.tenHeThongRap}
                                className="w-14 h-14 object-contain"
                            />
                            <span className="font-medium text-gray-800">
                                {theater.tenHeThongRap}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// TheaterSelector: Component sidebar chọn hệ thống rạp
// - Hiển thị danh sách hệ thống rạp (CGV, BHD, Galaxy, etc.)
// - Highlight hệ thống rạp đang được chọn
// - onClick → callback onSelectTheater để parent component xử lý
