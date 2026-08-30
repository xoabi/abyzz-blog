import {
  getOperationBySlug,
  getOperationSlugs,
} from "@/lib/operations";
import { evaluate } from "@mdx-js/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as runtime from "react/jsx-runtime";

type OperationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getOperationSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: OperationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const operation = await getOperationBySlug(slug);

  if (!operation) {
    return {
      title: "Operation not found",
    };
  }

  return {
    title: `${operation.frontmatter.title} | .abyzz`,
    description: operation.frontmatter.summary,
  };
}

export default async function OperationPage({
  params,
}: OperationPageProps) {
  const { slug } = await params;

  const operation = await getOperationBySlug(slug);

  if (!operation) {
    notFound();
  }

  const { default: Content } = await evaluate(
    operation.source,
    {
      ...runtime,
      baseUrl: import.meta.url,
    }
  );

  const { frontmatter } = operation;

  return (
    <main
      id="main-content"
      className="mx-auto min-h-screen w-full max-w-275 px-6 pb-28 pt-36 sm:px-10 sm:pt-40"
    >
      <article className="mx-auto max-w-3xl">
        <header>
          <div
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--spider-accent)" }}
          >
            The Spider / Operation
          </div>

          <h1 className="mt-7 font-serif text-5xl leading-[0.95] tracking-[-0.045em] sm:text-6xl md:text-7xl">
            {frontmatter.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-text-secondary">
            {frontmatter.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-y border-foreground/8 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
            <span>{frontmatter.event}</span>
            <span>{frontmatter.category}</span> 

            {frontmatter.difficulty && (
              <span>{frontmatter.difficulty}</span>
            )}

            <time>{frontmatter.date}</time>
          </div>
        </header>

        <div
          className="
            mt-16
            text-[16px]
            leading-8
            text-text-secondary

            [&_h2]:mb-5
            [&_h2]:mt-16
            [&_h2]:font-serif
            [&_h2]:text-3xl
            [&_h2]:tracking-tight
            [&_h2]:text-foreground

            [&_h3]:mb-4
            [&_h3]:mt-12
            [&_h3]:text-xl
            [&_h3]:font-medium
            [&_h3]:text-text-primary

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
            [&_pre]:border-border
            [&_pre]:bg-surface-raised
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