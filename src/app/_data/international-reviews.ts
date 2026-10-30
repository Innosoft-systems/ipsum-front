import type { Localized } from './localized';

/*
 * PLACEHOLDER DATA. Replace with real expert quotes supplied by the client.
 * Photos are paths inside /public; when omitted, initials are shown.
 */

export type InternationalReview = {
  id: string;
  name: Localized;
  title: Localized;
  institution: Localized;
  country: Localized;
  quote: Localized;
  photo?: string;
};

const placeholderQuote: Localized = {
  ru: 'Цитата-заглушка. Здесь будет размещён настоящий отзыв международного эксперта о работе лаборатории.',
  uz: "Iqtibos uchun vaqtinchalik matn. Bu yerda xalqaro ekspertning laboratoriya faoliyati haqidagi haqiqiy sharhi joylashtiriladi.",
  en: "Placeholder quote. A real review from an international expert about the laboratory's work will be placed here.",
};

export const internationalReviews: InternationalReview[] = [
  {
    id: 'expert-1',
    name: { ru: 'Доктор Имя Фамилия', uz: 'Doktor Ism Familiya', en: 'Dr. First Last' },
    title: { ru: 'Профессор патологии', uz: 'Patologiya professori', en: 'Professor of Pathology' },
    institution: {
      ru: 'Университет (пример)',
      uz: 'Universitet (namuna)',
      en: 'University (sample)',
    },
    country: { ru: 'Германия', uz: 'Germaniya', en: 'Germany' },
    quote: placeholderQuote,
    photo: '/g-pathology.jpg',
  },
  {
    id: 'expert-2',
    name: { ru: 'Доктор Имя Фамилия', uz: 'Doktor Ism Familiya', en: 'Dr. First Last' },
    title: { ru: 'Руководитель лаборатории', uz: 'Laboratoriya rahbari', en: 'Head of Laboratory' },
    institution: { ru: 'Клиника (пример)', uz: 'Klinika (namuna)', en: 'Clinic (sample)' },
    country: { ru: 'Турция', uz: 'Turkiya', en: 'Turkey' },
    quote: placeholderQuote,
    photo: '/g-cytogenetics.jpg',
  },
  {
    id: 'expert-3',
    name: { ru: 'Доктор Имя Фамилия', uz: 'Doktor Ism Familiya', en: 'Dr. First Last' },
    title: { ru: 'Онкопатолог', uz: 'Onkopatolog', en: 'Oncopathologist' },
    institution: {
      ru: 'Исследовательский центр (пример)',
      uz: 'Tadqiqot markazi (namuna)',
      en: 'Research Center (sample)',
    },
    country: { ru: 'Южная Корея', uz: 'Janubiy Koreya', en: 'South Korea' },
    quote: placeholderQuote,
  },
];
