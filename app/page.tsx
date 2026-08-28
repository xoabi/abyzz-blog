import { Hero } from "@/components/hero/hero";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description:
    "Personal cybersecurity archive of .abyzz — DFIR, CTFs, projects, research, and notes.",
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <Hero />
    </main>
  );
}