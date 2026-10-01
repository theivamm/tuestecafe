"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import { CATEGORIES, TAG_LABELS, formatPrice, type MenuItem, type Tag } from "@/data/menu";

type View = "simple" | "lista" | "cards";
const VIEWS: { id: View; label: string }[] = [
  { id: "simple", label: "Simple" },
  { id: "lista", label: "Lista con foto" },
  { id: "cards", label: "Cards con foto" },
];
const TAG_MARK: Partial<Record<Tag, string>> = {
  vegano: "V",
  "sin-tacc": "T",
  "sin-lactosa": "L",
  favorito: "★",
  "con-alcohol": "A",
};

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function priceOf(it: MenuItem) {
  const v = it.variants;
  if (v && new Set(v.map((x) => x.price)).size > 1) return v.map((x) => formatPrice(x.price)).join(" / ");
  return formatPrice(it.price);
}

export function MenuSection() {
  const [q, setQ] = useState("");
  const [view, setView] = useState<View>("simple");

  const sections = useMemo(() => {
    const words = norm(q).split(/\s+/).filter(Boolean);
    return CATEGORIES.map((c) => ({
      ...c,
      items: c.items.filter((it) => {
        if (!words.length) return true;
        const hay = norm(
          [
            it.name,
            it.description ?? "",
            c.name,
            ...(it.ingredients ?? []),
            ...(it.tags ?? []).map((t) => TAG_LABELS[t]),
          ].join(" "),
        );
        return words.every((w) => hay.includes(w));
      }),
    })).filter((c) => c.items.length);
  }, [q]);

  return (
    <section id="menu" className="menu">
      <div className="wrap">
        <div className="menu-head">
          <p className="eyebrow">Carta completa</p>
          <h2 className="serif">Menú</h2>
          <p className="legend">
            <span>V vegano</span>
            <span>T sin TACC</span>
            <span>L sin lactosa</span>
            <span>★ favorito</span>
          </p>
        </div>

        <div className="tools">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar en la carta: café, palta, vegano…"
            aria-label="Buscar en la carta"
          />
          <div className="seg" role="group" aria-label="Vista">
            {VIEWS.map((v) => (
              <button key={v.id} aria-pressed={view === v.id} onClick={() => setView(v.id)}>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="catnav">
          {sections.map((c) => (
            <a key={c.id} href={`#cat-${c.id}`}>
              {c.short}
            </a>
          ))}
        </div>

        {sections.map((c) => (
          <div key={c.id} id={`cat-${c.id}`} className="cat">
            <div className="cat-head">
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
                      {it.name}
                      {tags && <span className="tg">{tags}</span>}
                    </span>
                    <span className="pr">{priceOf(it)}</span>
                  </div>
                );
                const text = (
                  <>
                    {it.description && <p className="ds">{it.description}</p>}
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
    </section>
  );
}
