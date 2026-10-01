/**
 * Fondo ambiental: auroras difusas, refraction SVG real y grano.
 * Es puramente decorativo -> se renderiza en el servidor y no captura eventos.
 */
export function LiquidBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden grain">
      {/* Base */}
      <div className="absolute inset-0 bg-ink" />

      {/* Auroras */}
      <div
        className="absolute -top-[28vh] -left-[18vw] h-[78vh] w-[78vw] rounded-full opacity-55 blur-[110px] animate-float-slow"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(136,94,46,0.42) 0%, rgba(136,94,46,0.14) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[18vh] -right-[22vw] h-[68vh] w-[68vw] rounded-full opacity-45 blur-[130px] animate-float-slow"
        style={{
          animationDelay: "-7s",
          background:
            "radial-gradient(circle at 55% 45%, rgba(185,138,78,0.34) 0%, rgba(185,138,78,0.10) 48%, transparent 72%)",
        }}
      />
      <div
        className="absolute -bottom-[24vh] left-[24vw] h-[62vh] w-[62vw] rounded-full opacity-35 blur-[140px] animate-float-slow"
        style={{
          animationDelay: "-14s",
          background:
            "radial-gradient(circle at 50% 50%, rgba(233,220,198,0.20) 0%, rgba(233,220,198,0.05) 50%, transparent 74%)",
        }}
      />

      {/* Halo cálido superior (respira con el hero) */}
      <div className="absolute inset-x-0 top-0 h-[46vh] bg-[radial-gradient(120%_100%_at_50%_0%,rgba(217,143,63,0.16)_0%,transparent_62%)]" />

      {/* Viñeta */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_35%,transparent_35%,rgba(10,10,10,0.55)_100%)]" />

      {/* Filtro de refracción: se eliminó el SVG `liquid-distortion`.
          Ya no se referencia desde ningun `backdrop-filter` (ver
          `.glass-refract` en globals.css): referenciar un filtro SVG desde
          `backdrop-filter` re-evaluaba `feTurbulence` + `feDisplacementMap`
          en cada frame en que el fondo se movia. La refraccion se resuelve
          con saturacion + `rim-lit`. */}
    </div>
  );
}
