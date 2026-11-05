'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUpload } from '../../_components/image-upload';
import { useCreateNews, useUpdateNews } from '@/lib/api/admin-hooks';
import type { NewsPayload } from '@/lib/api/services';
import type { NewsItem } from '@/lib/api/types';
import { formBoolean, formNumber, formString } from '@/lib/admin/form';
import { parseYouTubeId } from '@/lib/admin/youtube';

const locales = ['ru', 'uz', 'en'] as const;

const splitParagraphs = (value: string) =>
  value
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

export function NewsForm({ item }: { item?: NewsItem }) {
  const router = useRouter();
  const createMutation = useCreateNews();
  const updateMutation = useUpdateNews();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <form
      className="admin-inline-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        const slug = formString(form, 'slug');
        const date = formString(form, 'date');
        const image = formString(form, 'image');
        if (!slug || !date) return;
        if (!image) {
          toast.error('Загрузите изображение новости');
          return;
        }

        const body = {
          ru: splitParagraphs(formString(form, 'body_ru') ?? ''),
          uz: splitParagraphs(formString(form, 'body_uz') ?? ''),
          en: splitParagraphs(formString(form, 'body_en') ?? ''),
        };
        if (locales.some((locale) => body[locale].length === 0)) {
          toast.error('Заполните текст новости на всех языках');
          return;
        }

        const videoInput = formString(form, 'video');
        const videoId = videoInput ? parseYouTubeId(videoInput) : undefined;
        if (videoInput && !videoId) {
          toast.error('Укажите корректную ссылку на YouTube-видео');
          return;
        }

        const videoTitle = {
          ru: formString(form, 'videoTitle_ru'),
          uz: formString(form, 'videoTitle_uz'),
          en: formString(form, 'videoTitle_en'),
        };
        const hasAllVideoTitles = Boolean(videoTitle.ru && videoTitle.uz && videoTitle.en);

        const payload: NewsPayload = {
          // On edit the slug is only sent when it changed, so the uniqueness check is not tripped.
          slug: item && item.slug === slug ? undefined : slug,
          date: new Date(date).toISOString(),
          image,
          title: {
            ru: formString(form, 'title_ru') ?? '',
            uz: formString(form, 'title_uz') ?? '',
            en: formString(form, 'title_en') ?? '',
          },
          excerpt: {
            ru: formString(form, 'excerpt_ru') ?? '',
            uz: formString(form, 'excerpt_uz') ?? '',
            en: formString(form, 'excerpt_en') ?? '',
          },
          body,
          // Empty string clears the video on edit; on create the field is simply omitted.
          videoId: videoId ?? (item ? '' : undefined),
          videoTitle:
            videoId && hasAllVideoTitles
              ? {
                  ru: videoTitle.ru as string,
                  uz: videoTitle.uz as string,
                  en: videoTitle.en as string,
                }
              : undefined,
          order: formNumber(form, 'order'),
          isActive: formBoolean(form, 'isActive'),
        };

        if (item) await updateMutation.mutateAsync({ id: item._id, payload });
        else await createMutation.mutateAsync(payload);
        router.push('/admin/news');
      }}
    >
      <label className="span-5">
        Slug (адрес в URL)
        <input
          name="slug"
          required
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          title="Латиница в нижнем регистре, цифры и дефисы, например: digital-pathology-symposium"
          defaultValue={item?.slug ?? ''}
        />
      </label>
      <label className="span-3">
        Дата
        <input
          name="date"
          type="date"
          required
          defaultValue={item?.date ? item.date.slice(0, 10) : ''}
        />
      </label>
      <label className="span-2">
        Порядок
        <input name="order" type="number" min="0" defaultValue={item?.order ?? 0} />
      </label>
      <label className="admin-check admin-check-card span-2">
        <Checkbox name="isActive" defaultChecked={item?.isActive ?? true} />
        Показывать
      </label>
      <ImageUpload
        key={item?._id ?? 'new-news'}
        name="image"
        label="Изображение новости"
        defaultValue={item?.image ?? ''}
      />
      {locales.map((locale) => (
        <label className="span-12" key={`title_${locale}`}>
          Заголовок ({locale.toUpperCase()})
          <input name={`title_${locale}`} required defaultValue={item?.title?.[locale] ?? ''} />
        </label>
      ))}
      {locales.map((locale) => (
        <label className="span-12" key={`excerpt_${locale}`}>
          Краткое описание ({locale.toUpperCase()})
          <textarea
            name={`excerpt_${locale}`}
            rows={2}
            required
            defaultValue={item?.excerpt?.[locale] ?? ''}
          />
        </label>
      ))}
      {locales.map((locale) => (
        <label className="span-12" key={`body_${locale}`}>
          Текст ({locale.toUpperCase()}), абзацы разделяйте пустой строкой
          <textarea
            name={`body_${locale}`}
            rows={8}
            required
            defaultValue={item?.body?.[locale]?.join('\n\n') ?? ''}
          />
        </label>
      ))}
      <label className="span-12">
        Ссылка на YouTube (необязательно, пустое поле удаляет видео)
        <input
          name="video"
          type="text"
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          defaultValue={item?.videoId ? `https://www.youtube.com/watch?v=${item.videoId}` : ''}
        />
      </label>
      {locales.map((locale) => (
        <label className="span-4" key={`videoTitle_${locale}`}>
          Название видео ({locale.toUpperCase()})
          <input name={`videoTitle_${locale}`} defaultValue={item?.videoTitle?.[locale] ?? ''} />
        </label>
      ))}
      <div className="admin-form-actions">
        <Button asChild variant="secondary" disabled={isSaving}>
          <Link href="/admin/news">Отмена</Link>
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
