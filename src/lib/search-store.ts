"use client";
import { useSyncExternalStore } from "react";

let q = "";
const subs = new Set<() => void>();
const subscribe = (fn: () => void) => {
  subs.add(fn);
  return () => void subs.delete(fn);
};

export function setSearch(v: string) {
  q = v;
  subs.forEach((f) => f());
}

export function useSearch(): [string, (v: string) => void] {
  const v = useSyncExternalStore(subscribe, () => q, () => "");
  return [v, setSearch];
}

/** minúsculas y sin acentos, conservando el largo del texto (para poder resaltar) */
export function norm(s: string) {
  let out = "";
  for (const ch of s) out += ch.normalize("NFD")[0].toLowerCase();
  return out;
}
