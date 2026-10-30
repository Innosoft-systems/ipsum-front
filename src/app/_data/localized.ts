import type { Locale } from '@/i18n/routing';

/** A value that is stored once per supported locale. */
export type Localized<T = string> = Record<Locale, T>;

export function localize<T>(value: Localized<T>, locale: string): T {
  return value[locale as Locale] ?? value.ru;
}
