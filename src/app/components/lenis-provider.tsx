"use client";
import { ReactNode } from "react";
import { useLenis } from "../[locale]/hooks/use-lenis";

export function LenisProvider({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
} 