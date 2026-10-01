"use client";

/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CATEGORIES, TAG_LABELS, formatPrice, type MenuItem, type Tag } from "@/data/menu";
import { SplitText } from "@/components/split-text";
import { norm, useSearch } from "@/lib/search-store";

type View = "simple" | "lista" | "cards";
const VIEWS: { id: View; label: string }[] = [
  { id: "simple", label: "Simple" },
  { id: "lista", label: "Lista con foto" },
  { id: "cards", label: "Cards con foto" },
];
const TAG_MARK: Partial<Record<Tag, string>> = { vegano: "V", "sin-tacc": "T", "sin-lactosa": "L", favorito: "★", "con-alcohol": "A" };

function priceOf(it: MenuItem) {
  const v = it.variants;
  if (v && new Set(v.map((x) => x.price)).size > 1) return v.map((x) => formatPrice(x.price)).join(" / ");
  return formatPrice(it.price);
}

/** Resalta (sin importar acentos ni mayúsculas) lo que se va tipeando */
function hl(text: string, words: string[]): ReactNode {
  if (!words.length) return text;
  const n = norm(text);
  const hit = new Array<boolean>(text.length).fill(false);
  for (const w of words) {
    let i = n.indexOf(w);
    while (i !== -1) {
      for (let k = i; k < i + w.length; k++) hit[k] = true;
      i = n.indexOf(w, i + 1);
    }
  }
  const out: ReactNode[] = [];
  let k = 0;
  while (k < text.length) {
    let j = k;
    while (j < text.length && hit[j] === hit[k]) j++;
    const s = text.slice(k, j);
    out.push(hit[k] ? <mark key={k}>{s}</mark> : <Fragment key={k}>{s}</Fragment>);
    k = j;
  }
  return out;
}

export function MenuSection() {
  const [q] = useSearch();
  const [view, setView] = useState<View>("simple");
  const results = useRef<HTMLDivElement>(null);
  const words = useMemo(() => norm(q).split(/\s+/).filter(Boolean), [q]);

  const sections = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        items: c.items.filter((it) => {
          if (!words.length) return true;
          const hay = norm(
            [it.name, it.description ?? "", c.name, ...(it.ingredients ?? []), ...(it.tags ?? []).map((t) => TAG_LABELS[t])].join(" "),
          );
          return words.every((w) => hay.includes(w));
        }),
      })).filter((c) => c.items.length),
    [words],
  );

  // mientras se escribe, lleva los resultados arriba de la pantalla
  useEffect(() => {
    if (!words.length || !results.current) return;
    const bar = document.querySelector<HTMLElement>(".bar")?.offsetHeight ?? 0;
    const cat = document.querySelector<HTMLElement>(".catnav")?.offsetHeight ?? 0;
    const top = results.current.getBoundingClientRect().top + window.scrollY - bar - cat - 8;
    if (Math.abs(top - window.scrollY) > 4) window.scrollTo({ top, behavior: "smooth" });
  }, [words]);

  const count = sections.reduce((n, c) => n + c.items.length, 0);

  return (
    <section id="menu" className="menu">
      <div className="wrap">
        <div className="menu-head rv">
          <p className="eyebrow">Carta completa</p>
          <h2 className="serif"><SplitText text="Menú" grad dark /></h2>
          <p className="legend">
            <span>V vegano</span>
            <span>T sin TACC</span>
            <span>L sin lactosa</span>
            <span>★ favorito</span>
          </p>
        </div>

        <div className="tools">
          <div className="seg" role="group" aria-label="Vista">
            {VIEWS.map((v) => (
              <button key={v.id} aria-pressed={view === v.id} onClick={() => setView(v.id)}>
                {v.label}
              </button>
            ))}
          </div>
          {words.length > 0 && (
            <span className="count" aria-live="polite">
              {count} {count === 1 ? "resultado" : "resultados"}
            </span>
          )}
        </div>

        <div className="catnav">
          {sections.map((c) => (
            <a key={c.id} href={`#cat-${c.id}`}>
              {c.short}
            </a>
          ))}
        </div>

        <div ref={results}>
          {sections.map((c) => (
            <div key={c.id} id={`cat-${c.id}`} className="cat">
              <div className="cat-head rv">
                <h3 className="serif">{c.name}</h3>
                {c.blurb && <p className="blurb">{c.blurb}</p>}
                {c.note && <p className="note">{c.note}</p>}
              </div>
              <div className={`items ${view}`}>
                {c.items.map((it) => {
                  const tags = (it.tags ?? []).map((t) => TAG_MARK[t]).filter(Boolean).join(" ");
                  const mods = (it.modifiers ?? []).map((m) => `${m.label} +${formatPrice(m.price)}`).join(" · ");
                  const head = (
                    <div className="row">
                      <span className="nm">
                        {hl(it.name, words)}
                        {tags && <span className="tg">{tags}</span>}
                      </span>
                      <span className="pr">{priceOf(it)}</span>
                    </div>
                  );
                  const text = (
                    <>
                      {it.description && <p className="ds">{hl(it.description, words)}</p>}
                      {mods && view !== "simple" && <p className="mod">{mods}</p>}
                    </>
                  );
                  const img = it.image ?? c.image;
                  if (view === "lista")
                    return (
                      <div key={it.id} className="it lista">
                        <img src={img} alt={it.name} loading="lazy" />
                        <div className="body">
                          {head}
                          {text}
                        </div>
                      </div>
                    );
                  if (view === "cards")
                    return (
                      <article key={it.id} className="it cards">
                        <img src={img} alt={it.name} loading="lazy" />
                        <div className="body">
                          {head}
                          {text}
                        </div>
                      </article>
                    );
                  return (
                    <div key={it.id} className="it simple">
                      {head}
                      {text}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {sections.length === 0 && <p className="empty">No encontramos “{q}” en la carta.</p>}
        </div>
      </div>
    </section>
  );
}
