import type { Locale } from "@/i18n/config";
import { I18nScope, type Namespace } from "@/i18n/scope";

/** Each solution page has its own client components, so each sends only its own text (see I18nScope). */
const slugNamespaces: Record<string, Namespace[]> = {
  grocery: ["demo", "grocery", "home"],
  pharmacy: ["demo", "home", "pharmacy"],
  supershop: ["demo", "home", "supershop"],
  "online-store": ["onlineStore", "status"],
  "f-commerce": ["channels", "fcommerce", "home"],
};
// The generic solution layout (AppPreview).
const fallback: Namespace[] = ["demo", "home"];

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  return (
    <I18nScope locale={locale as Locale} ns={slugNamespaces[slug] ?? fallback}>
      {children}
    </I18nScope>
  );
}
