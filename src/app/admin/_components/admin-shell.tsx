'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  CalendarDays,
  FolderTree,
  FileSpreadsheet,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  Globe,
  MessageSquareQuote,
  Video,
  Route,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { authApi } from '@/lib/api/services';
const links = [
  ['/admin', 'Обзор', LayoutDashboard],
  ['/admin/directions', 'Направления', Route],
  ['/admin/categories', 'Категории', FolderTree],
  ['/admin/sections', 'Разделы', FolderTree],
  ['/admin/services', 'Услуги', FlaskConical],
  ['/admin/reviews', 'Отзывы', MessageSquareQuote],
  ['/admin/video-reviews', 'Видеоотзывы', Video],
  ['/admin/international-reviews', 'Международные отзывы', Globe],
  ['/admin/news', 'Новости', Newspaper],
  ['/admin/imports', 'Импорт Excel', FileSpreadsheet],
  ['/admin/appointments', 'Заявки', CalendarDays],
] as const;
export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(path === '/admin/login');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (path === '/admin/login') return;
    if (!sessionStorage.getItem('ipsum_access_token')) {
      router.replace('/admin/login');
      return;
    }
    authApi
      .me()
      .then(() => setReady(true))
      .catch(() => router.replace('/admin/login'));
  }, [path, router]);
  if (path === '/admin/login') return children;
  if (!ready) return <div className="admin-loading">Проверяем сессию...</div>;
  return (
    <div className="admin-app">
      <aside className={`admin-sidebar${open ? ' open' : ''}`}>
        <div className="admin-brand">
          <Image src="/logo.png" alt="IPSUM" width={150} height={48} />
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <nav>
          {links.map(([href, label, Icon]) => (
            <Link
              className={path === href ? 'active' : ''}
              href={href}
              key={href}
              onClick={() => setOpen(false)}
            >
              <Icon size={19} />
              {label}
            </Link>
          ))}
        </nav>
        <button
          className="admin-logout"
          onClick={() => {
            sessionStorage.clear();
            router.replace('/admin/login');
          }}
        >
          <LogOut size={19} />
          Выйти
        </button>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <button onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <div>
            <span>Панель управления</span>
            <strong>IPSUM Pathology</strong>
          </div>
          <Link href="/">Открыть сайт</Link>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
