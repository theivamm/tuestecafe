"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, revealSafety, useGsapContext, useIsoLayoutEffect } from "@/lib/gsap";
import { SITE, DELIVERIES } from "@/data/site";
import {
  IconPin,
  IconClock,
  IconPaw,
  IconArrowRight,
  IconTruck,
  LogoMark,
} from "@/components/icons";

/* Titular agrupado en 3 renglones explicitos. Antes era una palabra por
   `.reveal-line` (display:block) -> 6 renglones de una palabra, que es
   justamente el reporte del usuario. Cada palabra queda `inline-block` para
   que el reveal siga siendo por palabra sin imponer el salto de linea. */
const HEADLINE: { words: string[]; tone: string }[] = [
  { words: ["El", "café"], tone: "" },
  { words: ["de", "especialidad"], tone: "text-butter/90 italic" },
  { words: ["del", "barrio."], tone: "text-caramel" },
];

export function Hero() {
  const stage = useRef<HTMLDivElement>(null);

  useGsapContext(({ el }) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set("[data-hero]", { clearProps: "all" });
      return;
    }

    /* Si el ticker no avanza, el titular queda enmascarado para siempre. */
    const release = revealSafety(
      [".hero-line", ".hero-kicker > *", ".hero-sub", ".hero-chip"],
      3200,
    );

    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      onComplete: () => {
        release();
        gsap.set(".hero-media img", { clearProps: "filter" });
        /* `.hero-panel` queda fuera a proposito: su `transform` es propiedad
           del parallax de ScrollTrigger, limpiarlo lo dejaria en 0. */
        gsap.set(".hero-line, .hero-kicker > *, .hero-sub, .hero-chip", {
          clearProps: "transform,opacity",
        });
      },
    });

    /* --- Fondo: zoom-out cinematico + desaturacion que se resuelve --- */
    tl.fromTo(
      ".hero-media",
      { scale: 1.22, filter: "saturate(0.35) brightness(0.42) contrast(1.05)" },
      { scale: 1, filter: "saturate(0.92) brightness(0.62) contrast(1.02)", duration: 2.2 },
      0,
    )
      .fromTo(
        ".hero-veil",
        { opacity: 1 },
        { opacity: 0.55, duration: 2.2 },
        0,
      )

      /* --- Titulo: lineas enmascaradas --- */
      .fromTo(
        ".hero-line",
        { yPercent: 120, rotate: 3, opacity: 1 },
        { yPercent: 0, rotate: 0, opacity: 1, duration: 1.35, stagger: 0.075 },
        0.25,
      )

      /* --- Kicker + claim --- */
      .fromTo(
        ".hero-kicker > *",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.07 },
        0.85,
      )
      .fromTo(
        ".hero-sub",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        1,
      )

      /* --- Chips de datos --- */
      .fromTo(
        ".hero-chip",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.09 },
        1.15,
      )

      /* --- Panel de cristal --- */
      .fromTo(
        ".hero-panel",
        { y: 46, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.15, ease: "expo.out" },
        1.3,
      )

      /* --- Marco del logo --- */
      .fromTo(
        ".hero-mark",
        { scale: 0.7, opacity: 0, rotate: -18 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.5, ease: "elastic.out(1, 0.62)" },
        0.55,
      )
      .fromTo(
        ".hero-mark-ring",
        { scale: 0.85, opacity: 0.9 },
        { scale: 2.1, opacity: 0, duration: 2.4, ease: "power2.out", repeat: 1 },
        1.1,
      );

    /* --- Parallax del collage --- */
    const panels = gsap.utils.toArray<HTMLElement>(".hero-panel");
    panels.forEach((panel, i) => {
      gsap.to(panel, {
        yPercent: i % 2 === 0 ? -22 : 26,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    });

    /* --- Parallax del fondo --- */
    gsap.to(".hero-media", {
      yPercent: 16,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.8 },
    });

    /* --- Sello rotatorio --- */
    gsap.to(".hero-badge-spin", {
      rotate: 360,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1.4 },
    });
  }, []);

  /* --- Spotlight del collage segun el puntero --- */
  useIsoLayoutEffect(() => {
    const node = stage.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const setX = gsap.quickSetter(node, "--mx", "");
    const setY = gsap.quickSetter(node, "--my", "");

    const onMove = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      setX(((e.clientX - r.left) / r.width) * 100);
      setY(((e.clientY - r.top) / r.height) * 100);
      node.style.setProperty("--spot", "1");
    };
    const onLeave = () => {
      setX(50);
      setY(40);
      node.style.setProperty("--spot", "0");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    onLeave();

    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  /* --- Marquee infinito --- */
  const words = ["Tueste", "Barra de especialidad", "Caballito", "Horneado del día"];

  return (
    <header className="relative isolate overflow-hidden pt-28 pb-24 sm:pt-32 lg:pt-40 lg:pb-36">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ---------------------------------------------------- Copy -- */}
          <div className="relative z-10">
            <div className="hero-kicker mb-7 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="eyebrow inline-flex items-center gap-2">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full rounded-full bg-ember animate-pulse-ring" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-ember" />
                </span>
                {SITE.hours.days} · {SITE.hours.time}
              </span>
              <span className="h-px w-10 bg-cream/20" />
              <span className="font-mono text-[0.6875rem] tracking-[0.32em] text-cream-dim uppercase">
                {SITE.neighborhood}
              </span>
            </div>

            <h1 className="display-xl text-balance-tight text-[clamp(2.4rem,5.6vw,4.6rem)] text-cream">
              {HEADLINE.map((line, li) => (
                <span key={li} className="reveal-line">
                  {line.words.map((word, wi) => (
                    <span
                      key={word}
                      className={`hero-line inline-block ${line.tone} ${
                        wi < line.words.length - 1 ? "mr-[0.26em]" : ""
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="hero-sub mt-8 max-w-lg text-lg leading-relaxed text-cream-dim sm:text-xl">
              {SITE.tagline}. Un café con vos{" "}
              <span className="whitespace-nowrap">y tu mejor amigo</span>. specialty
              coffee de especialidad, brunch recién hecho y un lugar para quedarse
              un rato largo.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#menu"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-b from-butter to-cream px-7 py-3.5 font-medium text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10">Ver el menú</span>
                <IconArrowRight className="relative z-10 size-4 transition-transform duration-500 group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cocoa to-caramel transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <span className="absolute inset-0 z-0 bg-butter" />
              </a>

              <a
                href={SITE.mapsShortUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="glass-pill group inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-sm text-cream transition-colors hover:text-butter"
              >
                <IconPin className="size-4 text-caramel transition-transform duration-500 group-hover:-translate-y-0.5" />
                Cómo llegar
              </a>
            </div>

            {/* Chips de datos */}
            <div className="mt-12 grid max-w-xl gap-3 sm:grid-cols-3">
              <div className="hero-chip glass rounded-2xl px-4 py-3.5">
                <IconPin className="mb-2 size-4 text-caramel" />
                <p className="text-sm font-medium text-cream">{SITE.address.street}</p>
                <p className="text-xs text-cream-faint">{SITE.address.city}</p>
              </div>
              <div className="hero-chip glass rounded-2xl px-4 py-3.5">
                <IconClock className="mb-2 size-4 text-caramel" />
                <p className="text-sm font-medium text-cream">{SITE.hours.time}</p>
                <p className="text-xs text-cream-faint">Todos los días</p>
              </div>
              <div className="hero-chip glass rounded-2xl px-4 py-3.5">
                <IconPaw className="mb-2 size-4 text-caramel" />
                <p className="text-sm font-medium text-cream">Pets bienvenidos</p>
                <p className="text-xs text-cream-faint">Con vos y tu perro</p>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------- Collage -- */}
          <div ref={stage} className="hero-stage relative z-0">
            <div className="relative aspect-[4/4.4] w-full">
              {/* Panel principal. `inset-0` es obligatorio: sin `bottom` el
                  `figure` queda con height 0 y next/image avisa que el `fill`
                  no tiene alto -> la imagen del hero no se veía. */}
              <figure className="hero-panel glass-refract rim-lit absolute inset-0 overflow-hidden rounded-[2rem]">
                <div className="hero-media relative size-full">
                  <Image
                    src="/img/hero-02.jpg"
                    alt="Barra de café de especialidad en Tueste"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 46vw"
                    className="object-cover"
                  />
                  <div className="hero-veil absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,rgba(30,30,30,0.15)_0%,rgba(30,30,30,0.75)_100%)]" />
                </div>
              </figure>

              {/* Panel secundario */}
              <figure
                className="hero-panel glass rounded-[1.6rem] absolute -bottom-6 -left-4 hidden aspect-[4/3] w-[54%] overflow-hidden sm:block lg:-left-10"
                style={{ zIndex: 3 }}
              >
                <Image
                  src="/img/hero-04.jpg"
                  alt="Detalle de café servido en Tueste"
                  fill
                  sizes="(max-width: 1024px) 45vw, 25vw"
                  className="object-cover"
                />
              </figure>

              {/* Panel terciario */}
              <figure
                className="hero-panel glass rounded-[1.4rem] absolute -right-3 bottom-24 hidden aspect-square w-[30%] overflow-hidden xl:block"
                style={{ zIndex: 3 }}
              >
                <Image
                  src="/img/hero-01.jpg"
                  alt="Barra de Tueste Café en Caballito"
                  fill
                  sizes="14vw"
                  className="object-cover"
                />
              </figure>

              {/* Insignia flotante */}
              <div
                className="hero-panel absolute -top-6 -right-3 z-20 grid size-28 place-items-center sm:-right-8 sm:size-32"
                style={{ zIndex: 4 }}
              >
                <div className="hero-mark-ring absolute inset-0 rounded-full border border-caramel/45" />
                <div className="glass-strong absolute inset-0 rounded-full" />
                <div className="hero-badge-spin absolute inset-0 rounded-full">
                  <svg viewBox="0 0 200 200" className="size-full animate-[spin_28s_linear_infinite]">
                    <defs>
                      <path
                        id="hero-circle"
                        d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
                      />
                    </defs>
                    <text
                      className="fill-caramel font-mono"
                      style={{ fontSize: 15, letterSpacing: "0.24em" }}
                    >
                      <textPath href="#hero-circle" startOffset="2%">
                        CAFÉ DE ESPECIALIDAD · BARRIO CABALLITO ·
                      </textPath>
                    </text>
                  </svg>
                </div>
                <LogoMark className="hero-mark size-10 text-butter sm:size-11" />
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------------- Marquee strip -- */}
        {/* Info del negocio: la app no toma pedidos, solo dice donde hay delivery. */}
        <div className="mt-24 lg:mt-32">
          <div className="glass flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl px-5 py-4 sm:px-7">
            <span className="font-mono text-[0.6875rem] tracking-[0.28em] text-cream-faint uppercase">
              Envíos
            </span>
            <span className="hidden h-4 w-px bg-cream/15 sm:block" />
            <span className="text-sm text-cream-dim">
              Encontranos en{" "}
              <span className="text-cream">Rappi</span> y{" "}
              <span className="text-cream">Mercado Delivery</span>
            </span>
            <span className="hidden h-4 w-px bg-cream/15 sm:block" />
            <a
              href={DELIVERIES[0].href}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-butter"
            >
              <IconTruck className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              Rappi
            </a>
            <a
              href={DELIVERIES[1].href}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-butter"
            >
              <IconTruck className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              Mercado Delivery
            </a>
            <span className="ml-auto hidden font-mono text-[0.6875rem] tracking-[0.2em] text-cream-faint uppercase md:block">
              {words.join("  ·  ")}
            </span>
          </div>
        </div>
      </div>

    </header>
  );
}
