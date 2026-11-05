'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUpload } from '../../_components/image-upload';
import { useCreateVideoReview, useUpdateVideoReview } from '@/lib/api/admin-hooks';
import type { VideoReview } from '@/lib/api/types';
import { formBoolean, formNumber, formString } from '@/lib/admin/form';
import { parseYouTubeId } from '@/lib/admin/youtube';

export function VideoReviewForm({ item }: { item?: VideoReview }) {
  const router = useRouter();
  const createMutation = useCreateVideoReview();
  const updateMutation = useUpdateVideoReview();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <form
      className="admin-inline-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const videoId = parseYouTubeId(formString(form, 'videoId') ?? '');
        if (!videoId) {
          toast.error('Укажите корректную ссылку на YouTube-видео');
          return;
        }
        const payload = {
          videoId,
          title: {
            ru: formString(form, 'title_ru') ?? '',
            uz: formString(form, 'title_uz') ?? '',
            en: formString(form, 'title_en') ?? '',
          },
          // Empty string lets PATCH clear a previously uploaded poster.
          poster: formString(form, 'poster') ?? (item ? '' : undefined),
          order: formNumber(form, 'order'),
          isActive: formBoolean(form, 'isActive'),
        };

        if (item) await updateMutation.mutateAsync({ id: item._id, payload });
        else await createMutation.mutateAsync(payload);
        router.push('/admin/video-reviews');
      }}
    >
      <label className="span-5">
        Ссылка на YouTube
        <input
          name="videoId"
          type="text"
          required
          pattern=".*\S.*"
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          defaultValue={item ? `https://www.youtube.com/watch?v=${item.videoId}` : ''}
        />
      </label>
      <label className="span-3">
        Порядок
        <input name="order" type="number" min="0" defaultValue={item?.order ?? 0} />
      </label>
      <label className="admin-check admin-check-card span-4">
        <Checkbox name="isActive" defaultChecked={item?.isActive ?? true} />
        Показывать на сайте
      </label>
      <label className="span-12">
        Заголовок (RU)
        <input name="title_ru" required defaultValue={item?.title?.ru ?? ''} />
      </label>
      <label className="span-12">
        Заголовок (UZ)
        <input name="title_uz" required defaultValue={item?.title?.uz ?? ''} />
      </label>
      <label className="span-12">
        Заголовок (EN)
        <input name="title_en" required defaultValue={item?.title?.en ?? ''} />
      </label>
      <ImageUpload
        key={item?._id ?? 'new-video-review'}
        name="poster"
        label="Постер (необязательно)"
        defaultValue={item?.poster ?? ''}
      />
      <div className="admin-form-actions">
        <Button asChild variant="secondary" disabled={isSaving}>
          <Link href="/admin/video-reviews">Отмена</Link>
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
