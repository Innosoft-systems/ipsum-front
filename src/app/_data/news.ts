import type { Localized } from './localized';

/*
 * PLACEHOLDER DATA. Replace with real news supplied by the client.
 * `body` is a list of paragraphs. `videoId` (YouTube) is optional and is
 * shown on the detail page, e.g. for conference or symposium recordings.
 */

export type NewsItem = {
  slug: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  /** Image path inside /public */
  image: string;
  title: Localized;
  excerpt: Localized;
  body: Localized<string[]>;
  videoId?: string;
  videoTitle?: Localized;
};

const placeholderBody: Localized<string[]> = {
  ru: [
    'Это текст-заглушка новости. Настоящий материал будет добавлен после получения контента от клиента.',
    'Здесь может быть несколько абзацев с описанием события, участников и итогов.',
  ],
  uz: [
    "Bu yangilik uchun vaqtinchalik matn. Haqiqiy material mijozdan kontent olingandan so'ng qo'shiladi.",
    "Bu yerda voqea, ishtirokchilar va natijalar tavsifi bilan bir necha xatboshi bo'lishi mumkin.",
  ],
  en: [
    'This is placeholder news text. The real article will be added once content is received from the client.',
    'Several paragraphs describing the event, participants and outcomes can go here.',
  ],
};

export const newsItems: NewsItem[] = [
  {
    slug: 'digital-pathology-symposium',
    date: '2026-05-12',
    image: '/new_gallery_featured.jpg',
    title: {
      ru: 'Симпозиум по цифровой патологии (пример)',
      uz: "Raqamli patologiya bo'yicha simpozium (namuna)",
      en: 'Digital Pathology Symposium (sample)',
    },
    excerpt: {
      ru: 'Краткое описание новости-заглушки о симпозиуме с видеозаписью.',
      uz: 'Videoyozuvli simpozium haqidagi vaqtinchalik yangilikning qisqacha tavsifi.',
      en: 'Short description of a placeholder news item about a symposium with a video recording.',
    },
    body: placeholderBody,
    videoId: 'PLACEHOLDER',
    videoTitle: {
      ru: 'Запись симпозиума (пример)',
      uz: 'Simpozium yozuvi (namuna)',
      en: 'Symposium recording (sample)',
    },
  },
  {
    slug: 'new-equipment',
    date: '2026-04-02',
    image: '/new_gallery_wide.jpg',
    title: {
      ru: 'Новое оборудование в лаборатории (пример)',
      uz: 'Laboratoriyada yangi uskunalar (namuna)',
      en: 'New laboratory equipment (sample)',
    },
    excerpt: {
      ru: 'Краткое описание новости-заглушки о запуске нового оборудования.',
      uz: 'Yangi uskunalar ishga tushirilishi haqidagi vaqtinchalik yangilikning qisqacha tavsifi.',
      en: 'Short description of a placeholder news item about new equipment being launched.',
    },
    body: placeholderBody,
  },
  {
    slug: 'education-program',
    date: '2026-03-10',
    image: '/edu_gallery_1.jpg',
    title: {
      ru: 'Обучающая программа для специалистов (пример)',
      uz: "Mutaxassislar uchun o'quv dasturi (namuna)",
      en: 'Training program for specialists (sample)',
    },
    excerpt: {
      ru: 'Краткое описание новости-заглушки об обучающем мероприятии.',
      uz: "O'quv tadbiri haqidagi vaqtinchalik yangilikning qisqacha tavsifi.",
      en: 'Short description of a placeholder news item about an educational event.',
    },
    body: placeholderBody,
  },
];

export function getNewsBySlug(slug: string) {
  return newsItems.find((item) => item.slug === slug);
}
