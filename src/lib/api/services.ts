import { api } from './client';
import type {
  ApiResponse,
  Appointment,
  Category,
  Direction,
  InternationalReview,
  LabService,
  NewsItem,
  PageResult,
  Review,
  Section,
  UploadAsset,
  VideoReview,
} from './types';

export type DirectionPayload = Partial<
  Pick<
    Direction,
    'name' | 'slug' | 'description' | 'shortDescription' | 'image' | 'order' | 'isActive'
  >
>;
export type ReviewPayload = Partial<Pick<Review, 'text' | 'date' | 'photo' | 'isActive' | 'order'>>;
export type VideoReviewPayload = Partial<
  Pick<VideoReview, 'videoId' | 'title' | 'poster' | 'isActive' | 'order'>
>;
export type InternationalReviewPayload = Partial<
  Pick<
    InternationalReview,
    'name' | 'title' | 'institution' | 'country' | 'quote' | 'photo' | 'isActive' | 'order'
  >
>;
export type NewsPayload = Partial<
  Pick<
    NewsItem,
    | 'slug'
    | 'date'
    | 'image'
    | 'title'
    | 'excerpt'
    | 'body'
    | 'videoId'
    | 'videoTitle'
    | 'isActive'
    | 'order'
  >
>;
export type CategoryPayload = Partial<
  Pick<Category, 'directionId' | 'name' | 'slug' | 'description' | 'order' | 'isActive'>
>;
export type SectionPayload = Partial<
  Pick<
    Section,
    'directionId' | 'categoryId' | 'name' | 'slug' | 'description' | 'order' | 'isActive'
  >
>;
export type ServicePayload = Partial<
  Pick<
    LabService,
    | 'directionId'
    | 'categoryId'
    | 'sectionId'
    | 'code'
    | 'name'
    | 'slug'
    | 'method'
    | 'biomaterial'
    | 'tube'
    | 'duration'
    | 'image'
    | 'description'
    | 'preparation'
    | 'resultFormat'
    | 'isPopular'
    | 'isPackage'
    | 'isActive'
  >
>;

