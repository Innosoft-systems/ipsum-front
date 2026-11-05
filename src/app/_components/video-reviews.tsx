'use client';

import { useLocale, useTranslations } from 'next-intl';
import { localize } from '../_data/localized';
import { YouTubeEmbed } from './youtube-embed';
import { usePublicVideoReviews } from '@/lib/api/public-hooks';

export function VideoReviews() {
  const t = useTranslations('reviews');
  const locale = useLocale();
  const videosQuery = usePublicVideoReviews();
  const videos = videosQuery.data ?? [];

  // Hide the whole section while loading, on error, and when there are no videos.
  if (!videos.length) return null;

  return (
    <section className="section video-reviews-section">
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <p className="eyebrow">{t('videos.eyebrow')}</p>
          <h2>{t('videos.title')}</h2>
          <p>{t('videos.text')}</p>
        </div>
        <div className="card-grid two-col">
          {videos.map((video, index) => {
            const title = localize(video.title, locale);

            return (
              <div data-aos="fade-up" data-aos-delay={(index % 2) * 80} key={video._id}>
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
  );
}
