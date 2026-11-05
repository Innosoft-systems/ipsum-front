import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageCta } from '../../_components/page-cta';
import { PatientReviews } from '../../_components/patient-reviews';
import { PageShell } from '../../_components/page-shell';
import { VideoReviews } from '../../_components/video-reviews';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'reviews' });
  return {
    title: `${t('eyebrow')} | IPSUM Pathology`,
    description: t('text'),
  };
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('reviews');

  return (
    <PageShell eyebrow={t('eyebrow')} text={t('text')} title={t('title')}>
      <section className="section reviews-section">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <p className="eyebrow">{t('patients.eyebrow')}</p>
            <h2>{t('patients.title')}</h2>
          </div>
          <PatientReviews />
        </div>
      </section>

      <VideoReviews />

      <PageCta eyebrow={t('cta.eyebrow')} label={t('cta.btn')} title={t('cta.title')} />
    </PageShell>
  );
}
