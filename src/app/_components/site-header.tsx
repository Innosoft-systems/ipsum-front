'use client';

import Image from 'next/image';
import { Link, usePathname } from '@/i18n/navigation';
import { ChevronRight, Menu, Phone, X, Clock } from 'lucide-react';
import { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { contactInfo } from '../_data/content';
import {
  desktopNavigation,
  flatNavigation,
  isNavGroup,
  isPathActive,
} from '../_data/navigation';
import { AppointmentDialog } from './appointment-dialog';
import { LanguageSwitcher } from './language-switcher';
import { NavDropdown } from './nav-dropdown';

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function SiteHeader() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mounted = useMounted();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          {/* Brand Logo */}
          <Link
            aria-label="IPSUM Pathology home"
            className="logo-link"
            href="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              alt="IPSUM Pathology"
              className="logo-image"
              height={46}
              priority
              src="/logo.png"
              width={170}
            />
          </Link>

          {/* Desktop Navigation Menu */}
          <nav aria-label={t('header.mainNav')} className="desktop-nav-wrap">
            <div className="desktop-nav">
              {desktopNavigation.map((entry) => {
                if (isNavGroup(entry)) {
                  const items = entry.children.map((child) => ({
                    label: t(`navigation.${child.key}`),
                    href: child.href,
                    isActive: isPathActive(pathname, child.href),
                  }));

                  return (
                    <NavDropdown
                      isActive={items.some((item) => item.isActive)}
                      items={items}
                      key={entry.key}
                      label={t(`navigation.${entry.key}`)}
                    />
                  );
                }

                return (
                  <Link
                    className={isPathActive(pathname, entry.href) ? 'active' : undefined}
                    href={entry.href}
                    key={entry.href}
                  >
                    {t(`navigation.${entry.key}`)}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions">
            <a className="phone-link" href={contactInfo.phoneHref} title={contactInfo.phone}>
              <Phone aria-hidden="true" size={17} strokeWidth={2.4} />
              <span className="phone-text">{contactInfo.phone}</span>
            </a>
            <AppointmentDialog
              className="header-callback"
              icon="message"
              label={t('header.callback')}
              variant="ghost"
            />
            <LanguageSwitcher />
          </div>

          {/* Mobile / Tablet Controls */}
          <div className="header-mobile-controls">
            <LanguageSwitcher />
            <button
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
              className="mobile-menu-toggle"
              type="button"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu aria-hidden="true" size={22} strokeWidth={2.6} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Offcanvas Drawer rendered via Portal at document.body level */}
      {mounted &&
        createPortal(
          <div className={`mobile-drawer-portal${isMenuOpen ? ' open' : ''}`}>
            <div
              aria-hidden="true"
              className="mobile-drawer-backdrop"
              onClick={() => setIsMenuOpen(false)}
            />

            <aside aria-label="Mobile Navigation" className="mobile-drawer">
              <div className="mobile-drawer-header">
                <Link
                  aria-label="IPSUM Pathology home"
                  className="drawer-logo-link"
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image
                    alt="IPSUM Pathology"
                    className="drawer-logo-image"
                    height={38}
                    src="/logo.png"
                    width={140}
                  />
                </Link>
                <button
                  aria-label={t('header.closeMenu')}
                  className="drawer-close-btn"
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X aria-hidden="true" size={20} strokeWidth={2.6} />
                </button>
              </div>

              <nav className="mobile-drawer-nav">
                {flatNavigation.map((item) => {
                  const isActive = isPathActive(pathname, item.href);

                  return (
                    <Link
                      aria-current={isActive ? 'page' : undefined}
                      className={`drawer-nav-item${isActive ? ' active' : ''}`}
                      href={item.href}
                      key={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{t(`navigation.${item.key}`)}</span>
                      <ChevronRight
                        aria-hidden="true"
                        className="drawer-nav-chevron"
                        size={18}
                        strokeWidth={2.4}
                      />
                    </Link>
                  );
                })}
              </nav>

              <div className="mobile-drawer-footer">
                <a className="drawer-phone-link" href={contactInfo.phoneHref}>
                  <Phone aria-hidden="true" size={17} strokeWidth={2.4} />
                  <span>{contactInfo.phone}</span>
                </a>

                <div className="drawer-hours">
                  <Clock aria-hidden="true" size={15} />
                  <span>{contactInfo.hours}</span>
                </div>

                <AppointmentDialog
                  className="drawer-callback-btn"
                  icon="message"
                  label={t('header.callback')}
                  variant="primary"
                />
              </div>
            </aside>
          </div>,
          document.body
        )}
    </>
  );
}
