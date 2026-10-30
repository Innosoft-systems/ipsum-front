import type { Metadata } from 'next';
import Image from 'next/image';
import { Gauge, Globe2, Archive, Ruler, type LucideIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageCta } from '../../_components/page-cta';
import { PageShell } from '../../_components/page-shell';

type TitledText = { title: string; text: string };

const benefitIcons: LucideIcon[] = [Gauge, Globe2, Archive, Ruler];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'digitalPathology' });
  return {
    title: `${t('eyebrow')} | IPSUM Pathology`,
    description: t('text'),
  };
}

export default async function DigitalPathologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('digitalPathology');
  const benefits = t.raw('benefits.items') as TitledText[];
  const steps = t.raw('how.steps') as TitledText[];

  return (
    <PageShell eyebrow={t('eyebrow')} text={t('text')} title={t('title')}>
      <section className="section about-story-section">
        <div className="container about-story-grid">
          <div className="about-story-copy" data-aos="fade-right">
            <p className="eyebrow">{t('intro.eyebrow')}</p>
            <h2>{t('intro.title')}</h2>
            <p>{t('intro.text')}</p>
          </div>
          <figure className="about-story-image" data-aos="fade-left">
            <Image
              alt={t('title')}
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              src="/g-cytometry.jpg"
            />
          </figure>
        </div>
      </section>

      <section className="section benefits-section">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <p className="eyebrow">{t('benefits.eyebrow')}</p>
            <h2>{t('benefits.title')}</h2>
          </div>
          <div className="card-grid four-col">
            {benefits.map((benefit, index) => {
              const Icon = benefitIcons[index % benefitIcons.length];

              return (
                <article
                  className="about-value-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 70}
                  key={benefit.title}
                >
                  <span aria-hidden="true">
                    <Icon size={25} strokeWidth={2.2} />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section about-route-section">
        <div className="container about-route-grid">
          <div className="about-route-copy" data-aos="fade-right">
            <p className="eyebrow">{t('how.eyebrow')}</p>
            <h2>{t('how.title')}</h2>
            <p>{t('how.desc')}</p>
          </div>
          <div className="about-route-cards">
            {steps.map((step, index) => (
              <article
                className="about-route-card"
                data-aos="fade-left"
                data-aos-delay={index * 90}
                key={step.title}
              >
                <span className="about-route-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta eyebrow={t('cta.eyebrow')} label={t('cta.btn')} title={t('cta.title')} />
    </PageShell>
  );
}
