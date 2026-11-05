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
import { useAdminInternationalReviews, useDeleteInternationalReview } from '@/lib/api/admin-hooks';
import { useAdminUrlPagination } from '@/lib/admin/url-pagination';

export default function InternationalReviewsPage() {
  const pagination = useAdminUrlPagination();
  const listQuery = useAdminInternationalReviews(pagination.params);
  const deleteMutation = useDeleteInternationalReview();
  const items = listQuery.data?.items ?? [];

  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Контент сайта</span>
          <h1>Международные отзывы</h1>
          <p>Отзывы зарубежных экспертов на публичной странице.</p>
        </div>
        <Button asChild>
          <Link href="/admin/international-reviews/new">
            <Plus />
            Добавить
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Фото</TableHead>
            <TableHead>Имя</TableHead>
            <TableHead>Организация</TableHead>
            <TableHead>Страна</TableHead>
            <TableHead>Порядок</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listQuery.isLoading && (
            <TableRow>
              <TableCell colSpan={7}>Загружаем международные отзывы...</TableCell>
            </TableRow>
          )}
          {!listQuery.isLoading && items.length === 0 && (
            <TableRow>
              <TableCell colSpan={7}>Международных отзывов пока нет.</TableCell>
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
              <TableCell>
                <b>{item.name?.ru || item.name?.en || item.name?.uz || '—'}</b>
              </TableCell>
              <TableCell className="max-w-[320px] truncate text-[#758096]">
                {item.institution?.ru || item.institution?.en || item.institution?.uz || '—'}
              </TableCell>
              <TableCell>
                {item.country?.ru || item.country?.en || item.country?.uz || '—'}
              </TableCell>
              <TableCell>{item.order}</TableCell>
              <TableCell>
                <span className={`admin-status ${item.isActive ? 'active' : ''}`}>
                  {item.isActive ? 'Активно' : 'Скрыто'}
                </span>
              </TableCell>
              <TableCell>
                <div className="admin-row-actions">
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/admin/international-reviews/${item._id}/edit`}>
                      <Edit3 />
                    </Link>
                  </Button>
                  <DeleteAction
                    title="Удалить международный отзыв?"
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

      {listQuery.data && (
        <AdminPagination
          page={pagination.page}
          limit={pagination.limit}
          total={listQuery.data.total}
          pages={listQuery.data.pages}
          onPageChange={pagination.setPage}
          onLimitChange={pagination.setLimit}
        />
      )}
    </>
  );
}
