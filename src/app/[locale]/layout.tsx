import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import '../globals.css';
import { AosProvider } from '../_components/aos-provider';
import { AppProviders } from '../providers';
import { CountryFlagPolyfill } from '../_components/country-flag-polyfill';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isUz = locale === 'uz';
  const isEn = locale === 'en';

  const title = isUz
    ? 'IPSUM Pathology | Laboratoriya va diagnostika markazi'
    : isEn
      ? 'IPSUM Pathology | Laboratory & Diagnostic Center'
      : 'IPSUM Pathology | Лаборатория и диагностический центр';

  const description = isUz
    ? 'Ishonchli tahlillar, patomorfologiya va molekulyar diagnostika bo‘yicha IPSUM Pathology laboratoriyasi.'
    : isEn
      ? 'IPSUM Pathology laboratory and diagnostic center for reliable analysis, pathology, and molecular diagnostics.'
      : 'IPSUM Pathology - лаборатория и диагностический центр для надежных анализов, патоморфологии и молекулярной диагностики.';

  return {
    title,
    description,
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-icon.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full scroll-smooth">
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppProviders>
            <AosProvider />
            <CountryFlagPolyfill />
            {children}
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
