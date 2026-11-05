import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageShell } from '../../../_components/page-shell';
import { YouTubeEmbed } from '../../../_components/youtube-embed';
import { localize } from '../../../_data/localized';
import { fetchPublicNewsItem } from '@/lib/api/server';
import { formatDate } from '@/lib/format-date';

type NewsPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await fetchPublicNewsItem(slug).catch(() => null);
  if (!item) return {};

  return {
    title: `${localize(item.title, locale)} | IPSUM Pathology`,
    description: localize(item.excerpt, locale),
    openGraph: {
      title: localize(item.title, locale),
      description: localize(item.excerpt, locale),
      images: [item.image],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const item = await fetchPublicNewsItem(slug);
  if (!item) notFound();

  const t = await getTranslations('news');
  const title = localize(item.title, locale);

  return (
    <PageShell eyebrow={t('eyebrow')} text={localize(item.excerpt, locale)} title={title}>
      <section className="section news-section">
        <div className="container">
          <article className="news-detail">
            <Link className="news-back" href="/news">
              <ArrowLeft aria-hidden="true" size={16} strokeWidth={2.6} />
              {t('back')}
            </Link>
            <div>
              <time dateTime={item.date}>
                {formatDate(item.date, locale)}
              </time>
            </div>
            <div className="news-detail-image">
              <Image alt={title} fill priority sizes="(max-width: 900px) 100vw, 820px" src={item.image} unoptimized />
            </div>
            <div className="news-detail-body">
              {localize(item.body, locale).map((paragraph, index) => (
                <p key={`${index}-${paragraph}`}>{paragraph}</p>
              ))}
            </div>
            {item.videoId && (
              <div className="news-detail-video">
                <h2>{t('videoTitle')}</h2>
                <YouTubeEmbed
                  playLabel={t('play')}
                  title={item.videoTitle ? localize(item.videoTitle, locale) : title}
                  videoId={item.videoId}
                />
              </div>
            )}
          </article>
        </div>
      </section>
    </PageShell>
  );
}
