type DayFilterProps = {
    selectedDay: string;
    onSelectDay: (day: string) => void;
};

const DAY_OPTIONS = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Thứ 2', value: 'monday' },
    { label: 'Thứ 3', value: 'tuesday' },
    { label: 'Thứ 4', value: 'wednesday' },
    { label: 'Thứ 5', value: 'thursday' },
    { label: 'Thứ 6', value: 'friday' },
    { label: 'Thứ 7', value: 'saturday' },
    { label: 'Chủ nhật', value: 'sunday' },
];

export const DayFilter = ({ selectedDay, onSelectDay }: DayFilterProps) => {
    return (
        <div className="flex gap-2 mb-6 flex-wrap">
            {DAY_OPTIONS.map((day) => (
                <button
                    key={day.value}
                    onClick={() => onSelectDay(day.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedDay === day.value
                            ? 'bg-cyan-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {day.label}
                </button>
            ))}
        </div>
    );
};

// DayFilter: Component filter lịch chiếu theo ngày trong tuần
// - 8 buttons: Tất cả + 7 ngày trong tuần
// - Active state với bg-cyan-600
// - onClick → callback onSelectDay
