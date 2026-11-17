import { ArrowRight, PlayCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/** IPSUM PATHOLOGY presentation video (https://youtu.be/YejMQvBIIRM) */
const ABOUT_VIDEO_ID = 'YejMQvBIIRM';

type AboutVideoSectionProps = {
  /**
   * `home`: copy + highlights + link to /about next to the video.
   * `about`: compact centred heading above a wide video (used on /about itself).
   */
  variant?: 'home' | 'about';
};

function AboutVideoPlayer({ title }: { title: string }) {
  return (
    <>
      <div className="about-video-frame">
        <div className="video-embed">
          <iframe
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={`https://www.youtube-nocookie.com/embed/${ABOUT_VIDEO_ID}?rel=0`}
            title={title}
          />
        </div>
      </div>
      <figcaption className="about-video-caption">
        <PlayCircle aria-hidden="true" size={18} strokeWidth={2.3} />
        <span>{title}</span>
      </figcaption>
    </>
  );
}

export function AboutVideoSection({ variant = 'home' }: AboutVideoSectionProps) {
  const t = useTranslations('home.aboutVideo');
  const tAbout = useTranslations('about');

  if (variant === 'about') {
    return (
      <section className="section about-video-section about-video-section--about">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <p className="eyebrow">{t('videoEyebrow')}</p>
            <h2>{t('title')}</h2>
          </div>
          <figure className="about-video-media about-video-media--wide" data-aos="fade-up">
            <AboutVideoPlayer title={t('videoTitle')} />
          </figure>
        </div>
      </section>
    );
  }

  const highlights = [tAbout('mission.h1'), tAbout('mission.h2'), tAbout('mission.h3')];

  return (
    <section className="section about-video-section" id="about-video">
      <div className="container about-video-grid">
        <div className="about-video-copy" data-aos="fade-right">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2>{t('title')}</h2>
          <p>{t('text')}</p>
          <ul className="about-video-highlights">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link className="button button-primary about-video-link" href="/about">
            <span>{t('cta')}</span>
            <ArrowRight aria-hidden="true" size={17} strokeWidth={2.4} />
          </Link>
        </div>

        <figure className="about-video-media" data-aos="fade-left" data-aos-delay="120">
          <AboutVideoPlayer title={t('videoTitle')} />
        </figure>
      </div>
    </section>
  );
}
