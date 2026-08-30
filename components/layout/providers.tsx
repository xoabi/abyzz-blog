"use client";

import { ReducedMotionProvider } from "@/lib/motion";
import { ThemeProvider } from "@/components/layout/theme-provider";
import TargetCursor from "@/components/ui/target-cursor";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider>
      <ReducedMotionProvider>
        <TargetCursor
          targetSelector=".cursor-target"
          spinDuration={2.8}
          hideDefaultCursor
          hoverDuration={0.18}
          parallaxOn
          cursorColor="#aaa49a"
          cursorColorOnTarget="#9276b5"
        />

        {children}
      </ReducedMotionProvider>
    </ThemeProvider>
  );
}