import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageCta } from '../../_components/page-cta';
import { PageShell } from '../../_components/page-shell';

type Direction = { title: string; text: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'oncology' });
  return {
    title: `${t('eyebrow')} | IPSUM Pathology`,
    description: t('text'),
  };
}

export default async function OncologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('oncology');
  const highlights = t.raw('intro.highlights') as string[];
  const directions = t.raw('directions.items') as Direction[];

  return (
    <PageShell eyebrow={t('eyebrow')} text={t('text')} title={t('title')}>
      <section className="section about-story-section">
        <div className="container about-story-grid">
          <div className="about-story-copy" data-aos="fade-right">
            <p className="eyebrow">{t('intro.eyebrow')}</p>
            <h2>{t('intro.title')}</h2>
            <p>{t('intro.text')}</p>
            <div className="about-highlights">
              {highlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <figure className="about-story-image" data-aos="fade-left">
            <Image
              alt={t('title')}
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              src="/g-pathology.jpg"
            />
          </figure>
        </div>
      </section>

      <section className="section directions-section">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <p className="eyebrow">{t('directions.eyebrow')}</p>
            <h2>{t('directions.title')}</h2>
          </div>
          <div className="card-grid">
            {directions.map((direction, index) => (
              <article
                className="direction-card"
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 80}
                key={direction.title}
              >
                <span className="direction-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{direction.title}</h3>
                <p>{direction.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta eyebrow={t('cta.eyebrow')} label={t('cta.btn')} title={t('cta.title')} />
    </PageShell>
  );
}
