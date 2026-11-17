'use client';

import Image from 'next/image';
import { Building2, MessageSquareQuote, Quote } from 'lucide-react';
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
      <div className="intl-reviews-list" aria-busy="true">
        {Array.from({ length: 2 }).map((_, index) => (
          <article className="expert-card intl-review-card is-skeleton" key={index}>
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
    <div className="intl-reviews-list">
      {reviews.map((review) => {
        const name = localize(review.name, locale);
        const institution = localize(review.institution, locale);
        const country = localize(review.country, locale);
        const paragraphs = (localize(review.quote, locale) ?? '')
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean);
        // Names may start with a flag emoji; use the first letter for the fallback avatar.
        const initial = name.replace(/[^\p{L}]/gu, '').charAt(0);

        return (
          <article className="expert-card intl-review-card" data-aos="fade-up" key={review._id}>
            <div className="intl-review-author">
              <span className="avatar intl-review-avatar">
                {review.photo ? (
                  <Image alt={t('photoAlt')} fill sizes="112px" src={review.photo} unoptimized />
                ) : (
                  initial
                )}
              </span>
              <div className="intl-review-meta">
                <strong>{name}</strong>
                <span className="intl-review-role">{localize(review.title, locale)}</span>
                {(institution || country) && (
                  <span className="intl-review-place">
                    <Building2 aria-hidden="true" size={15} strokeWidth={2.3} />
                    <span>{[institution, country].filter(Boolean).join(', ')}</span>
                  </span>
                )}
              </div>
            </div>
            <div className="intl-review-body">
              <Quote aria-hidden="true" className="quote-mark" size={34} strokeWidth={2.2} />
              <blockquote>
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </blockquote>
            </div>
          </article>
        );
      })}
    </div>
  );
}
