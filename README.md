# Tueste Café — Menú

Menú digital para **Tueste Café**, café de especialidad en Caballito, Buenos Aires.
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 + GSAP.

---

## Puesta en marcha

```bash
npm install
npm run dev
```

Scripts disponibles:

| Comando            | Qué hace                                  |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Servidor de desarrollo                   |
| `npm run build`    | Build de producción                       |
| `npm start`        | Sirve el build                            |
| `npm run lint`     | ESLint                                    |

---

## Antes de publicar — dos cosas que tenés que tocar

1. **Número de WhatsApp** — está hardcodeado como placeholder en
   [`src/data/site.ts`](src/data/site.ts) (`SITE.whatsappNumber`). Reemplazalo por el
   número real en formato internacional sin `+` (ej. `5491145551234`). Hasta entonces
   el botón "Enviar pedido por WhatsApp" abre un chat que no llega a nadie.
2. **Dominio** — `https://tueste.cafe` aparece hardcodeado en `src/app/layout.tsx`
   (`metadataBase`), `src/app/sitemap.ts` y `src/app/robots.ts`.

---

## Arquitectura

```
src/
  app/
    layout.tsx          metadata, fuentes, JSON-LD (CafeOrCoffeeShop)
    page.tsx            Hero + Values + Teaser + Menú + Footer + carrito
    globals.css         tokens de diseño y utilidades liquid glass
    sitemap.ts robots.ts
  components/
    hero.tsx            hero con timeline GSAP + parallax + spotlight
    menu-explorer.tsx   buscador, filtros, rail de categorías, toggle cards/lista
    menu-items.tsx      MenuCard y MenuRow (Flip targets)
    item-detail.tsx     sheet de detalle: ingredientes, variantes, agregados
    cart-provider.tsx   estado del pedido + localStorage
    cart-drawer.tsx     panel de pedido + FAB
    footer.tsx
    icons.tsx           iconografía SVG propia (sin emojis)
    nav.tsx
    liquid-backdrop.tsx auroras, grano y filtro SVG de refracción
  data/
    menu.ts             el menú completo, tipado
    site.ts             datos del local
  lib/gsap.ts           registro de plugins + helpers
```

### Liquid glass

Definido como utilidades `@utility` en `globals.css`:

| Clase           | Uso                                                     |
| --------------- | ------------------------------------------------------- |
| `glass`         | superficie base (blur 22px, saturate 165%)             |
| `glass-strong`  | panelesephemeros (blur 32px) — nav, toolbar, footer     |
| `glass-pill`    | chips, botones secundarios                              |
| `glass-card`    | tarjetas de plato, con `glass-hover` para el hover      |
| `glass-refract` | aplica `backdrop-filter: url(#liquid-distortion)`       |
| `rim`           | borde especular de 1px con gradiente cónico enmascarado  |

`liquid-backdrop.tsx` expone el filtro `#liquid-distortion`
(`feTurbulence` + `feDisplacementMap`) que deforma de verdad lo que hay detrás.
Los navegadores que no lo soportan caen al `-webkit-backdrop-filter` con blur.

### Animaciones (GSAP)

- **Hero**: timeline con zoom-out del fondo + titular que sube desde su máscara.
- **Parallax** del collage y del fondo vía `ScrollTrigger` con `scrub`.
- **Flip** para pasar de cards a lista y al filtrar (`Flip.from` con
  `onEnter`/`onLeave`).
- **Reveal** por sección al entrar en viewport.
- **Spotlight** que sigue al puntero sobre el collage (custom properties, sin
  pelearse con los `transform` que escribe GSAP).
- Todo pasa por `prefers-reduced-motion` y por el guard de puntero grueso
  (`pointer: fine`), así que en mobile no se ejecutan las interacciones 3D.

---

## Menú

`src/data/menu.ts` es la fuente de verdad. Tipos:

```ts
type MenuItem = {
  id: string;
  name: string;
  price: number;
  variants?: { label: string; price: number }[]; // ej. 1 taza / 2 tazas
  description?: string;
  ingredients?: string[];                        // se ve al expandir
  modifiers?: { label: string; price: number }[];// agregados opcionales
  tags?: ("sin-tacc" | "vegano" | "con-alcohol" | "sin-lactosa" | "favorito")[];
  image?: string;
};
```

Para agregar un plato: agregalo a la categoría correcta y asignale una imagen de
`public/img`. Si no tiene imagen propia, usa la de la categoría.

Tags disponibles para los filtros: `sin-tacc`, `vegano`, `sin-lactosa`,
`con-alcohol`, `favorito`.

---

## Imágenes

76 fotos de [StockSnap.io](https://stocksnap.io) bajo licencia **CC0** (dominio
público, sin atribución obligatoria). Bajadas, redimensionadas a 1200px de ancho
y recomprimidas con `mozjpeg`: el repo pesa **~3.7 MB** en total.

- `public/img/manifest.json` — procedencia de cada foto (título, autor, licencia).
- `public/img/catalog.json` — catálogo crudo de la API de Openverse.

Para sumar más fotos:

```bash
node scripts/fetch-images.mjs   # consulta Openverse y arma catalog.json
node scripts/download-images.mjs  # descarga + redimensiona a public/img
node scripts/check-images.mjs   # verifica que no falten ni sobren imagenes
```

> Si agregás platos y referenciás imágenes que todavía no están en `public/img`,
> `check-images.mjs` te las señala.

---

## Datos del local

Viven en [`src/data/site.ts`](src/data/site.ts): dirección, horarios, links de
Google Maps, Instagram y deliveries. El JSON-LD del `layout.tsx` los usa para el
schema `CafeOrCoffeeShop`.

---

## Atajo de teclado

`/` lleva el foco al buscador del menú. `Esc` limpia la búsqueda o cierra el panel
de detalle.
