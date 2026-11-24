import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Section";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { AuthSceneProvider } from "@/components/auth/AuthSceneContext";

/**
 * Sign-in and sign-up: the form on paper beside a live, hand-drawn scene that reacts to it (ShutterScene,
 * ShopBuilder). On phones the scene becomes a band above the form, so the story still starts the page.
 */
export function AuthShell({ locale, title, lead, children, scene }: { locale: Locale; title: string; lead: string; children: React.ReactNode; scene: React.ReactNode }) {
  const t = getDict(locale);
  return (
    <AuthSceneProvider>
      <Container className="grid gap-8 pt-24 pb-20 sm:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14 lg:pt-32">
        <aside className="relative -mx-4 overflow-hidden bg-paper ring-ink/10 sm:mx-0 sm:rounded-[2rem] sm:ring-1 lg:sticky lg:top-28 lg:order-2 lg:shadow-[var(--shadow-card)]">
          {scene}
        </aside>
        <div className="mx-auto w-full max-w-xl lg:order-1 lg:pt-4">
          <h1 className="font-display hk-rise text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-3 text-lg text-muted">{lead}</p>
          <div className="mt-10">{children}</div>
          <div className="mt-10 border-t border-ink/10 pt-6">
            <p className="text-sm font-semibold text-ink-soft">{t.app.prefer}</p>
            <StoreBadges locale={locale} className="mt-3" />
          </div>
        </div>
      </Container>
    </AuthSceneProvider>
  );
}
