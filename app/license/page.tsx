import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Hunter License",
  description:
    "Identity, current work, focus areas, and selected CTF records of .abyzz.",
  path: "/license",
});

const focusAreas = [
  "Digital Forensics",
  "Incident Response",
  "CTFs",
  "OSINT",
  "Security Tooling",
] as const;

const notableHunts = [
  {
    name: "CICADA 3301 CTF",
    organizer: "GDG on-campus SIES GST",
    placement: "1st",
  },
  {
    name: "Chakravyuha CTF '26",
    organizer: "LTCE",
    placement: "2nd",
  },
  {
    name: "Shaastra CTF '26",
    organizer: "IIT Madras",
    placement: "5th",
  },
] as const;

export default function LicensePage(): ReactNode {
  return (
    <main
      id="main-content"
      className="mx-auto min-h-screen w-full max-w-275 px-6 pb-28 pt-36 sm:px-10 sm:pt-40"
    >
      <header className="max-w-4xl">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/40">
          <span>Hunter Database</span>
          <span className="h-px w-8 bg-foreground/15" />
          <span>License</span>
        </div>

        <div className="mt-10">
          <p
            className="font-mono text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--hunter-accent)" }}
          >
            Identity Record
          </p>

          <h1 className="mt-4 font-serif text-6xl leading-none tracking-[-0.05em] sm:text-7xl md:text-8xl">
            .abyzz
          </h1>

          <div className="mt-6">
            <p className="text-xl text-foreground/80">Abijith Anna</p>

            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground/40">
              Cybersecurity · DFIR · CTF
            </p>
          </div>
        </div>
      </header>

      <div className="mt-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="space-y-16">
          <section>
            <div className="mb-6 flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--hunter-accent)" }}
              />

              <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/45">
                Current Affiliation
              </h2>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-background/30 p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xl font-medium">Cybersecurity Intern</p>

                  <p className="mt-1 text-sm text-foreground/50">
                    Cyber Secured India
                  </p>
                </div>

                <span className="w-fit rounded-full border border-foreground/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                  Active
                </span>
              </div>

              <p className="mt-8 max-w-xl text-[15px] leading-7 text-foreground/60">
                Working across offensive and defensive security research while
                building practical experience with OSINT, Linux, digital
                forensics and cybersecurity methodology.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/45">
              Focus
            </h2>

            <div className="mt-6 flex max-w-xl flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-foreground/10 bg-foreground/[0.025] px-3.5 py-2 text-sm text-foreground/60"
                >
                  {area}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/45">
              Notable Hunts
            </h2>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/25">
              Selected
            </span>
          </div>

          <div className="divide-y divide-foreground/8 border-y border-foreground/8">
            {notableHunts.map((hunt, index) => (
              <div
                key={hunt.name}
                className="group grid grid-cols-[32px_1fr_auto] gap-4 py-5"
              >
                <span className="pt-0.5 font-mono text-[10px] text-foreground/25">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <p className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                    {hunt.name}
                  </p>

                  <p className="mt-1 text-xs text-foreground/35">
                    {hunt.organizer}
                  </p>
                </div>

                <p
                  className="font-mono text-sm"
                  style={{ color: "var(--hunter-accent)" }}
                >
                  {hunt.placement}
                </p>
              </div>
            ))}
          </div>

          
        </section>  
      </div>

      <footer className="mt-24 border-t border-foreground/8 pt-8">
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <Link
            href="/operations"
            data-cursor-tone="spider"
            className="cursor-target font-mono text-xs uppercase tracking-[0.18em] text-foreground/45 transition-colors hover:text-foreground"
          >
            View Operations →
          </Link>

          <Link
            href="/projects"
            data-cursor-tone="spider"
            className="cursor-target font-mono text-xs uppercase tracking-[0.18em] text-foreground/45 transition-colors hover:text-foreground"
          >
            View Projects →
          </Link>
        </div>
      </footer>
    </main>
  );
}