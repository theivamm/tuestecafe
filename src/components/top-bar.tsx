"use client";

import { useSearch } from "@/lib/search-store";

export function TopBar() {
  const [q, setQ] = useSearch();
  return (
    <div className="bar">
      <div className="wrap bar-in">
        <nav className="bar-links">
          <a href="#menu">Menú</a>
          <a href="#barra">La barra</a>
          <a href="#visita">Visitanos</a>
        </nav>
        <label className="bar-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar en la carta…  café, palta, vegano"
            aria-label="Buscar en la carta"
            enterKeyHint="search"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="Borrar búsqueda">
              ×
            </button>
          )}
        </label>
      </div>
    </div>
  );
}
