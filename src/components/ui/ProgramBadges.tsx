/* eslint-disable @next/next/no-img-element -- third-party badges must be shown unaltered at fixed sizes; next/image adds nothing here */

/**
 * Startup-programme badges, shown exactly as supplied (no recolouring, cropping or resizing).
 *
 * - NVIDIA Inception: official "for screen" RGB badge from the Inception kit, self-hosted in /public/badges.
 * - PostHog: the official "Built with PostHog" embed (dark variant for the dark footer), loaded from
 *   brand.posthog.com and linked back as their guidelines require. Minimum size 100×50; must not imply
 *   endorsement or partnership. If the site adds a Content Security Policy, allow https://brand.posthog.com in img-src.
 */
export function ProgramBadges({ className }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      <li>
        <a href="https://www.nvidia.com/en-us/startups/" target="_blank" rel="noopener noreferrer" className="block">
          <img src="/badges/nvidia-inception-program.svg" alt="NVIDIA Inception Program" width={116} height={50} loading="lazy" decoding="async" />
        </a>
      </li>
      <li>
        <a href="https://posthog.com/?utm_source=badge&utm_medium=referral&utm_content=posthog-badge-dark" target="_blank" rel="noopener" className="block">
          <img src="https://brand.posthog.com/badges/posthog-badge-dark.svg" alt="Built with PostHog" width={100} height={50} loading="lazy" decoding="async" />
        </a>
      </li>
    </ul>
  );
}
