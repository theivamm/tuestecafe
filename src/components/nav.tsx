"use client";

import { useEffect, useState } from "react";
import { gsap, revealSafety, useIsoLayoutEffect } from "@/lib/gsap";
import { SITE } from "@/data/site";
import { LogoMark, LogoWordmark, IconMap, IconInstagram } from "@/components/icons";

const LINKS = [
  { href: "#menu", label: "Menú" },
  { href: "#desayuno", label: "Comer" },
  { href: "#cafe", label: "Café" },
  { href: "#pasteleria", label: "Postres" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useIsoLayoutEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-nav-item]");
    if (!items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(items, { clearProps: "all" });
      return;
    }
    /* `fromTo` + `clearProps` + failsafe: con `from` pelado, si el tween no
       llega a avanzar la navbar se queda en `opacity:0` para siempre, que fue
       exactamente el bug reportado. */
    const release = revealSafety(items, 1600);
    gsap.fromTo(
      items,
      { y: -18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.06,
        delay: 0.15,
        clearProps: "transform,opacity",
        onComplete: release,
      },
    );
    return release;
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-[88rem] items-center gap-3 rounded-2xl px-3.5 py-2.5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5 ${
          scrolled ? "glass-strong" : "glass"
        }`}
      >
        <a href="#top" data-nav-item className="group flex shrink-0 items-center gap-2.5">
          <LogoMark className="size-8 text-butter transition-transform duration-700 group-hover:rotate-[18deg]" />
          <LogoWordmark className="hidden h-6 w-auto text-cream sm:block" />
          <span className="sr-only sm:hidden">Tueste Café</span>
        </a>

        <ul className="ml-2 hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href} data-nav-item>
              <a
                href={link.href}
                className="relative rounded-full px-3.5 py-2 text-sm text-cream-dim transition-colors duration-300 hover:text-cream after:absolute after:inset-x-3.5 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-caramel after:transition-transform after:duration-500 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* La app es informativa: no hay carrito. Las acciones son Contacto. */}
        <div className="ml-auto flex items-center gap-2">
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            data-nav-item
            aria-label="Tueste Café en Instagram"
            className="glass-pill hidden size-10 place-items-center rounded-full text-cream transition-colors hover:text-butter sm:grid"
          >
            <IconInstagram className="size-4" />
          </a>

          <a
            href={SITE.mapsShortUrl}
            target="_blank"
            rel="noreferrer noopener"
            data-nav-item
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-b from-butter to-cream py-2.5 pr-4 pl-4 text-sm font-medium text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] active:scale-[0.97]"
          >
            <IconMap className="size-4" />
            <span className="hidden sm:inline">Cómo llegar</span>
            <span className="sm:hidden">Llegar</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