const unwrap = <T>(response: { data: ApiResponse<T> }) => response.data.data;
export const publicApi = {
  catalog: async () =>
    unwrap(
      await api.get<ApiResponse<Array<Direction & { categories: Category[] }>>>('/public/catalog'),
    ),
  services: async (params?: Record<string, unknown>) =>
    unwrap(await api.get<ApiResponse<PageResult<LabService>>>('/public/services', { params })),
  reviews: async () =>
    unwrap(await api.get<ApiResponse<PageResult<Review>>>('/public/reviews')).items,
  videoReviews: async () =>
    unwrap(await api.get<ApiResponse<PageResult<VideoReview>>>('/public/video-reviews')).items,
  internationalReviews: async () =>
    unwrap(
      await api.get<ApiResponse<PageResult<InternationalReview>>>('/public/international-reviews'),
    ).items,
  news: async () => unwrap(await api.get<ApiResponse<PageResult<NewsItem>>>('/public/news')).items,
  newsItem: async (slug: string) =>
    unwrap(await api.get<ApiResponse<NewsItem>>(`/public/news/${encodeURIComponent(slug)}`)),
  appointment: async (payload: {
    fullName: string;
    phone: string;
    message?: string;
    serviceIds?: string[];
  }) => unwrap(await api.post<ApiResponse<Appointment>>('/appointments', payload)),
};
export const authApi = {
  login: async (payload: { email: string; password: string }) =>
    unwrap(
      await api.post<
        ApiResponse<{ accessToken: string; refreshToken: string; admin: { email: string } }>
      >('/auth/login', payload),
    ),
  me: async () => unwrap(await api.get<ApiResponse<{ email: string }>>('/auth/me')),
};
export const adminApi = {
  directions: async (params?: Record<string, unknown>) =>
    unwrap(
      await api.get<ApiResponse<PageResult<Direction>>>('/admin/directions', {
        params,
      }),
    ),
  direction: async (id: string) =>
    unwrap(await api.get<ApiResponse<Direction>>(`/admin/directions/${id}`)),
  createDirection: async (payload: DirectionPayload) =>
    unwrap(await api.post<ApiResponse<Direction>>('/admin/directions', payload)),
  updateDirection: async (id: string, payload: DirectionPayload) =>
    unwrap(await api.patch<ApiResponse<Direction>>(`/admin/directions/${id}`, payload)),
  deleteDirection: async (id: string) =>
    unwrap(await api.delete<ApiResponse<{ id: string }>>(`/admin/directions/${id}`)),
  reviews: async (params?: Record<string, unknown>) =>
    unwrap(await api.get<ApiResponse<PageResult<Review>>>('/admin/reviews', { params })),
  review: async (id: string) => unwrap(await api.get<ApiResponse<Review>>(`/admin/reviews/${id}`)),
  createReview: async (payload: ReviewPayload) =>
    unwrap(await api.post<ApiResponse<Review>>('/admin/reviews', payload)),
  updateReview: async (id: string, payload: ReviewPayload) =>
    unwrap(await api.patch<ApiResponse<Review>>(`/admin/reviews/${id}`, payload)),
  deleteReview: async (id: string) =>
    unwrap(await api.delete<ApiResponse<{ id: string }>>(`/admin/reviews/${id}`)),
  videoReviews: async (params?: Record<string, unknown>) =>
    unwrap(await api.get<ApiResponse<PageResult<VideoReview>>>('/admin/video-reviews', { params })),
  videoReview: async (id: string) =>
    unwrap(await api.get<ApiResponse<VideoReview>>(`/admin/video-reviews/${id}`)),
  createVideoReview: async (payload: VideoReviewPayload) =>
    unwrap(await api.post<ApiResponse<VideoReview>>('/admin/video-reviews', payload)),
  updateVideoReview: async (id: string, payload: VideoReviewPayload) =>
    unwrap(await api.patch<ApiResponse<VideoReview>>(`/admin/video-reviews/${id}`, payload)),
  deleteVideoReview: async (id: string) =>
    unwrap(await api.delete<ApiResponse<{ id: string }>>(`/admin/video-reviews/${id}`)),
  internationalReviews: async (params?: Record<string, unknown>) =>
    unwrap(
      await api.get<ApiResponse<PageResult<InternationalReview>>>('/admin/international-reviews', {
        params,
      }),
    ),
  internationalReview: async (id: string) =>
    unwrap(await api.get<ApiResponse<InternationalReview>>(`/admin/international-reviews/${id}`)),
  createInternationalReview: async (payload: InternationalReviewPayload) =>
    unwrap(await api.post<ApiResponse<InternationalReview>>('/admin/international-reviews', payload)),
  updateInternationalReview: async (id: string, payload: InternationalReviewPayload) =>
    unwrap(
      await api.patch<ApiResponse<InternationalReview>>(
        `/admin/international-reviews/${id}`,
        payload,
      ),
    ),
  deleteInternationalReview: async (id: string) =>
    unwrap(await api.delete<ApiResponse<{ id: string }>>(`/admin/international-reviews/${id}`)),
  news: async (params?: Record<string, unknown>) =>
    unwrap(await api.get<ApiResponse<PageResult<NewsItem>>>('/admin/news', { params })),
  newsItem: async (id: string) =>
    unwrap(await api.get<ApiResponse<NewsItem>>(`/admin/news/${id}`)),
  createNews: async (payload: NewsPayload) =>
    unwrap(await api.post<ApiResponse<NewsItem>>('/admin/news', payload)),
  updateNews: async (id: string, payload: NewsPayload) =>
    unwrap(await api.patch<ApiResponse<NewsItem>>(`/admin/news/${id}`, payload)),
  deleteNews: async (id: string) =>
    unwrap(await api.delete<ApiResponse<{ id: string }>>(`/admin/news/${id}`)),
  category: async (id: string) =>
    unwrap(await api.get<ApiResponse<Category>>(`/admin/categories/${id}`)),
  categories: async (directionId?: string, params?: Record<string, unknown>) =>
    unwrap(
      await api.get<ApiResponse<PageResult<Category>>>('/admin/categories', {
        params: { directionId, limit: 100, ...params },
      }),
    ),
  createCategory: async (payload: CategoryPayload) =>
    unwrap(await api.post<ApiResponse<Category>>('/admin/categories', payload)),
  updateCategory: async (id: string, payload: CategoryPayload) =>
    unwrap(await api.patch<ApiResponse<Category>>(`/admin/categories/${id}`, payload)),
  deleteCategory: async (id: string) =>
    unwrap(await api.delete<ApiResponse<{ id: string }>>(`/admin/categories/${id}`)),
  section: async (id: string) =>
    unwrap(await api.get<ApiResponse<Section>>(`/admin/sections/${id}`)),
  sections: async (categoryId?: string, params?: Record<string, unknown>) =>
    unwrap(
      await api.get<ApiResponse<PageResult<Section>>>('/admin/sections', {
        params: { categoryId, limit: 100, ...params },
      }),
    ),
  createSection: async (payload: SectionPayload) =>
    unwrap(await api.post<ApiResponse<Section>>('/admin/sections', payload)),
  updateSection: async (id: string, payload: SectionPayload) =>
    unwrap(await api.patch<ApiResponse<Section>>(`/admin/sections/${id}`, payload)),
  deleteSection: async (id: string) =>
    unwrap(await api.delete<ApiResponse<{ id: string }>>(`/admin/sections/${id}`)),
  services: async (params?: Record<string, unknown>) =>
    unwrap(await api.get<ApiResponse<PageResult<LabService>>>('/admin/services', { params })),
  service: async (id: string) =>
    unwrap(await api.get<ApiResponse<LabService>>(`/admin/services/${id}`)),
  createService: async (payload: ServicePayload) =>
    unwrap(await api.post<ApiResponse<LabService>>('/admin/services', payload)),
  updateService: async (id: string, payload: ServicePayload) =>
    unwrap(await api.patch<ApiResponse<LabService>>(`/admin/services/${id}`, payload)),
  deleteService: async (id: string) =>
    unwrap(await api.delete<ApiResponse<{ id: string }>>(`/admin/services/${id}`)),
  appointments: async (params?: Record<string, unknown>) =>
    unwrap(
      await api.get<ApiResponse<PageResult<Appointment>>>('/admin/appointments', {
        params,
      }),
    ),
  appointmentStatus: async (id: string, status: string) =>
    unwrap(
      await api.patch<ApiResponse<Appointment>>(`/admin/appointments/${id}/status`, { status }),
    ),
  resendTelegram: async (id: string) =>
    unwrap(await api.post<ApiResponse<Appointment>>(`/admin/appointments/${id}/resend-telegram`)),
  deleteAppointment: async (id: string) =>
    unwrap(await api.delete<ApiResponse<{ id: string }>>(`/admin/appointments/${id}`)),
  imports: async (params?: Record<string, unknown>) =>
    unwrap(
      await api.get<ApiResponse<PageResult<Record<string, unknown>>>>('/admin/imports', { params }),
    ),
  importServices: async (file: File, directionId: string) => {
    const body = new FormData();
    body.append('file', file);
    body.append('directionId', directionId);
    body.append('importType', 'clinical-diagnostics');
    return unwrap(
      await api.post<ApiResponse<Record<string, unknown>>>('/admin/imports/services', body),
    );
  },
  uploadImage: async (file: File) => {
    const body = new FormData();
    body.append('file', file);
    return unwrap(await api.post<ApiResponse<UploadAsset>>('/admin/uploads/image', body));
  },
};
