"use client";
import { ReactNode } from "react";
import { useLenis } from "@/app/hooks/useLenis";

export function LenisProvider({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
} 