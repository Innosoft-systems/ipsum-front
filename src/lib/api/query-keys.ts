export const queryKeys = {
  publicCatalog: ['public', 'catalog'] as const,
  publicReviews: ['public', 'reviews'] as const,
  publicVideoReviews: ['public', 'video-reviews'] as const,
  publicInternationalReviews: ['public', 'international-reviews'] as const,
  publicNews: ['public', 'news'] as const,
  publicNewsItem: (slug: string) => ['public', 'news', slug] as const,
  publicServices: (params?: Record<string, unknown>) => ['public', 'services', params] as const,
  adminDirections: (params?: Record<string, unknown>) => ['admin', 'directions', params] as const,
  adminReviews: (params?: Record<string, unknown>) => ['admin', 'reviews', params] as const,
  adminVideoReviews: (params?: Record<string, unknown>) =>
    ['admin', 'video-reviews', params] as const,
  adminInternationalReviews: (params?: Record<string, unknown>) =>
    ['admin', 'international-reviews', params] as const,
  adminNews: (params?: Record<string, unknown>) => ['admin', 'news', params] as const,
  adminCategories: (params?: Record<string, unknown>) => ['admin', 'categories', params] as const,
  adminSections: (params?: Record<string, unknown>) => ['admin', 'sections', params] as const,
  adminServices: (params?: Record<string, unknown>) => ['admin', 'services', params] as const,
  adminAppointments: (params?: Record<string, unknown>) =>
    ['admin', 'appointments', params] as const,
  adminImports: (params?: Record<string, unknown>) => ['admin', 'imports', params] as const,
};
