/**
 * Pricing configuration: launch prices in BDT and what each plan includes.
 * Plan names, taglines and labels live in the translations (pricing.*);
 * every number shown on the pricing page comes from here.
 */
export type PlanKey = "mini" | "basic" | "premium" | "intelligence" | "enterprise";

export const pricingConfig: {
  trialDays: number;
  annualFreeMonths: number;
  plans: { key: PlanKey; monthly: number | null; yearly: number | null; highlighted: boolean; mobileOnly: boolean }[];
} = {
  trialDays: 14,
  annualFreeMonths: 2,
  plans: [
    { key: "mini", monthly: 199, yearly: 1990, highlighted: false, mobileOnly: true },
    { key: "basic", monthly: 399, yearly: 3990, highlighted: false, mobileOnly: false },
    { key: "premium", monthly: 799, yearly: 7990, highlighted: true, mobileOnly: false },
    { key: "intelligence", monthly: 1499, yearly: 14990, highlighted: false, mobileOnly: false },
    { key: "enterprise", monthly: null, yearly: null, highlighted: false, mobileOnly: false },
  ],
};

export const planKeys = pricingConfig.plans.map((p) => p.key);

export function isPlanKey(value: string | null): value is PlanKey {
  return value !== null && (planKeys as string[]).includes(value);
}

/**
 * One cell of the comparison table.
 * true/false = included or not; a number = a limit; { perMonth } = a monthly allowance;
 * a string = a label from pricing.compare.values.
 */
export type CompareValue =
  | "unlimited"
  | "custom"
  | "ownerOnly"
  | "creditBased"
  | "smsMini"
  | "wallet"
  | "supported"
  | "basicExport"
  | "fullExport"
  | "basicRoles"
  | "advancedRoles"
  | "dedicated";
export type CompareCell = boolean | number | { perMonth: number } | CompareValue;

type Row = { key: string; cells: Record<PlanKey, CompareCell> };
const all = (cell: CompareCell): Record<PlanKey, CompareCell> => ({ mini: cell, basic: cell, premium: cell, intelligence: cell, enterprise: cell });
const from = (first: PlanKey): Record<PlanKey, CompareCell> =>
  Object.fromEntries(planKeys.map((k) => [k, planKeys.indexOf(k) >= planKeys.indexOf(first)])) as Record<PlanKey, CompareCell>;

export const comparison: { group: string; rows: Row[] }[] = [
  {
    group: "platform",
    rows: [
      { key: "mobile", cells: all(true) },
      { key: "web", cells: from("basic") },
      { key: "windows", cells: from("basic") },
    ],
  },
  {
    group: "limits",
    rows: [
      { key: "branches", cells: { mini: 1, basic: 1, premium: 1, intelligence: 3, enterprise: "custom" } },
      { key: "staff", cells: { mini: "ownerOnly", basic: 2, premium: 5, intelligence: 10, enterprise: "custom" } },
      { key: "products", cells: { mini: false, basic: 1000, premium: 5000, intelligence: 20000, enterprise: "custom" } },
      { key: "customers", cells: all("unlimited") },
      { key: "transactions", cells: all("unlimited") },
    ],
  },
  {
    group: "khata",
    rows: [
      { key: "bakiLedger", cells: all(true) },
      { key: "collectionSummary", cells: all(true) },
      { key: "voice", cells: { mini: { perMonth: 100 }, basic: "creditBased", premium: "creditBased", intelligence: "creditBased", enterprise: "creditBased" } },
      { key: "sms", cells: { mini: "smsMini", basic: "wallet", premium: "wallet", intelligence: "wallet", enterprise: "wallet" } },
    ],
  },
  {
    group: "retail",
    rows: [
      { key: "salesPos", cells: from("basic") },
      { key: "purchases", cells: from("basic") },
      { key: "inventory", cells: from("basic") },
      { key: "expenses", cells: from("basic") },
      { key: "supplierLedger", cells: from("basic") },
      { key: "hardware", cells: { mini: false, basic: "supported", premium: "supported", intelligence: "supported", enterprise: "supported" } },
      { key: "basicReports", cells: from("basic") },
    ],
  },
  {
    group: "advanced",
    rows: [
      { key: "advancedInventory", cells: from("premium") },
      { key: "batchExpiry", cells: from("premium") },
      { key: "pharmacy", cells: from("premium") },
      { key: "stockAlerts", cells: from("premium") },
      { key: "profitLoss", cells: from("premium") },
    ],
  },
  {
    group: "branches",
    rows: [
      { key: "multiBranch", cells: from("intelligence") },
      { key: "crossBranch", cells: from("intelligence") },
      { key: "transfers", cells: from("intelligence") },
    ],
  },
  {
    group: "ai",
    rows: [
      { key: "aiCredits", cells: { mini: false, basic: { perMonth: 100 }, premium: { perMonth: 500 }, intelligence: { perMonth: 1500 }, enterprise: "custom" } },
      { key: "aiAssistant", cells: from("intelligence") },
      { key: "aiInsights", cells: from("intelligence") },
      { key: "aiSummaries", cells: from("intelligence") },
      { key: "customReports", cells: from("intelligence") },
    ],
  },
  {
    group: "data",
    rows: [
      { key: "export", cells: { mini: false, basic: "basicExport", premium: "fullExport", intelligence: "fullExport", enterprise: "custom" } },
      { key: "roles", cells: { mini: false, basic: false, premium: "basicRoles", intelligence: "advancedRoles", enterprise: "advancedRoles" } },
      { key: "auditLogs", cells: from("enterprise") },
      { key: "api", cells: from("enterprise") },
      { key: "prioritySupport", cells: { mini: false, basic: false, premium: true, intelligence: true, enterprise: "dedicated" } },
    ],
  },
];

/** Add-ons. price null = the label in pricing.addons.items[key].price (actual cost, wallet, etc.). */
export const addOns: { key: string; price: number | null }[] = [
  { key: "staff", price: 99 },
  { key: "branch", price: 399 },
  { key: "storage", price: 99 },
  { key: "storefront", price: 499 },
  { key: "analytics", price: 199 },
  { key: "domainManagement", price: 99 },
  { key: "domainRegistration", price: null },
  { key: "hardware", price: null },
];

export const creditPacks: { credits: number; price: number }[] = [
  { credits: 1000, price: 399 },
  { credits: 5000, price: 1799 },
  { credits: 15000, price: 4999 },
];

export const creditCosts: { key: string; credits: number }[] = [
  { key: "simple", credits: 1 },
  { key: "stock", credits: 1 },
  { key: "voice", credits: 2 },
  { key: "complex", credits: 3 },
  { key: "analysis", credits: 5 },
  { key: "report", credits: 10 },
];

/** Per SMS part, BDT. A Bangla SMS part holds up to 70 characters. */
export const smsRates = { nonMasking: 0.5, masking: 0.75, banglaCharsPerPart: 70 };
