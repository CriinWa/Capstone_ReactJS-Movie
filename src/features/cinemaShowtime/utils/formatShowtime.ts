/**
 * Format datetime string thành giờ hiển thị
 * @param datetime - "2025-07-27T22:21:00"
 * @returns "10:21 PM"
 */
export function formatShowtime(datetime: string): string {
  const date = new Date(datetime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  
  return `${displayHours}:${displayMinutes} ${ampm}`;
}

/**
 * Format date thành dạng hiển thị
 * @param datetime - "2025-07-27T22:21:00"
 * @returns "Hôm nay", "Ngày mai", "T2, 27/07" hoặc "27/07/2025"
 */
export function formatDate(datetime: string): string {
  const date = new Date(datetime);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Reset time to compare dates only
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  
  if (dateOnly.getTime() === todayOnly.getTime()) {
    return 'Hôm nay';
  }
  
  if (dateOnly.getTime() === tomorrowOnly.getTime()) {
    return 'Ngày mai';
  }
  
  // Thứ trong tuần
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const dayOfWeek = days[date.getDay()];
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  
  // Nếu trong tuần này (7 ngày tới), hiển thị "T2, 27/07"
  const daysDiff = Math.floor((dateOnly.getTime() - todayOnly.getTime()) / (1000 * 60 * 60 * 24));
  if (daysDiff >= 0 && daysDiff <= 7) {
    return `${dayOfWeek}, ${day}/${month}`;
  }
  
  // Nếu xa hơn, hiển thị "27/07/2025"
  return `${day}/${month}/${date.getFullYear()}`;
}

/**
 * Kiểm tra suất chiếu đã qua chưa
 * @param datetime - "2025-07-27T22:21:00"
 * @returns true nếu đã qua giờ chiếu
 */
export function isPastShowtime(datetime: string): boolean {
  return new Date(datetime) < new Date();
}
