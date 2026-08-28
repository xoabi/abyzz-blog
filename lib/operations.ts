import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";

export type OperationFrontmatter = {
  title: string;
  event: string;
  date: string;
  category: string;
  summary: string;
  difficulty?: string;
  tags?: string[];
  draft?: boolean;
};

export type Operation = OperationFrontmatter & {
  slug: string;
};

const operationsDirectory = path.join(
  process.cwd(),
  "content",
  "operations"
);

export async function getOperationSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(operationsDirectory);

    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getOperationBySlug(slug: string): Promise<{
  frontmatter: OperationFrontmatter;
  source: string;
} | null> {
  try {
    const filePath = path.join(
      operationsDirectory,
      `${slug}.mdx`
    );

    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);

    return {
      frontmatter: data as OperationFrontmatter,
      source: content,
    };
  } catch {
    return null;
  }
}

export async function getAllOperations(): Promise<Operation[]> {
  const slugs = await getOperationSlugs();

  const operations = await Promise.all(
    slugs.map(async (slug) => {
      const operation = await getOperationBySlug(slug);

      if (!operation) {
        return null;
      }

      return {
        slug,
        ...operation.frontmatter,
      };
    })
  );

  return operations
    .filter((operation): operation is Operation => operation !== null)
    .filter(
      (operation) =>
        process.env.NODE_ENV !== "production" || !operation.draft
    )
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );
}