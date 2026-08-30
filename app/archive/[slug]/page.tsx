import {
  getArchiveEntryBySlug,
  getArchiveSlugs,
} from "@/lib/archive";
import { evaluate } from "@mdx-js/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as runtime from "react/jsx-runtime";

type ArchivePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getArchiveSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ArchivePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getArchiveEntryBySlug(slug);

  if (!entry) {
    return {
      title: "Archive entry not found",
    };
  }

  return {
    title: `${entry.frontmatter.title} | .abyzz`,
    description: entry.frontmatter.summary,
  };
}

export default async function ArchiveEntryPage({
  params,
}: ArchivePageProps) {
  const { slug } = await params;

  const entry = await getArchiveEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const { default: Content } = await evaluate(
    entry.source,
    {
      ...runtime,
      baseUrl: import.meta.url,
    }
  );

  const { frontmatter } = entry;

  return (
    <main
      id="main-content"
      className="mx-auto min-h-screen w-full max-w-275 px-6 pb-32 pt-36 sm:px-10 sm:pt-40"
    >
      <article className="mx-auto max-w-3xl">
        <header>
          <div
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--chain-accent)" }}
          >
            The Chain / Archive
          </div>

          <h1 className="mt-7 font-serif text-5xl leading-[0.95] tracking-[-0.045em] sm:text-6xl md:text-7xl">
            {frontmatter.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-foreground/55">
            {frontmatter.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-y border-foreground/8 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/35">
            <span>{frontmatter.category}</span>
            <time>{frontmatter.date}</time>
          </div>
        </header>

        <div
          className="
            mt-16
            text-[15px]
            leading-7
            text-foreground/65

            [&_h2]:mb-5
            [&_h2]:mt-14
            [&_h2]:font-serif
            [&_h2]:text-3xl
            [&_h2]:tracking-tight
            [&_h2]:text-foreground

            [&_h3]:mb-4
            [&_h3]:mt-10
            [&_h3]:text-xl
            [&_h3]:font-medium
            [&_h3]:text-foreground/90

            [&_p]:my-5

            [&_ul]:my-5
            [&_ul]:list-disc
            [&_ul]:pl-6

            [&_ol]:my-5
            [&_ol]:list-decimal
            [&_ol]:pl-6

            [&_li]:my-2

            [&_a]:underline
            [&_a]:underline-offset-4
            [&_a]:transition-colors
            [&_a:hover]:text-foreground

            [&_pre]:my-7
            [&_pre]:overflow-x-auto
            [&_pre]:rounded-xl
            [&_pre]:border
            [&_pre]:border-foreground/10
            [&_pre]:bg-foreground/[0.035]
            [&_pre]:p-5
            [&_pre]:font-mono
            [&_pre]:text-sm

            [&_code]:font-mono
          "
        >
          <Content />
        </div>
      </article>
    </main>
  );
}