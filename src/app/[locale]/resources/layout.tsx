import type { Locale } from "@/i18n/config";
import { I18nScope } from "@/i18n/scope";

/** Sends only the text this section's client components use (see I18nScope). */
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <I18nScope locale={locale as Locale} ns={["resources"]}>
      {children}
    </I18nScope>
  );
}
