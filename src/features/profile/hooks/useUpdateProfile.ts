import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { quanLyNguoiDungServices } from '@/services/quanLyNguoiDung/quanLyNguoiDungServices';
import type { UpdateProfileRequest, UserProfile } from '@/services/quanLyNguoiDung/type';
import { queryKeys } from '@/constants/queryKey';
import { useAppDispatch } from '@/store/config';
import { signInActions } from '@/features/signIn/redux/signIn.slice';
import type { AxiosResponse } from 'axios';

type UpdateProfileMutationOptions = Omit<
  UseMutationOptions<AxiosResponse<{ content: UserProfile }>, Error, UpdateProfileRequest>,
  'mutationFn'
>;

/**
 * Custom hook để xử lý mutation cập nhật profile
 * 
 * KIẾN TRÚC & SINGLE RESPONSIBILITY PRINCIPLE (SRP):
 * =====================================================
 * 
 * Hook này tuân theo SRP bằng cách CHỈ LÀM 1 VIỆC:
 * - Cung cấp mutation function với React Query configuration
 * - Xử lý cache invalidation (refetch profile sau khi update)
 * - Cập nhật Redux store với user info mới
 * - Delegate callbacks (onSuccess/onError) về component
 * 
 * KHÔNG LÀM:
 * ❌ Không quyết định UI behavior (toast, modal, navigation)
 * ❌ Không biết về component state (form values, activeTab)
 * ❌ Không hardcode business logic cụ thể
 * 
 * CÁCH SỬ DỤNG TRONG COMPONENT:
 * ===============================
 * 
 * const { mutate: updateProfile, isPending } = useUpdateProfile({
 *   onSuccess: () => {
 *     toast.success('Cập nhật thành công!');
 *     reset(); // Reset form
 *     setActiveTab('info'); // Chuyển tab
 *   },
 *   onError: (error) => {
 *     toast.error(error.message);
 *   },
 * });
 * 
 * @param options - Callbacks và options từ component (onSuccess, onError, etc.)
 * @returns UseMutationResult với mutate function và states (isPending, isError, etc.)
 */
export function useUpdateProfile(options?: UpdateProfileMutationOptions) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    // Mutation function: Gọi API cập nhật profile
    mutationFn: (data: UpdateProfileRequest) => quanLyNguoiDungServices.updateUserProfile(data),
    
    // onSuccess: Chạy khi cập nhật thành công
    onSuccess: (...args) => {
      const [response] = args;
      
      // 1. Invalidate cache để đánh dấu data cũ là stale
      //    Lần tới khi fetch useUserProfile sẽ lấy data mới
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
      
      // 2. Cập nhật Redux store với user info mới
      //    Để Header và các component khác có thể access ngay
      dispatch(signInActions.updateUser(response.data.content));
      
      // 3. Delegate onSuccess callback về component
      //    Component sẽ quyết định: toast, reset form, change tab, etc.
      options?.onSuccess?.(...args);
    },
    
    // onError: Delegate về component để xử lý
    //    Component sẽ quyết định: toast error, log error, etc.
    onError: options?.onError,
    
    // Spread các options khác từ component (nếu có)
    ...options,
  });
}
