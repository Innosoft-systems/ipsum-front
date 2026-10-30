import type { Metadata } from 'next';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageShell } from '../../_components/page-shell';
import { internationalReviews } from '../../_data/international-reviews';
import { localize } from '../../_data/localized';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'internationalReviews' });
  return {
    title: `${t('eyebrow')} | IPSUM Pathology`,
    description: t('text'),
  };
}

export default async function InternationalReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('internationalReviews');

  return (
    <PageShell eyebrow={t('eyebrow')} text={t('text')} title={t('title')}>
      <section className="section reviews-section">
        <div className="container">
          <div className="card-grid">
            {internationalReviews.map((review, index) => {
              const name = localize(review.name, locale);

              return (
                <article
                  className="expert-card"
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 80}
                  key={review.id}
                >
                  <Quote aria-hidden="true" className="quote-mark" size={30} strokeWidth={2.2} />
                  <blockquote>{localize(review.quote, locale)}</blockquote>
                  <div className="expert-card-author">
                    <span className="avatar">
                      {review.photo ? (
                        <Image alt={t('photoAlt')} fill sizes="56px" src={review.photo} />
                      ) : (
                        name.charAt(0)
                      )}
                    </span>
                    <div>
                      <strong>{name}</strong>
                      <span>{localize(review.title, locale)}</span>
                      <span>
                        {localize(review.institution, locale)}, {localize(review.country, locale)}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
