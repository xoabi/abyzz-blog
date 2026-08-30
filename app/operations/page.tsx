import { getAllOperations } from "@/lib/operations";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Operations",
  description:
    "Selected CTF writeups, security challenges, investigations, and technical breakdowns by .abyzz.",
  path: "/operations",
});

export default async function OperationsPage(): Promise<ReactNode> {
  const operations = await getAllOperations();

  return (
    <main
      id="main-content"
      className="mx-auto min-h-screen w-full max-w-275 px-6 pb-28 pt-36 sm:px-10 sm:pt-40"
    >
      <header className="max-w-3xl">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/40">
          <span>The Spider</span>

          <span className="h-px w-8 bg-foreground/15" />

          <span>Operations</span>
        </div>

        <h1 className="mt-10 font-serif text-6xl leading-none tracking-[-0.05em] sm:text-7xl md:text-8xl">
          Operations
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-7 text-foreground/55">
          Selected challenge writeups, investigations and technical
          breakdowns from CTFs and security experiments.
        </p>
      </header>

      <section className="mt-20">
        <div className="mb-6 flex items-center justify-between">
          <h2
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--spider-accent)" }}
          >
            Recent Operations
          </h2>

          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/25">
            {operations.length.toString().padStart(2, "0")} records
          </span>
        </div>

        {operations.length === 0 ? (
          <div className="border-y border-foreground/8 py-12">
            <p className="text-sm text-foreground/45">
              No published operations yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-foreground/8 border-y border-foreground/8">
            {operations.map((operation, index) => (
              <Link
                key={operation.slug}
                href={`/operations/${operation.slug}`}
                data-cursor-tone="spider"
                className="cursor-target group grid gap-5 py-7 sm:grid-cols-[40px_1fr_auto]"
              >
                <span className="pt-1 font-mono text-[10px] text-foreground/25">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                      {operation.title}
                    </h2>

                    {operation.draft && (
                      <span
                        className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em]"
                        style={{
                          color: "var(--spider-accent)",
                          borderColor:
                            "color-mix(in srgb, var(--spider-accent) 35%, transparent)",
                        }}
                      >
                        Draft
                      </span>
                    )}
                  </div>

                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/30">
                    {operation.event} · {operation.category}
                  </p>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground/45">
                    {operation.summary}
                  </p>

                  {operation.tags && operation.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {operation.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] text-foreground/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-5 sm:flex-col sm:items-end">
                  <time className="font-mono text-[10px] text-foreground/30">
                    {operation.date}
                  </time>

                  <span className="text-foreground/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground/60">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}