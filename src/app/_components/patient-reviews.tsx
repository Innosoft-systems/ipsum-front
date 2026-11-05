'use client';

import Image from 'next/image';
import { MessageSquareQuote } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { localize } from '../_data/localized';
import { usePublicReviews } from '@/lib/api/public-hooks';
import { formatDate } from '@/lib/format-date';

export function PatientReviews() {
  const t = useTranslations('reviews');
  const locale = useLocale();
  const reviewsQuery = usePublicReviews();
  const reviews = reviewsQuery.data ?? [];

  if (reviewsQuery.isLoading) {
    return (
      <div className="card-grid two-col" aria-busy="true">
        {Array.from({ length: 2 }).map((_, index) => (
          <article className="review-card" key={index}>
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
    <div className="card-grid two-col">
      {reviews.map((review, index) => (
        <article
          className="review-card"
          data-aos="fade-up"
          data-aos-delay={(index % 2) * 80}
          key={review._id}
        >
          <blockquote>{localize(review.text, locale)}</blockquote>
          <div className="review-card-author">
            {review.photo && (
              <span className="avatar">
                <Image alt={t('photoAlt')} fill sizes="56px" src={review.photo} unoptimized />
              </span>
            )}
            <div>
              <span>
                <time dateTime={review.date}>
                  {formatDate(review.date, locale)}
                </time>
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
