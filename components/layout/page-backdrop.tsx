import type { ReactNode } from "react";

import { ShaderFlow } from "../shaders/shader-flow";

export function PageBackdrop(): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.14] dark:opacity-[0.22]">
        <ShaderFlow
          brightness={1.5}
          iterations={8}
          flowSpeed={[0, 0.05]}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--background)_80%)]" />
    </div>
  );
}