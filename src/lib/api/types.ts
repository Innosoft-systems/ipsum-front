export type EntityRef = { _id: string; name: string; slug: string };
export type Direction = EntityRef & {
  description: string;
  shortDescription: string;
  image: string;
  order: number;
  isActive: boolean;
  categoryCount?: number;
};
export type Review = {
  _id: string;
  text: { ru: string; uz: string; en: string };
  date: string;
  photo?: string;
  isActive: boolean;
  order: number;
};
export type LocalizedText = { ru: string; uz: string; en: string };
export type VideoReview = {
  _id: string;
  videoId: string;
  title: LocalizedText;
  poster?: string;
  isActive: boolean;
  order: number;
};
export type InternationalReview = {
  _id: string;
  name: LocalizedText;
  title: LocalizedText;
  institution: LocalizedText;
  country: LocalizedText;
  quote: LocalizedText;
  photo?: string;
  isActive: boolean;
  order: number;
};
export type NewsItem = {
  _id: string;
  slug: string;
  date: string;
  image: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: { ru: string[]; uz: string[]; en: string[] };
  videoId?: string;
  videoTitle?: LocalizedText;
  isActive: boolean;
  order: number;
};
export type Category = EntityRef & {
  directionId: string;
  description: string;
  order: number;
  isActive: boolean;
  serviceCount?: number;
  sections?: Section[];
};
export type Section = EntityRef & {
  directionId: string;
  categoryId: string;
  description: string;
  order: number;
  isActive: boolean;
};
export type LabService = EntityRef & {
  directionId: EntityRef | string;
  categoryId: EntityRef | string;
  sectionId?: EntityRef | string;
  code: string;
  method: string;
  biomaterial: string;
  tube: string;
  duration: string;
  image: string;
  description: string;
  preparation: string;
  resultFormat: string;
  tags: string[];
  isPopular: boolean;
  isPackage: boolean;
  isActive: boolean;
};
export type Appointment = {
  _id: string;
  fullName: string;
  phone: string;
  message: string;
  status: 'new' | 'in_progress' | 'done' | 'cancelled';
  telegramStatus: 'pending' | 'sent' | 'failed' | 'disabled';
  selectedServices: Array<{
    serviceId: string;
    code: string;
    name: string;
    categoryName: string;
    sectionName: string;
  }>;
  createdAt: string;
};
export type PageResult<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
};
export type ApiResponse<T> = { success: boolean; data: T };
export type UploadAsset = {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
};
