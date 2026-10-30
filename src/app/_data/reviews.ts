import type { Localized } from './localized';

/*
 * PLACEHOLDER DATA. Replace with real reviews supplied by the client.
 * Photos are optional (path inside /public).
 */

export type PatientReview = {
  id: string;
  name: Localized;
  /** ISO date, YYYY-MM-DD */
  date: string;
  text: Localized;
  photo?: string;
};

export type VideoReview = {
  id: string;
  /** YouTube video id (the part after ?v=) */
  videoId: string;
  title: Localized;
  /** Optional local poster in /public; falls back to the YouTube thumbnail */
  poster?: string;
};

const placeholderText: Localized = {
  ru: 'Текст отзыва-заглушка. Здесь будет размещён настоящий отзыв пациента после согласования с клиентом.',
  uz: "Sharh uchun vaqtinchalik matn. Bu yerda mijoz bilan kelishilgandan so'ng bemorning haqiqiy sharhi joylashtiriladi.",
  en: 'Placeholder review text. A real patient review will be placed here once agreed with the client.',
};

export const patientReviews: PatientReview[] = [
  {
    id: 'patient-1',
    name: { ru: 'Пациент 1 (пример)', uz: 'Bemor 1 (namuna)', en: 'Patient 1 (sample)' },
    date: '2026-01-15',
    text: placeholderText,
    photo: '/g-1.jpeg',
  },
  {
    id: 'patient-2',
    name: { ru: 'Пациент 2 (пример)', uz: 'Bemor 2 (namuna)', en: 'Patient 2 (sample)' },
    date: '2026-02-03',
    text: placeholderText,
  },
  {
    id: 'patient-3',
    name: { ru: 'Пациент 3 (пример)', uz: 'Bemor 3 (namuna)', en: 'Patient 3 (sample)' },
    date: '2026-03-21',
    text: placeholderText,
    photo: '/g-2.jpeg',
  },
  {
    id: 'patient-4',
    name: { ru: 'Пациент 4 (пример)', uz: 'Bemor 4 (namuna)', en: 'Patient 4 (sample)' },
    date: '2026-04-09',
    text: placeholderText,
  },
];

export const videoReviews: VideoReview[] = [
  {
    id: 'video-1',
    videoId: 'PLACEHOLDER',
    title: {
      ru: 'Видеоотзыв 1 (пример)',
      uz: 'Video sharh 1 (namuna)',
      en: 'Video review 1 (sample)',
    },
    poster: '/lab2.jpg',
  },
  {
    id: 'video-2',
    videoId: 'PLACEHOLDER',
    title: {
      ru: 'Видеоотзыв 2 (пример)',
      uz: 'Video sharh 2 (namuna)',
      en: 'Video review 2 (sample)',
    },
    poster: '/lab5.jpg',
  },
];
