import type { CSSProperties } from "react";

/** Divide un texto en letras animables. grad: color degradé por letra. */
export function SplitText({ text, grad, dark, className = "" }: { text: string; grad?: boolean; dark?: boolean; className?: string }) {
  const words = text.split(" ");
  const total = text.replace(/ /g, "").length;
  let i = 0;
  return (
    <span className={`split ${grad ? "sg" : ""} ${dark ? "sd" : ""} ${className}`} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="sw" aria-hidden="true">
          {[...w].map((ch) => (
            <span key={i} className="ch" style={{ "--i": i++, "--n": total } as CSSProperties}>
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
