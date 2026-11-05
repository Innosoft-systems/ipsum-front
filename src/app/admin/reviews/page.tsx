'use client';

import { Edit3, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AdminPagination } from '../_components/admin-pagination';
import { DeleteAction } from '../_components/delete-action';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdminReviews, useDeleteReview } from '@/lib/api/admin-hooks';
import { useAdminUrlPagination } from '@/lib/admin/url-pagination';

export default function ReviewsPage() {
  const pagination = useAdminUrlPagination();
  const reviewsQuery = useAdminReviews(pagination.params);
  const deleteMutation = useDeleteReview();
  const items = reviewsQuery.data?.items ?? [];

  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Контент сайта</span>
          <h1>Отзывы</h1>
          <p>Отзывы пациентов на публичной странице отзывов.</p>
        </div>
        <Button asChild>
          <Link href="/admin/reviews/new">
            <Plus />
            Добавить
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Фото</TableHead>
            <TableHead>Текст</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Порядок</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviewsQuery.isLoading && (
            <TableRow>
              <TableCell colSpan={6}>Загружаем отзывы...</TableCell>
            </TableRow>
          )}
          {!reviewsQuery.isLoading && items.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>Отзывов пока нет.</TableCell>
            </TableRow>
          )}
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <span className="admin-table-image">
                  {item.photo ? (
                    <Image src={item.photo} alt="" fill sizes="96px" unoptimized />
                  ) : (
                    '—'
                  )}
                </span>
              </TableCell>
              <TableCell className="max-w-[420px] truncate text-[#758096]">
                {item.text?.ru || item.text?.en || item.text?.uz || '—'}
              </TableCell>
              <TableCell>{item.date ? item.date.slice(0, 10) : '—'}</TableCell>
              <TableCell>{item.order}</TableCell>
              <TableCell>
                <span className={`admin-status ${item.isActive ? 'active' : ''}`}>
                  {item.isActive ? 'Активно' : 'Скрыто'}
                </span>
              </TableCell>
              <TableCell>
                <div className="admin-row-actions">
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/admin/reviews/${item._id}/edit`}>
                      <Edit3 />
                    </Link>
                  </Button>
                  <DeleteAction
                    title="Удалить отзыв?"
                    description="Отзыв будет удалён. Это действие нельзя отменить."
                    disabled={deleteMutation.isPending}
                    onConfirm={() => deleteMutation.mutate(item._id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {reviewsQuery.data && (
        <AdminPagination
          page={pagination.page}
          limit={pagination.limit}
          total={reviewsQuery.data.total}
          pages={reviewsQuery.data.pages}
          onPageChange={pagination.setPage}
          onLimitChange={pagination.setLimit}
        />
      )}
    </>
  );
}
