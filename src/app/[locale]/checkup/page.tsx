import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AppointmentDialog } from '../../_components/appointment-dialog';
import { PageCta } from '../../_components/page-cta';
import { PageShell } from '../../_components/page-shell';

type Program = { name: string; desc: string; tests: string[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'checkup' });
  return {
    title: `${t('eyebrow')} | IPSUM Pathology`,
    description: t('text'),
  };
}

export default async function CheckupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('checkup');
  const programs = t.raw('programs') as Program[];

  return (
    <PageShell eyebrow={t('eyebrow')} text={t('text')} title={t('title')}>
      <section className="section programs-section">
        <div className="container">
          <div className="page-intro" data-aos="fade-up">
            <p className="eyebrow">{t('intro.eyebrow')}</p>
            <h2>{t('intro.title')}</h2>
            <p>{t('intro.text')}</p>
          </div>

          <div className="card-grid two-col" style={{ marginTop: 44 }}>
            {programs.map((program, index) => (
              <article
                className="program-card"
                data-aos="fade-up"
                data-aos-delay={index * 70}
                key={program.name}
              >
                <h3>{program.name}</h3>
                <p>{program.desc}</p>
                <h4>{t('includedTitle')}</h4>
                <ul className="check-list">
                  {program.tests.map((test) => (
                    <li key={test}>
                      <Check aria-hidden="true" size={18} strokeWidth={2.8} />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
                <AppointmentDialog icon="calendar" label={t('programBtn')} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta eyebrow={t('cta.eyebrow')} label={t('cta.btn')} title={t('cta.title')} />
    </PageShell>
  );
}
