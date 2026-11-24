"use client";

import { motion, useReducedMotion } from "motion/react";
import { Sketch } from "@/lib/sketch";
import { P, Wash, quad, palette as c } from "@/components/illustrations/ink";

/**
 * The gamchha and the small blue cloth on the apartment's laundry line, on their own layer so they
 * can sway in a gentle breeze without re-filtering the street. Each swings from where it's pinned
 * (top edge), with a slow, uneven rhythm; the lighter cloth moves a little more.
 */
export function HeroLaundry() {
  const reduce = useReducedMotion();
  const s = new Sketch(9701);
  const gamchha = quad([[1196, 288], [1240, 290], [1238, 338], [1198, 336]]);
  const cloth = quad([[1258, 288], [1282, 288], [1284, 326], [1256, 326]]);

  return (
    <g aria-hidden="true">
      {/* Gamchha: heavier, slow sway with a soft ripple along the bottom */}
      <motion.g
        style={{ originX: 0.5, originY: 0 }}
        animate={reduce ? undefined : { rotate: [0, 1.8, -0.6, 1.2, -1, 0], skewX: [0, -1.5, 0.8, -1, 0.6, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <g filter="url(#hk-wobble)">
          <Wash d={gamchha} fill={c.vermilion} o={0.65} />
          {[1205, 1214, 1223, 1232].map((x) => (
            <P key={x} d={s.line(x, 290, x, 336, 0.3, 1)} w={0.9} c={c.leafDeep} o={0.7} />
          ))}
          {[300, 312, 324].map((y) => (
            <P key={y} d={s.line(1198, y, 1238, y, 0.3, 1)} w={0.9} c={c.leafDeep} o={0.7} />
          ))}
          <P d={s.poly([[1196, 288], [1240, 290], [1238, 338], [1198, 336]], true, 0.3, 1)} w={1} />
        </g>
      </motion.g>

      {/* Light blue cloth: a little livelier, out of step with the gamchha */}
      <motion.g
        style={{ originX: 0.5, originY: 0 }}
        animate={reduce ? undefined : { rotate: [0, 3, -1.2, 2.2, -2, 0], skewX: [0, -2.5, 1.2, -1.5, 1, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <g filter="url(#hk-wobble)">
          <Wash d={cloth} fill={c.sky} o={0.55} />
          <P d={s.poly([[1258, 288], [1282, 288], [1284, 326], [1256, 326]], true, 0.3, 1)} w={1} />
        </g>
      </motion.g>
    </g>
  );
}
