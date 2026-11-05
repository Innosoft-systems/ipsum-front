import { baseURL } from './client';
import type { ApiResponse, NewsItem, PageResult } from './types';

const REVALIDATE_SECONDS = 60;

async function fetchPublic<T>(path: string): Promise<T | null> {
  const response = await fetch(`${baseURL}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`API request failed: ${response.status} ${path}`);
  return ((await response.json()) as ApiResponse<T>).data;
}

/** Throws when the API is unreachable or answers with an error. */
export async function fetchPublicNews(): Promise<NewsItem[]> {
  const page = await fetchPublic<PageResult<NewsItem>>('/public/news');
  return page?.items ?? [];
}

/** Returns null on 404; throws on any other failure. */
export function fetchPublicNewsItem(slug: string) {
  return fetchPublic<NewsItem>(`/public/news/${encodeURIComponent(slug)}`);
}
