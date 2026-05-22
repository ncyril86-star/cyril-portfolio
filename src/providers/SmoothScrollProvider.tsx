import { type ReactNode } from "react";

// Smooth scroll is handled natively via CSS — no JS library needed
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
