import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

export type ArchiveFrontmatter = {
  title: string;
  date: string;
  category: string;
  summary: string;
  tags?: string[];
  draft?: boolean;
};

export type ArchiveEntry = ArchiveFrontmatter & {
  slug: string;
};

const archiveDirectory = path.join(
  process.cwd(),
  "content",
  "archive"
);

export async function getArchiveSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(archiveDirectory);

    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getArchiveEntryBySlug(
  slug: string
): Promise<{
  frontmatter: ArchiveFrontmatter;
  source: string;
} | null> {
  try {
    const filePath = path.join(
      archiveDirectory,
      `${slug}.mdx`
    );

    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);

    return {
      frontmatter: data as ArchiveFrontmatter,
      source: content,
    };
  } catch {
    return null;
  }
}

export async function getAllArchiveEntries(): Promise<ArchiveEntry[]> {
  const slugs = await getArchiveSlugs();

  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await getArchiveEntryBySlug(slug);

      if (!entry) return null;

      return {
        slug,
        ...entry.frontmatter,
      };
    })
  );

  return entries
    .filter(
      (entry): entry is ArchiveEntry =>
        entry !== null
    )
    .filter(
      (entry) =>
        process.env.NODE_ENV !== "production" ||
        !entry.draft
    )
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );
}