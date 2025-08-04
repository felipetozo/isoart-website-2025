"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    // Opcional: log de evento para debug
    // lenis.on("scroll", (e) => console.log(e));
    return () => lenis.destroy();
  }, []);
} 