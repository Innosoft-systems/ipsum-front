'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUpload } from '../../_components/image-upload';
import { useCreateReview, useUpdateReview } from '@/lib/api/admin-hooks';
import type { Review } from '@/lib/api/types';
import { formBoolean, formNumber, formString } from '@/lib/admin/form';

export function ReviewForm({ item }: { item?: Review }) {
  const router = useRouter();
  const createMutation = useCreateReview();
  const updateMutation = useUpdateReview();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <form
      className="admin-inline-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const date = formString(form, 'date');
        const payload = {
          text: {
            ru: formString(form, 'text_ru') ?? '',
            uz: formString(form, 'text_uz') ?? '',
            en: formString(form, 'text_en') ?? '',
          },
          date: date ? new Date(date).toISOString() : undefined,
          // Empty string lets PATCH clear a previously uploaded photo.
          photo: formString(form, 'photo') ?? (item ? '' : undefined),
          order: formNumber(form, 'order'),
          isActive: formBoolean(form, 'isActive'),
        };

        if (item) await updateMutation.mutateAsync({ id: item._id, payload });
        else await createMutation.mutateAsync(payload);
        router.push('/admin/reviews');
      }}
    >
      <label className="span-4">
        Дата
        <input
          name="date"
          type="date"
          required
          defaultValue={item?.date ? item.date.slice(0, 10) : ''}
        />
      </label>
      <label className="span-3">
        Порядок
        <input name="order" type="number" min="0" defaultValue={item?.order ?? 0} />
      </label>
      <label className="admin-check admin-check-card span-5">
        <Checkbox name="isActive" defaultChecked={item?.isActive ?? true} />
        Показывать на сайте
      </label>
      <label className="span-12">
        Текст (RU)
        <textarea name="text_ru" rows={4} required defaultValue={item?.text?.ru ?? ''} />
      </label>
      <label className="span-12">
        Текст (UZ)
        <textarea name="text_uz" rows={4} required defaultValue={item?.text?.uz ?? ''} />
      </label>
      <label className="span-12">
        Текст (EN)
        <textarea name="text_en" rows={4} required defaultValue={item?.text?.en ?? ''} />
      </label>
      <ImageUpload
        key={item?._id ?? 'new-review'}
        name="photo"
        label="Фото (необязательно)"
        defaultValue={item?.photo ?? ''}
      />
      <div className="admin-form-actions">
        <Button asChild variant="secondary" disabled={isSaving}>
          <Link href="/admin/reviews">Отмена</Link>
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
