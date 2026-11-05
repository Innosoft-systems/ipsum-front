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
import { useAdminNews, useDeleteNews } from '@/lib/api/admin-hooks';
import { useAdminUrlPagination } from '@/lib/admin/url-pagination';

export default function NewsPage() {
  const pagination = useAdminUrlPagination();
  const listQuery = useAdminNews(pagination.params);
  const deleteMutation = useDeleteNews();
  const items = listQuery.data?.items ?? [];

  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Контент сайта</span>
          <h1>Новости</h1>
          <p>Новости и события лаборатории на публичном сайте.</p>
        </div>
        <Button asChild>
          <Link href="/admin/news/new">
            <Plus />
            Добавить
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Изображение</TableHead>
            <TableHead>Заголовок</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Порядок</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listQuery.isLoading && (
            <TableRow>
              <TableCell colSpan={8}>Загружаем новости...</TableCell>
            </TableRow>
          )}
          {!listQuery.isLoading && items.length === 0 && (
            <TableRow>
              <TableCell colSpan={8}>Новостей пока нет.</TableCell>
            </TableRow>
          )}
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <span className="admin-table-image">
                  {item.image ? (
                    <Image src={item.image} alt="" fill sizes="96px" unoptimized />
                  ) : (
                    '—'
                  )}
                </span>
              </TableCell>
              <TableCell className="max-w-[320px] truncate">
                <b>{item.title?.ru || item.title?.en || item.title?.uz || '—'}</b>
              </TableCell>
              <TableCell className="text-[#758096]">{item.slug}</TableCell>
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
                    <Link href={`/admin/news/${item._id}/edit`}>
                      <Edit3 />
                    </Link>
                  </Button>
                  <DeleteAction
                    title="Удалить новость?"
                    description="Новость будет удалена. Это действие нельзя отменить."
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
