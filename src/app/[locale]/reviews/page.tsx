import type { Metadata } from 'next';
import Image from 'next/image';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { PageCta } from '../../_components/page-cta';
import { PageShell } from '../../_components/page-shell';
import { YouTubeEmbed } from '../../_components/youtube-embed';
import { localize } from '../../_data/localized';
import { patientReviews, videoReviews } from '../../_data/reviews';

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
  const format = await getFormatter();

  return (
    <PageShell eyebrow={t('eyebrow')} text={t('text')} title={t('title')}>
      <section className="section reviews-section">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <p className="eyebrow">{t('patients.eyebrow')}</p>
            <h2>{t('patients.title')}</h2>
          </div>
          <div className="card-grid two-col">
            {patientReviews.map((review, index) => {
              const name = localize(review.name, locale);

              return (
                <article
                  className="review-card"
                  data-aos="fade-up"
                  data-aos-delay={(index % 2) * 80}
                  key={review.id}
                >
                  <blockquote>{localize(review.text, locale)}</blockquote>
                  <div className="review-card-author">
                    <span className="avatar">
                      {review.photo ? (
                        <Image alt={t('photoAlt')} fill sizes="56px" src={review.photo} />
                      ) : (
                        name.charAt(0)
                      )}
                    </span>
                    <div>
                      <strong>{name}</strong>
                      <span>
                        <time dateTime={review.date}>
                          {format.dateTime(new Date(review.date), { dateStyle: 'long' })}
                        </time>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {videoReviews.length > 0 && (
        <section className="section video-reviews-section">
          <div className="container">
            <div className="section-heading" data-aos="fade-up">
              <p className="eyebrow">{t('videos.eyebrow')}</p>
              <h2>{t('videos.title')}</h2>
              <p>{t('videos.text')}</p>
            </div>
            <div className="card-grid two-col">
              {videoReviews.map((video, index) => {
                const title = localize(video.title, locale);

                return (
                  <div data-aos="fade-up" data-aos-delay={(index % 2) * 80} key={video.id}>
                    <YouTubeEmbed
                      playLabel={t('videos.play')}
                      poster={video.poster}
                      title={title}
                      videoId={video.videoId}
                    />
                    <p className="video-review-title">{title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <PageCta eyebrow={t('cta.eyebrow')} label={t('cta.btn')} title={t('cta.title')} />
    </PageShell>
  );
}
