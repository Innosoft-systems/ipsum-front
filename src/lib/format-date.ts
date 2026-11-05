const UZ_MONTHS = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentabr',
  'oktabr',
  'noyabr',
  'dekabr',
];

/**
 * Formats an ISO date as a long date ("5 November 2026").
 * Always uses UTC so the day never shifts and server and client render the same text.
 * Uzbek is formatted by hand because browser ICU data often lacks Uzbek month names.
 */
export function formatDate(value: string | Date, locale: string): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  if (locale === 'uz') {
    return `${date.getUTCDate()}-${UZ_MONTHS[date.getUTCMonth()]}, ${date.getUTCFullYear()}`;
  }

  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}
