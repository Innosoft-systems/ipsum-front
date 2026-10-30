export type NavLink = { key: string; href: string };
export type NavGroup = { key: string; children: NavLink[] };
export type NavEntry = NavLink | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return 'children' in entry;
}

/** Desktop header: grouped to fit one row. Labels live in `common.navigation.<key>`. */
export const desktopNavigation: NavEntry[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  {
    key: 'directions',
    children: [
      { key: 'checkup', href: '/checkup' },
      { key: 'oncology', href: '/oncology' },
      { key: 'hematology', href: '/hematology' },
      { key: 'endocrinology', href: '/endocrinology' },
      { key: 'digitalPathology', href: '/digital-pathology' },
    ],
  },
  { key: 'education', href: '/education' },
  {
    key: 'reviews',
    children: [
      { key: 'patientReviews', href: '/reviews' },
      { key: 'internationalReviews', href: '/international-reviews' },
    ],
  },
  { key: 'news', href: '/news' },
  { key: 'contact', href: '/contact' },
];

/** Mobile drawer and footer: flat list in the order agreed with the client. */
export const flatNavigation: NavLink[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'checkup', href: '/checkup' },
  { key: 'oncology', href: '/oncology' },
  { key: 'hematology', href: '/hematology' },
  { key: 'endocrinology', href: '/endocrinology' },
  { key: 'digitalPathology', href: '/digital-pathology' },
  { key: 'education', href: '/education' },
  { key: 'patientReviews', href: '/reviews' },
  { key: 'internationalReviews', href: '/international-reviews' },
  { key: 'news', href: '/news' },
  { key: 'contact', href: '/contact' },
];

export function isPathActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}
