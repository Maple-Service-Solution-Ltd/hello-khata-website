/**
 * The HelloKhata app mark: a green rounded square with a white speech bubble holding a voice wave, and a gold
 * bookmark (the khata) on its corner. Drawn from the official logo; the same shapes are in /src/app/icon.svg.
 */
export const brandColors = {
  mark: "#0F5B41",
  markDeep: "#0B4A34",
  ink: "#0D3C2B",
  gold: "#B1873C",
  bookmark: "#D2A54E",
} as const;

/** The mark's drawing on a 100×100 canvas, shared by the component and the favicon / share image. */
export const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="hk-mark-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${brandColors.mark}"/><stop offset="1" stop-color="${brandColors.markDeep}"/></linearGradient></defs><rect width="100" height="100" rx="22" fill="url(#hk-mark-bg)"/><path d="M24 19h52a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8H40L28 83V71h-4a8 8 0 0 1-8-8V27a8 8 0 0 1 8-8z" fill="#fff"/><g stroke="${brandColors.mark}" stroke-width="5" stroke-linecap="round"><path d="M29 40v10"/><path d="M37 33v24"/><path d="M45 27v36"/><path d="M53 34v22"/><path d="M61 40v10"/></g><path d="M64 9h12v28l-6-5-6 5z" fill="${brandColors.bookmark}"/></svg>`;

export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {/* Solid fill (no gradient id) so the mark can appear several times on one page */}
      <rect width="100" height="100" rx="22" fill={brandColors.mark} />
      {/* Speech bubble with its tail at the bottom left */}
      <path d="M24 19h52a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8H40L28 83V71h-4a8 8 0 0 1-8-8V27a8 8 0 0 1 8-8z" fill="#fff" />
      {/* Voice wave */}
      <g stroke={brandColors.mark} strokeWidth="5" strokeLinecap="round">
        <path d="M29 40v10" />
        <path d="M37 33v24" />
        <path d="M45 27v36" />
        <path d="M53 34v22" />
        <path d="M61 40v10" />
      </g>
      {/* Gold bookmark: the khata */}
      <path d="M64 9h12v28l-6-5-6 5z" fill={brandColors.bookmark} />
    </svg>
  );
}
