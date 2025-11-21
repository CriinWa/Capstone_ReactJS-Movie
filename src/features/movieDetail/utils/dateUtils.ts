/**
 * Format ngày giờ từ ISO string sang định dạng Việt Nam
 * VD: "2025-04-12T03:03:03" → "12/04 03:03"
 */
export const formatScheduleDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month} ${hours}:${minutes}`;
};

/**
 * Format ngày khởi chiếu
 * VD: "2024-08-26T15:11:29.533" → "26/08/2024"
 */
export const formatReleaseDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
};

/**
 * Lấy ngày trong tuần từ date string
 * VD: "2025-04-12T03:03:03" → 6 (Saturday)
 * 0 = Sunday, 1 = Monday, ..., 6 = Saturday
 */
export const getDayOfWeek = (dateString: string): number => {
    return new Date(dateString).getDay();
};

/**
 * Map ngày trong tuần sang tên filter
 */
export const DAY_FILTER_MAP: Record<string, number> = {
    all: -1, // Tất cả
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
} as const;

/**
 * Format giá vé
 * VD: 200000 → "200.000đ"
 */
export const formatPrice = (price: number): string => {
    return `${price.toLocaleString('vi-VN')}đ`;
};
