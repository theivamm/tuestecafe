"use client";

import { useEffect } from "react";

/** Aparición suave al hacer scroll para todo elemento con clase .rv */
export function Reveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".rv, .split").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
