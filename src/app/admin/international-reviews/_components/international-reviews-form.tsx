'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUpload } from '../../_components/image-upload';
import { useCreateInternationalReview, useUpdateInternationalReview } from '@/lib/api/admin-hooks';
import type { InternationalReview } from '@/lib/api/types';
import { formBoolean, formNumber, formString } from '@/lib/admin/form';

const localizedFields = [
  { key: 'name', label: 'Имя', multiline: false },
  { key: 'title', label: 'Должность', multiline: false },
  { key: 'institution', label: 'Организация', multiline: false },
  { key: 'country', label: 'Страна', multiline: false },
  { key: 'quote', label: 'Цитата', multiline: true },
] as const;

const locales = ['ru', 'uz', 'en'] as const;

export function InternationalReviewForm({ item }: { item?: InternationalReview }) {
  const router = useRouter();
  const createMutation = useCreateInternationalReview();
  const updateMutation = useUpdateInternationalReview();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <form
      className="admin-inline-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const localized = (key: (typeof localizedFields)[number]['key']) => ({
          ru: formString(form, `${key}_ru`) ?? '',
          uz: formString(form, `${key}_uz`) ?? '',
          en: formString(form, `${key}_en`) ?? '',
        });
        const payload = {
          name: localized('name'),
          title: localized('title'),
          institution: localized('institution'),
          country: localized('country'),
          quote: localized('quote'),
          // Empty string lets PATCH clear a previously uploaded photo.
          photo: formString(form, 'photo') ?? (item ? '' : undefined),
          order: formNumber(form, 'order'),
          isActive: formBoolean(form, 'isActive'),
        };

        if (item) await updateMutation.mutateAsync({ id: item._id, payload });
        else await createMutation.mutateAsync(payload);
        router.push('/admin/international-reviews');
      }}
    >
      <label className="span-3">
        Порядок
        <input name="order" type="number" min="0" defaultValue={item?.order ?? 0} />
      </label>
      <label className="admin-check admin-check-card span-4">
        <Checkbox name="isActive" defaultChecked={item?.isActive ?? true} />
        Показывать на сайте
      </label>
      {localizedFields.map((field) =>
        locales.map((locale) => (
          <label className={field.multiline ? 'span-12' : 'span-6'} key={`${field.key}_${locale}`}>
            {field.label} ({locale.toUpperCase()})
            {field.multiline ? (
              <textarea
                name={`${field.key}_${locale}`}
                rows={4}
                required
                defaultValue={item?.[field.key]?.[locale] ?? ''}
              />
            ) : (
              <input
                name={`${field.key}_${locale}`}
                required
                defaultValue={item?.[field.key]?.[locale] ?? ''}
              />
            )}
          </label>
        )),
      )}
      <ImageUpload
        key={item?._id ?? 'new-international-review'}
        name="photo"
        label="Фото (необязательно)"
        defaultValue={item?.photo ?? ''}
      />
      <div className="admin-form-actions">
        <Button asChild variant="secondary" disabled={isSaving}>
          <Link href="/admin/international-reviews">Отмена</Link>
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
