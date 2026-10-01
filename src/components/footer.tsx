"use client";

import { useRef } from "react";
import { gsap, useGsapContext } from "@/lib/gsap";
import { SITE, DELIVERIES } from "@/data/site";
import { CATEGORIES } from "@/data/menu";
import {
  LogoMark,
  LogoWordmark,
  IconPin,
  IconClock,
  IconInstagram,
  IconMap,
  IconTruck,
  IconPaw,
  IconArrowRight,
} from "@/components/icons";

const YEAR = new Date().getFullYear();

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(({ el }) => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-foot-stagger]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });

      gsap.from("[data-foot-line]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} id="contacto" className="relative mt-32">
      {/* ------------------------------------------------- CTA strip -- */}
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <div className="glass-strong rim-lit relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_15%_0%,rgba(217,143,63,0.18)_0%,transparent_58%)]"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_auto] lg:items-end">
            <div data-foot-stagger>
              <p className="eyebrow mb-4">Te esperamos</p>
              <h2 className="display-xl text-balance-tight text-[clamp(2rem,5.4vw,3.8rem)] text-cream">
                Un café con vos
                <br />
                <span className="text-caramel italic">y tu mejor amigo.</span>
              </h2>
              <p className="mt-5 max-w-md text-cream-dim">
                {SITE.hours.days} de {SITE.hours.time} en {SITE.address.street},{" "}
                {SITE.address.city}. Traé a tu perro, la barra lo banker.
              </p>
            </div>

            <div data-foot-stagger className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={SITE.mapsShortUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-b from-butter to-cream px-7 py-4 font-medium text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <IconMap className="size-4" />
                Cómo llegar
                <IconArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="glass-pill inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-cream transition-colors hover:text-butter"
              >
                <IconInstagram className="size-4" />
                @tueste.cafe
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------- Cuerpo -- */}
      <div className="mx-auto mt-20 w-full max-w-[88rem] px-5 sm:px-8">
        <div data-foot-line className="hairline" />

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Marca */}
          <div data-foot-stagger>
            <a href="#top" className="group flex items-center gap-2.5">
              <LogoMark className="size-9 text-butter transition-transform duration-700 group-hover:rotate-[18deg]" />
              <LogoWordmark className="h-6 w-auto text-cream" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-dim">
              {SITE.claim}. {SITE.tagline}.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-caramel">
              <IconPaw className="size-4" />
              Pets bienvenidos
            </p>
          </div>

          {/* Menú */}
          <nav data-foot-stagger aria-label="Categorías del menú">
            <p className="eyebrow mb-4">El menú</p>
            <ul className="flex flex-col gap-2.5">
              {CATEGORIES.slice(0, 7).map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-cream-dim transition-colors hover:text-cream"
                  >
                    <span className="h-px w-0 bg-caramel transition-all duration-500 group-hover:w-4" />
                    {c.short}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Dónde */}
          <div data-foot-stagger>
            <p className="eyebrow mb-4">Dónde estamos</p>
            <address className="flex flex-col gap-4 not-italic">
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex gap-3 text-sm text-cream-dim transition-colors hover:text-cream"
              >
                <IconPin className="mt-0.5 size-4 shrink-0 text-caramel" />
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.country} {SITE.address.postalCode}
                </span>
              </a>
              <p className="flex gap-3 text-sm text-cream-dim">
                <IconClock className="mt-0.5 size-4 shrink-0 text-caramel" />
                <span>
                  {SITE.hours.days}
                  <br />
                  {SITE.hours.time}
                </span>
              </p>
            </address>
          </div>

          {/* Social + delivery. La app no toma pedidos: esto solo informa
              donde encontrar al local y por qué canales. */}
          <div data-foot-stagger>
            <p className="eyebrow mb-4">Envíos y redes</p>

            <div className="flex flex-col gap-2.5">
              {DELIVERIES.map((d) => (
                <a
                  key={d.id}
                  href={d.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="glass-card glass-hover flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-cream transition-colors"
                >
                  <IconTruck className="size-4 shrink-0 text-caramel" />
                  {d.name}
                  <IconArrowRight className="ml-auto size-3.5 text-cream-faint" />
                </a>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              {[
                { href: SITE.instagramUrl, label: "Instagram", Icon: IconInstagram },
                {
                  href: SITE.mapsShortUrl,
                  label: "Google Maps",
                  Icon: IconMap,
                },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="glass-pill grid size-11 place-items-center rounded-full text-cream transition-transform duration-500 hover:scale-110 hover:text-butter"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --------------------------------------------------- Legal -- */}
        <div data-foot-line className="hairline" />

        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-cream-faint uppercase">
            © {YEAR} {SITE.name} · {SITE.address.city}
          </p>
          <p className="flex items-center gap-2 text-xs text-cream-faint">
            Tueste propio · Specialty coffee ·{" "}
            <span className="text-caramel">{SITE.neighborhood}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
