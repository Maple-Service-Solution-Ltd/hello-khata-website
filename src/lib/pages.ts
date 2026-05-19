/**
 * HelloKhata Multi-Page Router Configuration
 *
 * Each "page" maps to one or more section components.
 * The router uses window.location.hash for client-side navigation.
 * Only the active page's sections are rendered (performance).
 */

export interface PageConfig {
  id: string;
  label: string;         // Bengali label
  labelEn: string;       // English label
  dark: boolean;         // Is the first section dark? (nav theming)
  title: string;         // Page title for document.title
  description: string;   // Page meta description
  icon: string;          // Emoji icon for search results
  keywords: string[];    // Search keywords
}

export const PAGES: PageConfig[] = [
  {
    id: 'home',
    label: 'হোম',
    labelEn: 'Home',
    dark: true,
    title: 'HelloKhata — খাতা এখন কথা বলে। | AI-Powered Business OS',
    description: 'বাংলাদেশের দোকানদারদের জন্য তৈরি — প্রথম AI-powered, voice-first ব্যবসা ম্যানেজমেন্ট সিস্টেম।',
    icon: '🏠',
    keywords: ['হোম', 'home', 'hellokhata', 'khata', 'ব্যবসা'],
  },
  {
    id: 'features',
    label: 'পণ্য',
    labelEn: 'Features',
    dark: true,
    title: 'Features — HelloKhata | সব ফিচার এক জায়গায়',
    description: '১২টি শক্তিশালী ফিচার দিয়ে আপনার ব্যবসা পরিচালনা করুন।',
    icon: '⚡',
    keywords: ['ফিচার', 'features', 'পণ্য', 'inventory', 'billing', 'report'],
  },
  {
    id: 'voice',
    label: 'ভয়েস',
    labelEn: 'Voice',
    dark: true,
    title: 'Voice AI — HelloKhata | কথায় কথায় ব্যবসা',
    description: 'ভয়েস কমান্ড দিয়ে ব্যবসা পরিচালনা করুন। বলুন, HelloKhata বাকিটা করবে।',
    icon: '🎙️',
    keywords: ['ভয়েস', 'voice', 'AI', 'কমান্ড', 'speech'],
  },
  {
    id: 'batch',
    label: 'ব্যাচ',
    labelEn: 'Batch',
    dark: true,
    title: 'Batch Management — HelloKhata | ব্যাচ ম্যানেজমেন্ট',
    description: 'ERP-লেভেল ব্যাচ ট্র্যাকিং সিস্টেম। FIFO, এক্সপায়ারি, প্রফিট ক্যালকুলেশন।',
    icon: '📦',
    keywords: ['ব্যাচ', 'batch', 'inventory', 'FIFO', 'tracking', 'expiry'],
  },
  {
    id: 'stories',
    label: 'গল্প',
    labelEn: 'Stories',
    dark: true,
    title: 'Stories — HelloKhata | সাফল্যের গল্প',
    description: '৫০,০০০+ ব্যবসায়ীর সাফল্যের গল্প এবং ১২+ ইন্ডাস্ট্রি কভারেজ।',
    icon: '📖',
    keywords: ['গল্প', 'stories', 'testimonial', 'success', 'business', 'ক্ষেত্র'],
  },
  {
    id: 'pricing',
    label: 'মূল্য',
    labelEn: 'Pricing',
    dark: false,
    title: 'Pricing — HelloKhata | মূল্য তালিকা',
    description: '৩টি প্যাকেজে আপনার ব্যবসার জন্য সেরা সমাধান। মাসিক ও বার্ষিক প্ল্যান।',
    icon: '💰',
    keywords: ['মূল্য', 'pricing', 'price', 'প্যাকেজ', 'plan', 'subscription'],
  },
  {
    id: 'about',
    label: 'সম্পর্কে',
    labelEn: 'About',
    dark: false,
    title: 'About — HelloKhata | আমাদের সম্পর্কে',
    description: 'HelloKhata-এর গল্প, মিশন, টিম এবং মূল্যবোধ সম্পর্কে জানুন।',
    icon: '🏗️',
    keywords: ['সম্পর্কে', 'about', 'team', 'mission', 'values', 'history'],
  },
  {
    id: 'vision',
    label: 'দৃষ্টিভঙ্গি',
    labelEn: 'Vision',
    dark: false,
    title: 'Vision — HelloKhata | ভিশন ও রোডম্যাপ',
    description: 'বাংলাদেশের ব্যবসায়ীদের জন্য HelloKhata-এর দীর্ঘমেয়াদী ভিশন ও রোডম্যাপ।',
    icon: '🔭',
    keywords: ['দৃষ্টিভঙ্গি', 'vision', 'roadmap', 'investor', 'market'],
  },
  {
    id: 'blog',
    label: 'ব্লগ',
    labelEn: 'Blog',
    dark: false,
    title: 'Blog — HelloKhata | ব্লগ ও টিপস',
    description: 'ব্যবসার টিপস, সাফল্যের গল্প এবং নতুন ফিচার আপডেট।',
    icon: '📝',
    keywords: ['ব্লগ', 'blog', 'tips', 'article', 'news', 'update'],
  },
  {
    id: 'contact',
    label: 'যোগাযোগ',
    labelEn: 'Contact',
    dark: false,
    title: 'Contact — HelloKhata | যোগাযোগ করুন',
    description: 'আমাদের সাথে যোগাযোগ করুন। WhatsApp, ফোন, ইমেইল — যেকোনো মাধ্যমে।',
    icon: '📞',
    keywords: ['যোগাযোগ', 'contact', 'WhatsApp', 'phone', 'email', 'support'],
  },
];

/** Navigation links (subset of pages shown in navbar) */
export const NAV_LINKS = [
  { label: 'পণ্য', page: 'features' },
  { label: 'ভয়েস', page: 'voice' },
  { label: 'ব্যাচ', page: 'batch' },
  { label: 'গল্প', page: 'stories' },
  { label: 'মূল্য', page: 'pricing' },
  { label: 'সম্পর্কে', page: 'about' },
  { label: 'দৃষ্টিভঙ্গি', page: 'vision' },
  { label: 'ব্লগ', page: 'blog' },
  { label: 'যোগাযোগ', page: 'contact' },
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
  // 'market',
  'cta',
  'live-activity',
  'stats-ticker',
];

/** Helper: get page config by ID */
export function getPageConfig(id: string): PageConfig | undefined {
  return PAGES.find((p) => p.id === id);
}

/** Helper: get adjacent page IDs for prefetching */
export function getAdjacentPages(currentId: string): string[] {
  const idx = PAGES.findIndex((p) => p.id === currentId);
  if (idx < 0) return [];
  const adjacent: string[] = [];
  if (idx > 0) adjacent.push(PAGES[idx - 1].id);
  if (idx < PAGES.length - 1) adjacent.push(PAGES[idx + 1].id);
  return adjacent;
}
