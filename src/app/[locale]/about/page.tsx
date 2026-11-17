import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Award,
  ClipboardCheck,
  HeartPulse,
  Microscope,
  ShieldCheck,
  TestTube2,
  Workflow,
} from 'lucide-react';
import { PageShell } from '../../_components/page-shell';
import { AboutVideoSection } from '../../_components/about-video-section';
import { AppointmentDialog } from '../../_components/appointment-dialog';
import { LicensesGallery } from '../../_components/licenses-gallery';
import { PartnersSection } from '../../_components/partners-section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: `${t('eyebrow')} | IPSUM Pathology`,
    description: t('text'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const labHighlights = [
    t('mission.h1'),
    t('mission.h2'),
    t('mission.h3'),
    t('mission.h4'),
  ];

  const corporateStories = [
    {
      eyebrow: t('corporate.s1_eyebrow'),
      title: t('corporate.s1_title'),
      text: t('corporate.s1_text'),
      image: '/new_reception.jpg',
      alt: 'Reception IPSUM Pathology',
    },
    {
      eyebrow: t('corporate.s2_eyebrow'),
      title: t('corporate.s2_title'),
      text: t('corporate.s2_text'),
      image: '/new_gallery_featured.jpg',
      alt: 'Laboratory IPSUM Pathology',
    },
  ];

  const aboutStats = [
    { value: '9000+', label: t('stats.s1_label') },
    { value: '36+', label: t('stats.s2_label') },
    { value: '24/7', label: t('stats.s3_label') },
    { value: '3', label: t('stats.s4_label') },
  ];

  const aboutValues = [
    {
      icon: ShieldCheck,
      title: t('values.v1_title'),
      text: t('values.v1_text'),
    },
    {
      icon: HeartPulse,
      title: t('values.v2_title'),
      text: t('values.v2_text'),
    },
    {
      icon: Microscope,
      title: t('values.v3_title'),
      text: t('values.v3_text'),
    },
  ];

  const labProcess = [
    {
      title: t('route.step1_title'),
      text: t('route.step1_text'),
      icon: ClipboardCheck,
    },
    {
      title: t('route.step2_title'),
      text: t('route.step2_text'),
      icon: TestTube2,
    },
    {
      title: t('route.step3_title'),
      text: t('route.step3_text'),
      icon: Workflow,
    },
  ];

  return (
    <PageShell
      eyebrow={t('eyebrow')}
      text={t('text')}
      title={t('title')}
    >
      <section className="section about-story-section">
        <div className="container about-story-grid">
          <div className="about-story-copy" data-aos="fade-right">
            <p className="eyebrow">{t('mission.eyebrow')}</p>
            <h2>{t('mission.title')}</h2>
            <p>{t('mission.text')}</p>
            <div className="about-highlights">
              {labHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <figure className="about-story-image" data-aos="fade-left">
            <Image
              alt="IPSUM Pathology"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              src="/our_mission.jpg"
            />
          </figure>
        </div>
      </section>

      <AboutVideoSection variant="about" />

      <section className="section about-corporate-section">
        <div className="container about-corporate-list">
          {corporateStories.map((story, index) => (
            <article
              className={`about-corporate-row${index % 2 === 1 ? ' reversed' : ''}`}
              data-aos={index % 2 === 1 ? 'fade-left' : 'fade-right'}
              data-aos-delay={index * 90}
              key={story.title}
            >
              <figure className="about-corporate-image">
                <Image
                  alt={story.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  src={story.image}
                />
              </figure>
              <div className="about-corporate-copy">
                <p className="eyebrow">{story.eyebrow}</p>
                <h2>{story.title}</h2>
                <p>{story.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-stats-section">
        <div className="container about-stats-grid">
          {aboutStats.map((stat, index) => (
            <div
              className="about-stat"
              data-aos="zoom-in"
              data-aos-delay={index * 70}
              key={stat.label}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section about-values-section">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <p className="eyebrow">{t('values.eyebrow')}</p>
            <h2>{t('values.title')}</h2>
          </div>
          <div className="about-values-grid">
            {aboutValues.map((value, index) => {
              const Icon = value.icon ?? Award;

              return (
                <article
                  className="about-value-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 90}
                  key={value.title}
                >
                  <span aria-hidden="true">
                    <Icon size={25} strokeWidth={2.2} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section about-route-section">
        <div className="container about-route-grid">
          <div className="about-route-copy" data-aos="fade-right">
            <p className="eyebrow">{t('route.eyebrow')}</p>
            <h2>{t('route.title')}</h2>
            <p>{t('route.desc')}</p>
          </div>
          <div className="about-route-cards">
            {labProcess.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  className="about-route-card"
                  data-aos="fade-left"
                  data-aos-delay={index * 90}
                  key={item.title}
                >
                  <span className="about-route-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="about-route-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={2.3} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <PartnersSection />

      <LicensesGallery />

      <section className="about-cta-section">
        <div className="container about-cta">
          <div>
            <p className="eyebrow">{t('cta.eyebrow')}</p>
            <h2>{t('cta.title')}</h2>
          </div>
          <AppointmentDialog icon="message" label={t('cta.btn')} />
        </div>
      </section>
    </PageShell>
  );
}
