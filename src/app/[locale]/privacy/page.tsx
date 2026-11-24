import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/pages/LegalPage";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = getDict(locale).meta.pages.privacy;
  // The published policy (Maple Service Solution Limited) is indexable.
  return pageMetadata(locale, "/privacy", m.title, m.description);
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  return <LegalPage locale={locale} kind="privacy" />;
}
