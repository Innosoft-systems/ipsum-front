'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminBreadcrumb } from '../../../_components/admin-breadcrumb';
import { ReviewForm } from '../../_components/review-form';
import { adminApi } from '@/lib/api/services';

export default function EditReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const reviewQuery = useQuery({
    queryKey: ['admin', 'reviews', id],
    queryFn: () => adminApi.review(id),
  });

  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Отзывы', href: '/admin/reviews' }, { label: 'Редактировать' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Контент сайта</span>
          <h1>Редактировать отзыв</h1>
          <p>Измените текст, дату, фото или порядок отображения.</p>
        </div>
      </div>
      {reviewQuery.isLoading ? (
        <div className="admin-empty">Загружаем отзыв...</div>
      ) : reviewQuery.data ? (
        <ReviewForm item={reviewQuery.data} />
      ) : (
        <div className="admin-empty">Отзыв не найден.</div>
      )}
    </>
  );
}
