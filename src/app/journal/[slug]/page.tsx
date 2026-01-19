import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { getPostBySlug, getAllPostSlugs } from "@/lib/mdx";
import {
  generateMetadata as generateSEOMetadata,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import { Tag } from "@/components/ui";
import { mdxComponents, Callout } from "@/components/mdx";
import { JournalPostHeader } from "@/components/journal/JournalPostHeader";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return generateSEOMetadata({ title: "Post Not Found" });
  }

  return generateSEOMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    url: `/journal/${slug}`,
    type: "article",
    publishedTime: post.frontmatter.date,
    tags: post.frontmatter.tags,
    image: post.frontmatter.coverImage,
  });
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Story", url: "/" },
    { name: "Journal", url: "/journal" },
    { name: post.frontmatter.title, url: `/journal/${slug}` },
  ];

  const articleJsonLd = generateArticleJsonLd({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    url: `/journal/${slug}`,
    publishedTime: post.frontmatter.date,
    image: post.frontmatter.coverImage,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />

      <article className="min-h-screen">
        {/* Post Header */}
        <JournalPostHeader post={post} />

        {/* Content */}
        <div className="container-narrow pb-20">
          <div className="prose max-w-none">
            <MDXRemote
              source={post.content}
              components={{ ...mdxComponents, Callout }}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeHighlight, rehypeSlug],
                },
              }}
            />
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-[var(--color-border-subtle)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Link
                href="/journal"
                className="group inline-flex items-center gap-2 text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Journal
              </Link>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.frontmatter.title
                )}&url=${encodeURIComponent(
                  `${siteConfig.url}/journal/${slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Share on Twitter ↗
              </a>
            </div>
          </footer>
        </div>
      </article>
    </>
  );
}
