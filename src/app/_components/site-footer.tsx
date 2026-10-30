import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { contactInfo } from '../_data/content';
import { flatNavigation } from '../_data/navigation';
import { AppointmentDialog } from './appointment-dialog';

export function SiteFooter() {
  const t = useTranslations('common');

  return (
    <footer className="site-footer" id="contacts">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image
            alt="IPSUM Pathology"
            className="footer-logo"
            height={48}
            src="/logo.png"
            width={190}
          />
          <p>{t('footer.desc')}</p>
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/ipsumpathology/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ipsumpathology/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://t.me/ipsumuz_bot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram bot @ipsumuz_bot"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.666a2.25 2.25 0 0 0 .126 4.238l3.423 1.018 2.04 6.386a.998.998 0 0 0 1.7.38l2.498-2.607 4.861 3.595a2.25 2.25 0 0 0 3.484-1.39l2.96-17.5a2.25 2.25 0 0 0-3.57-2.001z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h3>{t('footer.navTitle')}</h3>
          <nav aria-label={t('footer.navTitle')}>
            {flatNavigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {t(`navigation.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h3>{t('footer.contactsTitle')}</h3>
          <address>
            <a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
            <a href={contactInfo.emailHref}>{contactInfo.email}</a>
            <span>{t('contactInfo.address')}</span>
            <span>{t('contactInfo.hours')}</span>
          </address>
        </div>
        <div className="footer-cta">
          <h3>{t('footer.helpTitle')}</h3>
          <p>{t('footer.helpDesc')}</p>
          <AppointmentDialog icon="message" label={t('footer.ctaBtn')} />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t('footer.copyright')}</span>
        <span>{t('footer.subline')}</span>
      </div>
    </footer>
  );
}
