import type { Metadata } from 'next';
import { AdminShell } from './_components/admin-shell';
import { AppProviders } from '../providers';
import { CountryFlagPolyfill } from '../_components/country-flag-polyfill';
import './admin.css';

export const metadata: Metadata = {
  title: 'Управление | IPSUM Pathology',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full">
      <body className="h-full">
        <CountryFlagPolyfill />
        <AppProviders>
          <AdminShell>{children}</AdminShell>
        </AppProviders>
      </body>
    </html>
  );
}
