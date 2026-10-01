"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger, Flip);
  /* En mobile la barra de direcciones cambia el alto del viewport al scrollear,
     lo que dispara `refresh()` y recalcula todos los triggers: el documento
     "salta" a mitad de lectura. Se ignora ese resize. */
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Revelado por líneas: cada hijo `[data-reveal-line]` sube desde debajo de su
 * máscara con un stagger. Es el movimiento firma de la marca.
 *
 * Se usa `fromTo` (y no `from`) a propósito: `from` deja el estado inicial
 * aplicado como estilo inline y, si el tween no llega a avanzar, el elemento
 * queda invisible para siempre. `fromTo` + `clearProps` es determinista.
 */
export function maskReveal(targets: gsap.TweenTarget, options?: gsap.TweenVars) {
  const reduced = prefersReducedMotion();
  if (reduced) {
    gsap.set(targets, { clearProps: "all" });
    return gsap.timeline();
  }
  return gsap.fromTo(
    targets,
    { yPercent: 118, rotate: 2.5, opacity: 0 },
    {
      yPercent: 0,
      rotate: 0,
      opacity: 1,
      duration: 1.15,
      ease: "expo.out",
      stagger: 0.09,
      clearProps: "transform,opacity",
      ...options,
    },
  );
}

/** Aparición suave para bloques (sin máscara). */
export function softReveal(targets: gsap.TweenTarget, options?: gsap.TweenVars) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { clearProps: "all" });
    return gsap.timeline();
  }
  return gsap.fromTo(
    targets,
    { y: 34, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      stagger: 0.07,
      clearProps: "transform,opacity",
      ...options,
    },
  );
}

/** Anima el ángulo del borde especular (`.rim`). */
export function spinRim(el: gsap.DOMTarget) {
  if (prefersReducedMotion()) return;
  gsap.to(el, {
    "--rim-angle": "360deg",
    duration: 9,
    ease: "none",
    repeat: -1,
  });
}

/**
 * Red de seguridad para revelados.
 *
 * `gsap.from`/`fromTo` escriben el estado inicial como estilo inline en el
 * momento de crearse; si el ticker no llega a avanzar (main thread bloqueado,
 * pestaña en background, o un navegador donde GSAP no inicializa) el elemento
 * queda invisible de forma permanente. Esta funcion garantiza que, pase lo que
 * pase, el contenido vuelve a su estado natural pasado `ms`.
 */
export function revealSafety(
  targets: gsap.TweenTarget,
  ms: number,
  props = "transform,opacity",
) {
  if (typeof window === "undefined") return () => {};
  const id = window.setTimeout(() => {
    gsap.set(targets, { clearProps: props });
  }, ms);
  return () => window.clearTimeout(id);
}

export function useGsapContext(
  setup: (ctx: { el: HTMLElement; gsap: typeof gsap }) => void,
  deps: React.DependencyList = [],
) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context((self) => setup({ el, gsap: self.gsap ?? gsap }), el);
    return () => ctx.revert();
  }, deps);

  return ref;
}

export { gsap, ScrollTrigger, Flip };
