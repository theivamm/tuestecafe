"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { formatPrice, type Category, type MenuItem } from "@/data/menu";
import { TagBadge } from "@/components/item-detail";
import { IconArrowRight } from "@/components/icons";

type Props = {
  item: MenuItem;
  category: Category;
  onOpen: (target: { item: MenuItem; category: Category }) => void;
  /** Resalta coincidencias en el nombre. */
  render?: (name: string) => React.ReactNode;
};

/* -------------------------------------------------------------- Cards -- */

export function MenuCard({ item, category, onOpen, render }: Props) {
  const card = useRef<HTMLElement>(null);
  const name = render ? render(item.name) : item.name;

  useIsoLayoutEffect(() => {
    const node = card.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    /* Hay ~120 cards en el DOM. Registrar los listeners de puntero en todas
       a la vez genera hundreds de quickTo activos y callbacks por frame; solo
       las visibles en el viewport (con margen) los necesitan. El zoom de la
       imagen ya lo hace CSS con `group-hover`, asi que acá no hay quickTo. */
    let rotateX: ReturnType<typeof gsap.quickTo> | null = null;
    let rotateY: ReturnType<typeof gsap.quickTo> | null = null;

    const onMove = (e: PointerEvent) => {
      if (!rotateX || !rotateY) return;
      const r = node.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rotateY(px * 7);
      rotateX(py * -7);
    };
    const onLeave = () => {
      rotateX?.(0);
      rotateY?.(0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !rotateX) {
            rotateX = gsap.quickTo(node, "rotationX", { duration: 0.7, ease: "power3" });
            rotateY = gsap.quickTo(node, "rotationY", { duration: 0.7, ease: "power3" });
            node.addEventListener("pointermove", onMove);
            node.addEventListener("pointerleave", onLeave);
          } else if (!entry.isIntersecting && rotateX) {
            node.removeEventListener("pointermove", onMove);
            node.removeEventListener("pointerleave", onLeave);
            rotateX = null;
            rotateY = null;
          }
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      gsap.to(node, { rotationX: 0, rotationY: 0 });
    };
  }, []);

  return (
    <article
      ref={card}
      data-flip-id={item.id}
      className="glass-card glass-hover rim rim-hover group relative flex flex-col overflow-hidden rounded-[1.4rem] [transform-style:preserve-3d] [perspective:900px]"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={item.image ?? category.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
          className="object-cover transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/20 to-transparent opacity-90" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.tags?.slice(0, 2).map((t) => (
            <TagBadge key={t} tag={t} />
          ))}
        </div>

        {item.variants?.length ? (
          <span className="absolute top-3 right-3 rounded-full bg-ink/72 px-2.5 py-1 font-mono text-[0.625rem] tracking-wider text-cream-dim outline-1 outline-offset-[-1px] outline-white/12">
            {item.variants.length} opciones
          </span>
        ) : null}

        <p className="price-glow absolute right-4 bottom-3 font-mono text-lg text-butter tabular-nums">
          {formatPrice(item.price)}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <h3 className="text-lg leading-snug text-cream">{name}</h3>
        {item.description ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-cream-dim">
            {item.description}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <button
            type="button"
            onClick={() => onOpen({ item, category })}
            className="group/link inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium tracking-wide text-caramel transition-colors hover:text-butter"
          >
            Ver detalle
            <IconArrowRight className="size-3.5 transition-transform duration-500 group-hover/link:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* --------------------------------------------------------------- Rows -- */

export function MenuRow({ item, category, onOpen, render }: Props) {
  const row = useRef<HTMLElement>(null);
  const name = render ? render(item.name) : item.name;

  useIsoLayoutEffect(() => {
    const node = row.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let xTo: ReturnType<typeof gsap.quickTo> | null = null;
    const onMove = (e: PointerEvent) => {
      if (!xTo) return;
      const r = node.getBoundingClientRect();
      xTo(((e.clientX - r.left) / r.width - 0.5) * 8);
    };
    const onLeave = () => xTo?.(0);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !xTo) {
            xTo = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3" });
            node.addEventListener("pointermove", onMove);
            node.addEventListener("pointerleave", onLeave);
          } else if (!entry.isIntersecting && xTo) {
            node.removeEventListener("pointermove", onMove);
            node.removeEventListener("pointerleave", onLeave);
            xTo = null;
          }
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <article
      ref={row}
      data-flip-id={item.id}
      className="glass-card glass-hover rim rim-hover group relative flex items-center gap-4 overflow-hidden rounded-2xl p-2.5 sm:gap-5 sm:p-3"
    >
      <button
        type="button"
        onClick={() => onOpen({ item, category })}
        aria-label={`Ver ${item.name}`}
        className="relative aspect-square w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl sm:w-24"
      >
        <Image
          src={item.image ?? category.image}
          alt={item.name}
          fill
          sizes="6rem"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink-deep/40 to-transparent" />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-base leading-tight text-cream sm:text-lg">{name}</h3>
          {item.tags?.slice(0, 2).map((t) => (
            <TagBadge key={t} tag={t} />
          ))}
        </div>
        {item.description ? (
          <p className="mt-1 line-clamp-1 text-sm text-cream-dim sm:line-clamp-2">
            {item.description}
          </p>
        ) : null}
        {item.variants?.length ? (
          <p className="mt-1 font-mono text-[0.6875rem] text-cream-faint">
            {item.variants.map((v) => `${v.label} ${formatPrice(v.price)}`).join("  ·  ")}
          </p>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
        <span className="font-mono text-base text-butter tabular-nums sm:text-lg">
          {formatPrice(item.price)}
        </span>
        <button
          type="button"
          onClick={() => onOpen({ item, category })}
          className="group/link inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium tracking-wide text-caramel transition-colors hover:text-butter"
        >
          Ver detalle
          <IconArrowRight className="size-3.5 transition-transform duration-500 group-hover/link:translate-x-1" />
        </button>
      </div>
    </article>
  );
}
