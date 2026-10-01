"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Flip, ScrollTrigger, gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";
import {
  CATEGORIES,
  TAG_FILTERS,
  formatPrice,
  searchIndex,
  type Category,
  type MenuItem,
  type Tag,
} from "@/data/menu";
import { MenuCard, MenuRow } from "@/components/menu-items";
import { ItemDetail, type DetailTarget } from "@/components/item-detail";
import { IconSearch, IconClose, IconGrid, IconRows, IconSliders, IconCheck } from "@/components/icons";

type View = "cards" | "rows";

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Resalta coincidencias sin usar dangerouslySetInnerHTML. */
function Highlight({ text, query }: { text: string; query: string }) {
  const q = normalize(query).trim();
  if (q.length < 2) return <>{text}</>;

  const haystack = normalize(text);
  const idx = haystack.indexOf(q);
  if (idx === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent font-medium text-butter underline decoration-caramel/60 decoration-1 underline-offset-4">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export function MenuExplorer() {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const [view, setView] = useState<View>("cards");
  const [detail, setDetail] = useState<DetailTarget>(null);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  /* ------------------------------------------------------- Filtrado -- */

  const filtered = useMemo(() => {
    const q = normalize(query).trim();

    return CATEGORIES.map((category) => {
      const items = category.items.filter((item) => {
        const matchesQuery = !q || searchIndex(item, category).includes(q);
        const matchesTags = activeTags.every((t) => item.tags?.includes(t));
        return matchesQuery && matchesTags;
      });
      return { category, items };
    }).filter((g) => g.items.length > 0);
  }, [query, activeTags]);

  const totalResults = useMemo(
    () => filtered.reduce((n, g) => n + g.items.length, 0),
    [filtered],
  );
  const totalItems = useMemo(
    () => CATEGORIES.reduce((n, c) => n + c.items.length, 0),
    [],
  );

  const filtersActive = query.trim().length > 0 || activeTags.length > 0;

  /* ------------------------------------------------- Flip transitions -- */

  const captureFlip = useCallback(() => {
    if (prefersReducedMotion()) return;
    flipState.current = Flip.getState(rootRef.current?.querySelectorAll("[data-flip-id]") ?? []);
  }, []);

  useIsoLayoutEffect(() => {
    if (!flipState.current) return;
    const state = flipState.current;
    flipState.current = null;
    Flip.from(state, {
      duration: 0.72,
      ease: "power3.inOut",
      absolute: true,
      scale: false,
      stagger: 0.008,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.94, filter: "blur(6px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" },
        ),
      onLeave: (els) =>
        gsap.to(els, { opacity: 0, scale: 0.95, duration: 0.28, ease: "power2.in" }),
      /* `absolute: true` saca los elementos del flujo, asi que la altura del
         documento recien se estabiliza cuando el Flip termina. Refrescar
         aca (y no en el efecto) evita recalcular triggers a mitad de animacion,
         que era el salto de scroll al filtrar. */
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [view, query, activeTags, filtered]);

  /* ------------------------------------------------- Scroll spy rail -- */

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-menu-section]"),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveCategory(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [filtered]);

  /* El rail mantiene visible la categoría activa.
     OJO: esto NO puede usar `scrollIntoView`. Ese metodo desplaza *todos* los
     ancestros scrolleables, incluido el documento, asi que al actualizarse la
     categoria activa (que dispara el scroll-spy de arriba) el rail "tiraba" la
     pagina hacia arriba y se comia el scroll de los links de ancla. Acá se
     mueve unicamente el `scrollLeft` del rail. */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const pill = rail.querySelector<HTMLElement>(`[data-rail-pill="${activeCategory}"]`);
    if (!pill) return;

    const max = rail.scrollWidth - rail.clientWidth;
    if (max <= 0) return;

    const railRect = rail.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    const delta = pillRect.left - railRect.left - (rail.clientWidth - pillRect.width) / 2;

    rail.scrollTo({
      left: Math.max(0, Math.min(rail.scrollLeft + delta, max)),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [activeCategory]);

  /* ------------------------------------------------- Reveal por sección --
     Se registra una sola vez: si se re-creara en cada cambio de filtro,
     `ctx.revert()` devolveria los items a opacity:0 y parpadearian. */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-menu-section]"),
    );
    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        gsap.from(section.querySelectorAll("[data-reveal]"), {
          y: 44,
          opacity: 0,
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.055,
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  /* --------------------------------------------------------- Atajos -- */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape" && typing) {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTag = (tag: Tag) => {
    captureFlip();
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const setViewMode = (mode: View) => {
    if (mode === view) return;
    captureFlip();
    setView(mode);
  };

  const clearAll = () => {
    captureFlip();
    setQuery("");
    setActiveTags([]);
  };

  const openItem = (target: { item: MenuItem; category: Category }) => setDetail(target);

  const highlightName = useCallback(
    (name: string) => <Highlight text={name} query={query} />,
    [query],
  );

  return (
    <section id="menu" className="relative">
      <div ref={rootRef}>
        {/* ------------------------------------------------- Toolbar -- */}
        <div className="sticky top-[5.25rem] z-40 -mx-5 mb-10 px-5 py-3 sm:-mx-8 sm:px-8 lg:top-[5.5rem]">
          <div className="glass-strong rim-lit rounded-[1.35rem] p-3 sm:p-3.5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Buscador */}
              <div className="relative flex-1">
                <IconSearch className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-cream-faint" />
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => {
                    captureFlip();
                    setQuery(e.target.value);
                  }}
                  placeholder="Buscar plato, ingrediente o té…"
                  aria-label="Buscar en el menú"
                  className="w-full rounded-xl border border-cream/10 bg-cream/4 py-3.5 pr-24 pl-11 text-base text-cream transition-colors duration-400 outline-none placeholder:text-cream-faint focus:border-caramel/60 focus:bg-cream/6"
                />
                <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
                  {query ? (
                    <button
                      type="button"
                      onClick={() => {
                        captureFlip();
                        setQuery("");
                      }}
                      aria-label="Limpiar búsqueda"
                      className="grid size-7 cursor-pointer place-items-center rounded-full text-cream-dim transition-colors hover:bg-cream/10 hover:text-cream"
                    >
                      <IconClose className="size-3.5" />
                    </button>
                  ) : (
                    <kbd className="glass-pill hidden rounded-md px-1.5 py-0.5 font-mono text-[0.625rem] text-cream-faint sm:block">
                      /
                    </kbd>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((v) => !v)}
                  aria-expanded={filtersOpen}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-3 text-sm transition-all duration-400 ${
                    activeTags.length
                      ? "border-caramel/60 bg-caramel/14 text-butter"
                      : "border-cream/10 bg-cream/4 text-cream-dim hover:border-cream/25 hover:text-cream"
                  }`}
                >
                  <IconSliders className="size-4" />
                  <span className="hidden sm:inline">Filtros</span>
                  {activeTags.length > 0 && (
                    <span className="grid size-4.5 place-items-center rounded-full bg-caramel font-mono text-[0.625rem] text-ink">
                      {activeTags.length}
                    </span>
                  )}
                </button>

                {/* Toggle de vista */}
                <div className="glass-pill flex shrink-0 items-center gap-0.5 rounded-xl p-1">
                  {(
                    [
                      { id: "cards" as const, label: "Cards", Icon: IconGrid },
                      { id: "rows" as const, label: "Lista", Icon: IconRows },
                    ]
                  ).map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setViewMode(id)}
                      aria-label={`Vista ${label}`}
                      aria-pressed={view === id}
                      className={`relative grid size-9 cursor-pointer place-items-center rounded-lg transition-colors duration-400 ${
                        view === id ? "text-ink" : "text-cream-dim hover:text-cream"
                      }`}
                    >
                      {view === id && (
                        <span className="glass absolute inset-0 rounded-lg bg-butter/90 shadow-[0_4px_16px_-6px_rgba(0,0,0,0.6)]" />
                      )}
                      <Icon className="relative size-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filtros */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                filtersOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-cream/8 pt-3.5">
                  {TAG_FILTERS.map(({ id, label }) => {
                    const active = activeTags.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleTag(id)}
                        aria-pressed={active}
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-xs transition-all duration-400 ${
                          active
                            ? "border-caramel/70 bg-caramel/16 text-butter"
                            : "border-cream/10 bg-cream/3 text-cream-dim hover:border-cream/30 hover:text-cream"
                        }`}
                      >
                        <span
                          className={`grid size-3.5 place-items-center rounded-full border transition-colors ${
                            active ? "border-caramel bg-caramel" : "border-cream/25"
                          }`}
                        >
                          {active && <IconCheck className="size-2 text-ink" strokeWidth={3.5} />}
                        </span>
                        {label}
                      </button>
                    );
                  })}

                  {filtersActive && (
                    <button
                      type="button"
                      onClick={clearAll}
                      className="ml-auto inline-flex cursor-pointer items-center gap-1.5 text-xs text-cream-faint underline-offset-4 transition-colors hover:text-cream hover:underline"
                    >
                      <IconClose className="size-3" />
                      Limpiar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Contador */}
            <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.18em] text-cream-faint uppercase">
              {filtersActive ? (
                <>
                  {totalResults} de {totalItems} platos
                  {query.trim() ? ` para «${query.trim()}»` : ""}
                </>
              ) : (
                <>
                  {totalItems} platos · {CATEGORIES.length} secciones
                </>
              )}
            </p>
          </div>
        </div>

        {/* --------------------------------------------------- Rail -- */}
        <div className="mb-10">
          <div
            ref={railRef}
            className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8"
          >
            {CATEGORIES.map((category) => {
              const count = filtered.find((g) => g.category.id === category.id)?.items.length ?? 0;
              const active = activeCategory === category.id;
              return (
                <a
                  key={category.id}
                  data-rail-pill={category.id}
                  href={`#${category.id}`}
                  className={`group relative shrink-0 rounded-full px-4 py-2.5 text-sm whitespace-nowrap transition-colors duration-400 ${
                    active ? "text-ink" : "text-cream-dim hover:text-cream"
                  }`}
                >
                  {active && (
                    <span className="glass absolute inset-0 rounded-full bg-butter/90 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.7)]" />
                  )}
                  <span className="relative flex items-center gap-2">
                    {category.short}
                    {filtersActive && count > 0 && (
                      <span
                        className={`font-mono text-[0.625rem] tabular-nums ${
                          active ? "text-ink/60" : "text-caramel"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* ----------------------------------------------- Secciones -- */}
        {filtered.length === 0 ? (
          <div className="glass rounded-[1.75rem] px-6 py-20 text-center">
            <p className="display-xl text-3xl text-cream">No encontramos nada</p>
            <p className="mx-auto mt-3 max-w-sm text-cream-dim">
              Probá con otro término o sacá los filtros. Tenemos{" "}
              <span className="text-caramel">{totalItems} platos</span> para mirar.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="glass-pill mt-7 inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm text-cream transition-colors hover:text-butter"
            >
              <IconClose className="size-3.5" />
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-20 lg:gap-28">
            {filtered.map(({ category, items }) => (
              <section key={category.id} id={category.id} data-menu-section>
                {/* Encabezado de sección */}
                <header data-reveal className="mb-7 sm:mb-9">
                  <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                    <div>
                      <p className="eyebrow mb-2.5 flex items-center gap-2.5">
                        <span
                          className="inline-block h-px w-7"
                          style={{ background: category.accent }}
                        />
                        {category.short}
                      </p>
                      <h2 className="display-xl text-balance-tight text-[clamp(1.9rem,4.4vw,3.1rem)] text-cream">
                        {category.name}
                      </h2>
                      {category.blurb && (
                        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-cream-dim sm:text-base">
                          {category.blurb}
                        </p>
                      )}
                    </div>

                    <p className="font-mono text-sm text-caramel tabular-nums">
                      {items.length} {items.length === 1 ? "plato" : "platos"}
                    </p>
                  </div>

                  {category.note && (
                    <p
                      data-reveal
                      className="glass mt-5 rounded-xl border-l-2 border-l-caramel/70 px-4 py-3 text-xs leading-relaxed text-cream-dim"
                    >
                      {category.note}
                    </p>
                  )}

                  <div className="hairline mt-7" />
                </header>

                {/* Grilla / lista */}
                <div
                  className={
                    view === "cards"
                      ? "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-4"
                      : "flex flex-col gap-2.5"
                  }
                >
                  {items.map((item) =>
                    view === "cards" ? (
                      <MenuCard
                        key={item.id}
                        item={item}
                        category={category}
                        onOpen={openItem}
                        render={highlightName}
                      />
                    ) : (
                      <MenuRow
                        key={item.id}
                        item={item}
                        category={category}
                        onOpen={openItem}
                        render={highlightName}
                      />
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      <ItemDetail
        key={detail ? `${detail.category.id}::${detail.item.id}` : "closed"}
        target={detail}
        onClose={() => setDetail(null)}
      />
    </section>
  );
}

export { formatPrice };
