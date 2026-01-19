/**
 * Site-wide constants and configuration
 */

export const siteConfig = {
  name: "Ashwin Ramesh Kannan",
  title: "Ashwin Ramesh Kannan — Software Engineer",
  description:
    "Fast learner, versatile builder, creative technologist. MS CS at NC State, ex-AWS SDE Intern, VR Developer, building meaningful products with modern technologies.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ashwinrameshkannan.com",
  locale: "en_US",
  author: {
    name: "Ashwin Ramesh Kannan",
    email: "ashwinrameshkannan@gmail.com",
    twitter: "@ashwinrk",
  },
  links: {
    github: "https://github.com/ashwinramesh022",
    linkedin: "https://linkedin.com/in/ashwinramesh22",
    twitter: "https://twitter.com/ashwinrk",
  },
} as const;

export const navItems = [
  { href: "/", label: "Story" },
  { href: "/chapters", label: "Chapters" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
] as const;

export const footerLinks = {
  social: [
    { href: siteConfig.links.github, label: "GitHub" },
    { href: siteConfig.links.linkedin, label: "LinkedIn" },
    { href: siteConfig.links.twitter, label: "Twitter" },
  ],
  site: [
    { href: "/journal/feed.xml", label: "RSS" },
    { href: "/sitemap.xml", label: "Sitemap" },
  ],
} as const;

// Proof strip items for the hero section
export const proofItems = [
  { label: "AWS SDE Intern", icon: "briefcase" },
  { label: "NSF VR Researcher", icon: "cube" },
  { label: "MS CS @ NC State", icon: "sparkles" },
] as const;

// Tags used across chapters and journal
export const allTags = [
  "engineering",
  "frontend",
  "backend",
  "full-stack",
  "ai",
  "ml",
  "deep-learning",
  "vr",
  "unity",
  "react",
  "nodejs",
  "graphql",
  "aws",
  "python",
  "typescript",
  "design",
  "career",
  "learning",
  "productivity",
] as const;

export type Tag = (typeof allTags)[number];

