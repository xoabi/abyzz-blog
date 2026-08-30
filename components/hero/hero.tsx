import { FadeIn } from "@/components/ui/motion-primitives";
import Link from "next/link";
import type { ReactNode } from "react";

export function Hero(): ReactNode {
  return (
    <section className="relative flex min-h-screen w-full items-center">
      <div className="mx-auto w-full max-w-275 px-6 py-32 sm:px-10">
        <FadeIn className="flex flex-col">
          <div className="mb-12 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-foreground/45">
            <span>Hunter Database</span>
            <span className="h-px w-8 bg-foreground/15" />
            <span>00</span>
          </div>

          <p className="mb-3 font-mono text-sm text-foreground/55">
            registered hunter
          </p>

          <h1 className="font-serif text-[4.5rem] leading-none tracking-[-0.06em] text-foreground sm:text-[6rem] md:text-[8rem] lg:text-[10rem]">
            .abyzz
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/55 sm:text-xl">
            Cybersecurity, digital forensics, CTFs, experiments, tools,
            research and things I learn along the way.
          </p>

          <div className="mt-16 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/operations"
              className="cursor-target side-card side-card--spider group rounded-2xl border border-foreground/10 bg-background/30 p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--spider-accent)" }}
                >
                  01 / Execution
                </span>

                <span className="text-foreground/25 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>

              <h2 className="font-serif text-3xl tracking-tight">
                The Spider
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/50">
                Operations, CTFs, projects, tools and experiments.
              </p>
            </Link>

            <Link
              href="/archive"
              className="cursor-target side-card side-card--chain group rounded-2xl border border-foreground/10 bg-background/30 p-6"
            >
              <div className="mb-8 flex items-center justify-between">
               <span
                  className="font-mono text-[11px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--chain-accent)" }}
                >
                  02 / Investigation
                </span>

                <span className="text-foreground/25 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>

              <h2 className="font-serif text-3xl tracking-tight">
                The Chain
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/50">
                Case files, knowledge, research, credentials and evidence.
              </p>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-5">
            <Link
              href="/license"
              className="cursor-target font-mono text-xs uppercase tracking-[0.18em] text-foreground/45 transition-colors hover:text-foreground"
            >
              Hunter License →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}