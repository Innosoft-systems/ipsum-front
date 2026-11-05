'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminBreadcrumb } from '../../../_components/admin-breadcrumb';
import { VideoReviewForm } from '../../_components/video-reviews-form';
import { adminApi } from '@/lib/api/services';

export default function EditVideoReviewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const itemQuery = useQuery({
    queryKey: ['admin', 'video-reviews', id],
    queryFn: () => adminApi.videoReview(id),
  });

  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Видеоотзывы', href: '/admin/video-reviews' }, { label: 'Редактировать' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Контент сайта</span>
          <h1>Редактировать видеоотзыв</h1>
          <p>Измените видео, заголовок, постер или порядок.</p>
        </div>
      </div>
      {itemQuery.isLoading ? (
        <div className="admin-empty">Загружаем видеоотзыв...</div>
      ) : itemQuery.data ? (
        <VideoReviewForm item={itemQuery.data} />
      ) : (
        <div className="admin-empty">Видеоотзыв не найден.</div>
      )}
    </>
  );
}
