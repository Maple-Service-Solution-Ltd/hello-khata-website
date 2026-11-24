/**
 * Shared SVG filters referenced by every illustration:
 *  - hk-wobble: subtle displacement that gives vector strokes a hand-inked tremor
 *  - hk-wash:   watercolour bleed for colour fills
 */
export function InkDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <filter id="hk-wobble" x="-3%" y="-3%" width="106%" height="106%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="1" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="hk-wash" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="8" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="0.8" result="b" />
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="2" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.25" result="mask" />
          <feComposite in="b" in2="mask" operator="in" />
        </filter>
        {/* The same two effects scaled for small 100×100 drawings (product pictures) */}
        <filter id="hk-wobble-sm" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="1" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="hk-wash-sm" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.09" numOctaves="2" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="4.5" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="0.5" result="b" />
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="4" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.3" result="mask" />
          <feComposite in="b" in2="mask" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
