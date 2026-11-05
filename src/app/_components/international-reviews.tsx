'use client';

import Image from 'next/image';
import { MessageSquareQuote, Quote } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { localize } from '../_data/localized';
import { usePublicInternationalReviews } from '@/lib/api/public-hooks';

export function InternationalReviews() {
  const t = useTranslations('internationalReviews');
  const locale = useLocale();
  const reviewsQuery = usePublicInternationalReviews();
  const reviews = reviewsQuery.data ?? [];

  if (reviewsQuery.isLoading) {
    return (
      <div className="card-grid" aria-busy="true">
        {Array.from({ length: 3 }).map((_, index) => (
          <article className="expert-card" key={index}>
            <blockquote>&nbsp;</blockquote>
          </article>
        ))}
      </div>
    );
  }

  if (reviewsQuery.isError) {
    return (
      <div className="svc-empty svc-empty--error">
        <MessageSquareQuote size={40} />
        <p>{t('errorText')}</p>
        <button className="svc-retry" onClick={() => reviewsQuery.refetch()} type="button">
          {t('retry')}
        </button>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="svc-empty">
        <MessageSquareQuote size={40} />
        <p>{t('empty')}</p>
      </div>
    );
  }

  return (
    <div className="card-grid">
      {reviews.map((review, index) => {
        const name = localize(review.name, locale);

        return (
          <article
            className="expert-card"
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 80}
            key={review._id}
          >
            <Quote aria-hidden="true" className="quote-mark" size={30} strokeWidth={2.2} />
            <blockquote>{localize(review.quote, locale)}</blockquote>
            <div className="expert-card-author">
              <span className="avatar">
                {review.photo ? (
                  <Image alt={t('photoAlt')} fill sizes="56px" src={review.photo} unoptimized />
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
  );
}
