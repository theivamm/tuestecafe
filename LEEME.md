# Cómo instalar el rediseño

1. Copiá la carpeta `src` de esta entrega sobre la carpeta `src` de tu proyecto `tueste-cafe` (aceptá reemplazar).
2. Copiá `public/img/logo.png` dentro de `tueste-cafe/public/img/`.
3. No toques `src/data/menu.ts` ni `src/data/site.ts`: el rediseño usa esos datos.
4. Ejecutá `npm run dev`.

Archivos que se reemplazan: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`.
Archivo nuevo: `src/components/menu-section.tsx`.
Los componentes viejos (hero, nav, footer, menu-explorer, liquid-backdrop…) quedan sin usarse; podés borrarlos cuando quieras.
