"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { SITE } from "@/data/site";
import { formatPrice, type Category, type MenuItem } from "@/data/menu";
import {
  IconClose,
  IconInstagram,
  IconMap,
  IconWheatOff,
  IconLeaf,
  IconDropletOff,
  IconGlass,
  IconSpark,
} from "@/components/icons";

const TAG_ICON = {
  "sin-tacc": IconWheatOff,
  vegano: IconLeaf,
  "sin-lactosa": IconDropletOff,
  "con-alcohol": IconGlass,
  favorito: IconSpark,
} as const;

const TAG_TEXT = {
  "sin-tacc": "Sin TACC",
  vegano: "Vegano",
  "sin-lactosa": "Sin lactosa",
  "con-alcohol": "Con alcohol",
  favorito: "Favorito",
} as const;

export function TagBadge({ tag, className = "" }: { tag: keyof typeof TAG_ICON; className?: string }) {
  const Icon = TAG_ICON[tag];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-cream/12 bg-cream/6 px-2.5 py-1 text-[0.6875rem] text-cream-dim ${className}`}
    >
      <Icon className="size-3 text-caramel" />
      {TAG_TEXT[tag]}
    </span>
  );
}

export type DetailTarget = { item: MenuItem; category: Category } | null;

/**
 * Ficha informativa de un plato. La app no arma pedidos: no hay carrito, ni
 * cantidad, ni selector de variante/modificador. Esos datos se muestran como
 * informacion (variantes y opciones disponibles con su precio) y la accion
 * primaria es ir al local o escribir por Instagram.
 */
export function ItemDetail({
  target,
  onClose,
}: {
  target: DetailTarget;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<"variantes" | "modificadores">("variantes");

  useEffect(() => {
    if (!target) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [target, onClose]);

  useIsoLayoutEffect(() => {
    if (!target || !panelRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-sheet]", { clearProps: "all" });
        return;
      }
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo("[data-sheet-scrim]", { opacity: 0 }, { opacity: 1, duration: 0.45 })
        .fromTo(
          "[data-sheet]",
          { yPercent: 8, opacity: 0, scale: 0.97 },
          { yPercent: 0, opacity: 1, scale: 1, duration: 0.8 },
          0.05,
        )
        .from(
          "[data-sheet-stagger]",
          { y: 22, opacity: 0, duration: 0.7, stagger: 0.05 },
          0.2,
        )
        .from(
          "[data-sheet-img]",
          { scale: 1.16, duration: 1.3, ease: "expo.out" },
          0.05,
        );
    });
    return () => ctx.revert();
  }, [target]);

  if (!target) return null;
  const { item, category } = target;

  /* Precio de referencia: si hay variantes, se muestra "desde" la mas barata.
     La app no permite elegir, solo informar. */
  const variantPrices = item.variants?.map((v) => v.price) ?? [];
  const minPrice = variantPrices.length ? Math.min(...variantPrices) : item.price;
  const hasVariants = Boolean(item.variants?.length);
  const hasModifiers = Boolean(item.modifiers?.length);

  const handleClose = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    gsap.to("[data-sheet]", {
      yPercent: 6,
      opacity: 0,
      scale: 0.98,
      duration: 0.32,
      ease: "power2.in",
      onComplete: onClose,
    });
    gsap.to("[data-sheet-scrim]", { opacity: 0, duration: 0.32 });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
    >
      <button
        data-sheet-scrim
        type="button"
        aria-label="Cerrar"
        onClick={handleClose}
        className="absolute inset-0 cursor-default bg-ink-deep/80 backdrop-blur-md"
      />

      <div
        data-sheet
        ref={panelRef}
        className="glass-strong rim-lit relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[2rem] sm:rounded-[2rem]"
      >
        {/* Imagen */}
        <div className="relative h-52 shrink-0 overflow-hidden sm:h-64">
          <Image
            data-sheet-img
            src={item.image ?? category.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 56rem"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/35 to-transparent" />

          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar"
            className="glass-pill absolute top-4 right-4 grid size-10 cursor-pointer place-items-center rounded-full text-cream transition-transform duration-400 hover:scale-110"
          >
            <IconClose className="size-4" />
          </button>

          <div className="absolute bottom-4 left-5 flex flex-wrap items-center gap-2 sm:left-7">
            <span className="rounded-full bg-ink/70 px-3 py-1 font-mono text-[0.625rem] tracking-[0.22em] text-caramel uppercase backdrop-blur">
              {category.short}
            </span>
            {item.tags?.map((t) => (
              <TagBadge key={t} tag={t} className="bg-ink/50 backdrop-blur" />
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-5 pb-6 sm:px-7 sm:pb-7">
          <div className="flex items-start justify-between gap-5">
            <h3 data-sheet-stagger className="display-xl text-3xl text-cream sm:text-4xl">
              {item.name}
            </h3>
            <p className="shrink-0 text-right">
              <span className="block font-mono text-lg text-caramel tabular-nums">
                {hasVariants ? "desde " : ""}
                {formatPrice(minPrice)}
              </span>
              {hasVariants ? (
                <span className="mt-0.5 block font-mono text-[0.625rem] tracking-wider text-cream-faint uppercase">
                  {item.variants?.length} variantes
                </span>
              ) : null}
            </p>
          </div>

          {item.description && (
            <p data-sheet-stagger className="mt-3 max-w-2xl leading-relaxed text-cream-dim">
              {item.description}
            </p>
          )}

          {item.ingredients?.length ? (
            <div data-sheet-stagger className="mt-6">
              <p className="eyebrow mb-3">Ingredientes</p>
              <ul className="flex flex-wrap gap-2">
                {item.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="glass-pill rounded-full px-3.5 py-1.5 text-sm text-cream-dim"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Variantes y extras ya no son seleccionables: se listan como
              informacion de la carta, con su precio. */}
          {hasVariants || hasModifiers ? (
            <div data-sheet-stagger className="mt-6">
              <div className="mb-3 flex items-center gap-1 rounded-full bg-cream/5 p-1">
                {hasVariants ? (
                  <button
                    type="button"
                    onClick={() => setTab("variantes")}
                    aria-pressed={tab === "variantes"}
                    className={`flex-1 rounded-full px-4 py-2 text-xs tracking-wide transition-colors duration-300 ${
                      tab === "variantes"
                        ? "bg-cream/12 text-cream"
                        : "text-cream-dim hover:text-cream"
                    }`}
                  >
                    Variantes ({item.variants?.length})
                  </button>
                ) : null}
                {hasModifiers ? (
                  <button
                    type="button"
                    onClick={() => setTab("modificadores")}
                    aria-pressed={tab === "modificadores"}
                    className={`flex-1 rounded-full px-4 py-2 text-xs tracking-wide transition-colors duration-300 ${
                      tab === "modificadores"
                        ? "bg-cream/12 text-cream"
                        : "text-cream-dim hover:text-cream"
                    }`}
                  >
                    Extras ({item.modifiers?.length})
                  </button>
                ) : null}
              </div>

              <ul className="grid gap-2 sm:grid-cols-2">
                {tab === "variantes"
                  ? item.variants?.map((v) => (
                      <li
                        key={v.label}
                        className="flex items-center justify-between gap-3 rounded-xl border border-cream/10 bg-cream/3 px-4 py-3 text-sm text-cream-dim"
                      >
                        {v.label}
                        <span className="font-mono text-xs tabular-nums text-caramel">
                          {formatPrice(v.price)}
                        </span>
                      </li>
                    ))
                  : item.modifiers?.map((m) => (
                      <li
                        key={m.label}
                        className="flex items-center justify-between gap-3 rounded-xl border border-cream/10 bg-cream/3 px-4 py-3 text-sm text-cream-dim"
                      >
                        {m.label}
                        <span className="font-mono text-xs tabular-nums text-caramel">
                          +{formatPrice(m.price)}
                        </span>
                      </li>
                    ))}
              </ul>
            </div>
          ) : null}

          {category.note && (
            <p data-sheet-stagger className="mt-6 text-xs leading-relaxed text-cream-faint">
              {category.note}
            </p>
          )}
        </div>

        {/* Cierre: sin carrito. Se deriva a las canales reales del negocio. */}
        <div className="shrink-0 border-t border-cream/8 bg-ink-deep/40 px-5 py-4 backdrop-blur-xl sm:px-7">
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <a
              href={SITE.mapsShortUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-butter to-cream px-6 py-3.5 font-medium text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <IconMap className="size-4" />
              Cómo llegar
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="glass-pill inline-flex flex-1 items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-cream transition-colors hover:text-butter"
            >
              <IconInstagram className="size-4" />
              Consultas por Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
