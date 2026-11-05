'use client';

import { useQuery } from '@tanstack/react-query';
import { publicApi } from './services';
import { queryKeys } from './query-keys';

export function usePublicCatalog() {
  return useQuery({
    queryKey: queryKeys.publicCatalog,
    queryFn: publicApi.catalog,
  });
}

export function usePublicServices(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.publicServices(params),
    queryFn: () => publicApi.services(params),
  });
}

export function usePublicReviews() {
  return useQuery({
    queryKey: queryKeys.publicReviews,
    queryFn: publicApi.reviews,
  });
}

export function usePublicVideoReviews() {
  return useQuery({
    queryKey: queryKeys.publicVideoReviews,
    queryFn: publicApi.videoReviews,
  });
}

export function usePublicInternationalReviews() {
  return useQuery({
    queryKey: queryKeys.publicInternationalReviews,
    queryFn: publicApi.internationalReviews,
  });
}

export function usePublicNews() {
  return useQuery({
    queryKey: queryKeys.publicNews,
    queryFn: publicApi.news,
  });
}

export function usePublicNewsItem(slug: string) {
  return useQuery({
    queryKey: queryKeys.publicNewsItem(slug),
    queryFn: () => publicApi.newsItem(slug),
  });
}
