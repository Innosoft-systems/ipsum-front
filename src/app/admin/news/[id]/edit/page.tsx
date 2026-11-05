'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminBreadcrumb } from '../../../_components/admin-breadcrumb';
import { NewsForm } from '../../_components/news-form';
import { adminApi } from '@/lib/api/services';

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const itemQuery = useQuery({
    queryKey: ['admin', 'news', id],
    queryFn: () => adminApi.newsItem(id),
  });

  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Новости', href: '/admin/news' }, { label: 'Редактировать' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Контент сайта</span>
          <h1>Редактировать новость</h1>
          <p>Измените текст, дату, изображение или видео.</p>
        </div>
      </div>
      {itemQuery.isLoading ? (
        <div className="admin-empty">Загружаем новость...</div>
      ) : itemQuery.data ? (
        <NewsForm item={itemQuery.data} />
      ) : (
        <div className="admin-empty">Новость не найдена.</div>
      )}
    </>
  );
}
