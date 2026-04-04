/**
 * HelloKhata Multi-Page Router Configuration
 *
 * Each "page" maps to one or more section components.
 * The router uses window.location.hash for client-side navigation.
 * Only the active page's sections are rendered (performance).
 */

export interface PageConfig {
  id: string;
  label: string;       // Bengali label
  labelEn: string;     // English label
  dark: boolean;       // Is the first section dark? (nav theming)
}

export const PAGES: PageConfig[] = [
  { id: 'home',      label: 'হোম',        labelEn: 'Home',      dark: true },
  { id: 'features',  label: 'পণ্য',        labelEn: 'Features',  dark: true },
  { id: 'voice',     label: 'ভয়েস',       labelEn: 'Voice',     dark: true },
  { id: 'batch',     label: 'ব্যাচ',        labelEn: 'Batch',     dark: false },
  { id: 'stories',   label: 'গল্প',        labelEn: 'Stories',   dark: false },
  { id: 'pricing',   label: 'মূল্য',        labelEn: 'Pricing',   dark: false },
  { id: 'about',     label: 'সম্পর্কে',     labelEn: 'About',     dark: false },
  { id: 'vision',    label: 'দৃষ্টিভঙ্গি',  labelEn: 'Vision',    dark: true },
  { id: 'blog',      label: 'ব্লগ',        labelEn: 'Blog',      dark: false },
  { id: 'contact',   label: 'যোগাযোগ',     labelEn: 'Contact',   dark: false },
];

/** Navigation links (subset of pages shown in navbar) */
export const NAV_LINKS = [
  { label: 'পণ্য',        page: 'features' },
  { label: 'ভয়েস',       page: 'voice' },
  { label: 'ব্যাচ',        page: 'batch' },
  { label: 'গল্প',        page: 'stories' },
  { label: 'মূল্য',        page: 'pricing' },
  { label: 'সম্পর্কে',     page: 'about' },
  { label: 'দৃষ্টিভঙ্গি',  page: 'vision' },
  { label: 'ব্লগ',        page: 'blog' },
  { label: 'যোগাযোগ',     page: 'contact' },
];

/** Section IDs considered "dark" (for scroll-based nav theming within a page) */
export const DARK_SECTION_IDS = [
  'hero',
  'transformation',
  'voice-demo',
  'voice',
  'features',
  'comparison',
  'vision',
  'market',
  'cta',
];

/** Helper: get page config by ID */
export function getPageConfig(id: string): PageConfig | undefined {
  return PAGES.find((p) => p.id === id);
}
