/**
 * SEO utilities and metadata generation
 */

import type { Metadata } from "next";
import { siteConfig } from "./constants";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  image,
  url,
  type = "website",
  publishedTime,
  tags,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : siteConfig.title;

  const ogImage = image || `/og-default.svg`;
  const canonicalUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: siteConfig.locale,
      type,
      ...(publishedTime && { publishedTime }),
      ...(tags && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: siteConfig.author.twitter,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
  };
}

/**
 * Generate JSON-LD structured data for a person (homepage)
 */
export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ],
    jobTitle: "Software Engineer",
    description: siteConfig.description,
  };
}

/**
 * Generate JSON-LD structured data for an article (journal post)
 */
export function generateArticleJsonLd({
  title,
  description,
  url,
  publishedTime,
  image,
}: {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteConfig.url}${url}`,
    datePublished: publishedTime,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
      },
    }),
  };
}

/**
 * Generate JSON-LD breadcrumb structured data
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

