'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminBreadcrumb } from '../../../_components/admin-breadcrumb';
import { InternationalReviewForm } from '../../_components/international-reviews-form';
import { adminApi } from '@/lib/api/services';

export default function EditInternationalReviewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const itemQuery = useQuery({
    queryKey: ['admin', 'international-reviews', id],
    queryFn: () => adminApi.internationalReview(id),
  });

  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Международные отзывы', href: '/admin/international-reviews' }, { label: 'Редактировать' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Контент сайта</span>
          <h1>Редактировать международный отзыв</h1>
          <p>Измените имя, цитату, фото или порядок.</p>
        </div>
      </div>
      {itemQuery.isLoading ? (
        <div className="admin-empty">Загружаем отзыв...</div>
      ) : itemQuery.data ? (
        <InternationalReviewForm item={itemQuery.data} />
      ) : (
        <div className="admin-empty">Отзыв не найден.</div>
      )}
    </>
  );
}
