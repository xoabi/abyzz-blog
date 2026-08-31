import type { ReactNode } from "react";

export function SpiderPresence(): ReactNode {
  return (
    <div className="spider-presence" aria-hidden="true">
      <div className="spider-presence__rig">
        <svg
          className="spider-presence__silk"
          viewBox="0 0 56 240"
          preserveAspectRatio="none"
        >
          <path
            d="
              M 28 0
              C 25 50, 31 92, 28 132
              C 25 165, 30 192, 28 226
            "
          />
        </svg>

        <div className="spider-presence__mark" />
      </div>
    </div>
  );
}