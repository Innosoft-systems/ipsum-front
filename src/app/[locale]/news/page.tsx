import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageShell } from '../../_components/page-shell';
import { localize } from '../../_data/localized';
import { newsItems } from '../../_data/news';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  return {
    title: `${t('eyebrow')} | IPSUM Pathology`,
    description: t('text'),
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('news');
  const format = await getFormatter();
  const items = [...newsItems].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <PageShell eyebrow={t('eyebrow')} text={t('text')} title={t('title')}>
      <section className="section news-section">
        <div className="container">
          {items.length === 0 ? (
            <p className="catalog-empty">{t('empty')}</p>
          ) : (
            <div className="card-grid">
              {items.map((item, index) => (
                <Link
                  className="news-card"
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 80}
                  href={`/news/${item.slug}`}
                  key={item.slug}
                >
                  <div className="news-card-image">
                    <Image
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 380px"
                      src={item.image}
                    />
                  </div>
                  <div className="news-card-body">
                    <time dateTime={item.date}>
                      {format.dateTime(new Date(item.date), { dateStyle: 'long' })}
                    </time>
                    <h3>{localize(item.title, locale)}</h3>
                    <p>{localize(item.excerpt, locale)}</p>
                    <span className="news-card-more">
                      {t('readMore')}
                      <ArrowRight aria-hidden="true" size={16} strokeWidth={2.6} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
