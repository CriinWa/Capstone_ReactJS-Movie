import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { quanLyDatVeServices } from '@/services/quanLyDatVe/quanLyDatVeServices';
import type { BookingRequest } from '@/services/quanLyDatVe/type';
import { queryKeys } from '@/constants/queryKey';
import type { AxiosResponse } from 'axios';

/**
 * Custom hook để xử lý mutation đặt vé
 * 
 * KIẾN TRÚC & SINGLE RESPONSIBILITY PRINCIPLE (SRP):
 * =====================================================
 * 
 * Hook này tuân theo SRP bằng cách CHỈ LÀM 1 VIỆC:
 * - Cung cấp mutation function với React Query configuration
 * - Xử lý cache invalidation (refetch data sau khi đặt vé)
 * - Delegate callbacks (onSuccess/onError) về component
 * 
 * KHÔNG LÀM:
 * ❌ Không quyết định UI behavior (toast, modal, navigation)
 * ❌ Không biết về component state (selectedSeats, isModalOpen)
 * ❌ Không điều khiển navigation (navigate)
 * ❌ Không hardcode business logic cụ thể
 * 
 * LÝ DO THIẾT KẾ NÀY:
 * =====================
 * 
 * 1. SEPARATION OF CONCERNS (Tách biệt trách nhiệm):
 *    ┌─────────────────────────────────────────┐
 *    │ Component (BookingPage.tsx)             │
 *    │ - UI logic (toast, modal, navigate)     │ ← onSuccess/onError callbacks
 *    │ - Component state management            │
 *    └──────────────┬──────────────────────────┘
 *                   │ uses
 *                   ▼
 *    ┌─────────────────────────────────────────┐
 *    │ Hook (useBookingMutation.ts)            │
 *    │ - React Query config                    │ ← YOU ARE HERE
 *    │ - Cache invalidation                    │
 *    └──────────────┬──────────────────────────┘
 *                   │ uses
 *                   ▼
 *    ┌─────────────────────────────────────────┐
 *    │ Service (quanLyDatVeServices.ts)        │
 *    │ - HTTP requests                         │
 *    └─────────────────────────────────────────┘
 * 
 * 2. REUSABILITY (Tái sử dụng):
 *    Hook này có thể dùng cho nhiều use cases khác nhau:
 *    
 *    const mutation1 = useBookingMutation(id, {
 *      onSuccess: () => navigate('/success')
 *    });
 *    
 *    const mutation2 = useBookingMutation(id, {
 *      onSuccess: () => showConfetti()
 *    });
 * 
 * 3. TESTABILITY (Dễ test):
 *    Component có thể mock hook này dễ dàng:
 *    
 *    const mockMutation = { mutate: jest.fn(), isPending: false };
 *    // Test component behavior độc lập
 * 
 * 4. FLEXIBILITY (Linh hoạt):
 *    Component quyết định làm gì với kết quả mutation
 *    Hook không ép buộc bất kỳ behavior nào
 * 
 * CÁCH SỬ DỤNG TRONG COMPONENT:
 * ===============================
 * 
 * const { mutate: bookTickets, isPending } = useBookingMutation(maLichChieu, {
 *   onSuccess: async () => {
 *     await refetch();                  // Component quyết định refetch
 *     toast.success('Đặt vé thành công!');  // Component quyết định toast
 *     navigate(PATH.MOVIE_DETAIL_BY_ID(id)); // Component quyết định navigate
 *   },
 *   onError: async (error) => {
 *     toast.error(error.message);       // Component quyết định error handling
 *     setIsModalOpen(false);            // Component quản lý modal state
 *     await refetch();
 *     clearSelection();                 // Component quản lý selection state
 *   },
 * });
 * 
 * @param maLichChieu - Mã lịch chiếu để invalidate cache
 * @param options - Callbacks và options từ component (onSuccess, onError, etc.)
 * @returns UseMutationResult với mutate function và states (isPending, isError, etc.)
 */

type BookingMutationOptions = Omit<
  UseMutationOptions<AxiosResponse<{ content: string }>, Error, BookingRequest>,
  'mutationFn'
>;

export function useBookingMutation(maLichChieu: string, options?: BookingMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    // Mutation function: Gọi API đặt vé
    mutationFn: (data: BookingRequest) => quanLyDatVeServices.bookTickets(data),
    
    // onSuccess: Chạy khi đặt vé thành công
    onSuccess: (...args) => {
      // 1. Invalidate booking seats cache để đánh dấu data cũ là stale
      //    Lần tới khi fetch useBookingSeats sẽ lấy data mới (ghế đã đặt)
      queryClient.invalidateQueries({ queryKey: queryKeys.booking.detail(maLichChieu) });
      
      // 2. Invalidate user profile cache để booking history cập nhật ngay
      //    Fix bug: Booking history không cập nhật sau khi đặt vé thành công
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
      
      // 3. Delegate onSuccess callback về component
      //    Component sẽ quyết định: toast, navigate, refetch, etc.
      //    Spread args để pass đầy đủ (data, variables, context)
      options?.onSuccess?.(...args);
    },
    
    // onError: Delegate về component để xử lý
    //    Component sẽ quyết định: toast error, close modal, refetch, clear selection
    onError: options?.onError,
    
    // Spread các options khác từ component (nếu có)
    ...options,
  });
}
