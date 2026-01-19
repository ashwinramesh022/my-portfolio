import { Feed } from "feed";
import { siteConfig } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: `${siteConfig.name} - Journal`,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    image: `${siteConfig.url}/og-default.svg`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.author.name}`,
    updated: posts.length > 0 ? new Date(posts[0].frontmatter.date) : new Date(),
    generator: "Next.js + Feed",
    feedLinks: {
      rss2: `${siteConfig.url}/journal/feed.xml`,
    },
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: siteConfig.url,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.frontmatter.title,
      id: `${siteConfig.url}/journal/${post.slug}`,
      link: `${siteConfig.url}/journal/${post.slug}`,
      description: post.frontmatter.description,
      date: new Date(post.frontmatter.date),
      author: [
        {
          name: siteConfig.author.name,
          email: siteConfig.author.email,
          link: siteConfig.url,
        },
      ],
      ...(post.frontmatter.tags && {
        category: post.frontmatter.tags.map((tag) => ({ name: tag })),
      }),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

