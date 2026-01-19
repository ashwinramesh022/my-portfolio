/**
 * Chapters (Projects/Case Studies) data and utilities
 */

export interface Chapter {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  featured?: boolean;
  context: string;
  whatIBuilt: string;
  keyDecisions: string[];
  challenges: string[];
  outcomes: string[];
  techStack: string[];
  links?: {
    live?: string;
    github?: string;
    demo?: string;
  };
}

// Chapter data stored directly in code for simplicity and type safety
// Can easily be migrated to MDX later if needed
export const chapters: Chapter[] = [
  {
    slug: "amazon-inventory-system",
    title: "Inventory Intelligence",
    subtitle: "Amazon SDE Internship",
    description:
      "Built a real-time inventory forecasting system that reduced overstock by 12% across North American fulfillment centers.",
    date: "2025-08",
    tags: ["backend", "full-stack", "ai", "typescript"],
    featured: true,
    context:
      "During my SDE internship at Amazon, I joined the Fulfillment Technology team working on inventory optimization. The challenge: predict demand spikes and prevent both overstock and stockouts across thousands of SKUs.",
    whatIBuilt:
      "A forecasting microservice that ingested real-time sales data, seasonal patterns, and external signals (weather, events) to generate 7-day inventory recommendations. The system integrated with existing warehouse management tools via a clean REST API.",
    keyDecisions: [
      "Chose TypeScript + Node.js for rapid iteration and strong typing",
      "Implemented a sliding window algorithm for trend detection vs. heavy ML models",
      "Built a feature flag system to gradually roll out predictions by category",
      "Designed the API to be backwards-compatible with legacy systems",
    ],
    challenges: [
      "Handling data inconsistencies from multiple warehouse sources",
      "Balancing prediction accuracy with computational cost at scale",
      "Navigating a large codebase with minimal documentation",
    ],
    outcomes: [
      "12% reduction in overstock for pilot categories",
      "System processed 50K+ SKU predictions daily",
      "Received offer for full-time return",
    ],
    techStack: ["TypeScript", "Node.js", "AWS Lambda", "DynamoDB", "CloudWatch", "React"],
    links: {
      // Amazon internal - no public links
    },
  },
  {
    slug: "vr-therapy-environment",
    title: "Calm Spaces",
    subtitle: "VR Therapeutic Environment",
    description:
      "Designed and built an immersive VR environment for anxiety therapy, used in a university research study with 40+ participants.",
    date: "2025-03",
    tags: ["vr", "unity", "design", "frontend"],
    featured: true,
    context:
      "Collaborated with the Psychology department to create a VR tool for exposure therapy research. The goal was to create calming, controllable environments where therapists could guide patients through anxiety-reducing exercises.",
    whatIBuilt:
      "A Unity-based VR application featuring three procedurally-generated nature environments (forest, beach, mountain). Included biometric integration for real-time stress monitoring and therapist controls for adjusting environmental intensity.",
    keyDecisions: [
      "Used procedural generation for infinite variety without asset bloat",
      "Prioritized 90fps performance to prevent VR sickness",
      "Built a companion tablet app for therapist control during sessions",
      "Implemented gradual environment transitions to avoid startling users",
    ],
    challenges: [
      "Optimizing complex shaders for Quest 2 standalone mode",
      "Syncing biometric data with environmental changes in real-time",
      "Designing for users with varying VR experience levels",
    ],
    outcomes: [
      "Used in published research study with 40+ participants",
      "92% of participants reported reduced anxiety post-session",
      "Open-sourced the procedural nature system",
    ],
    techStack: ["Unity", "C#", "Oculus SDK", "WebSocket", "React Native"],
    links: {
      github: "https://github.com/ashwinrk/calm-spaces",
    },
  },
];

/**
 * Get all chapters, sorted by date (newest first)
 */
export function getAllChapters(): Chapter[] {
  return [...chapters].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get featured chapters
 */
export function getFeaturedChapters(): Chapter[] {
  return chapters
    .filter((c) => c.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a chapter by slug
 */
export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}

/**
 * Get chapters by tag
 */
export function getChaptersByTag(tag: string): Chapter[] {
  return getAllChapters().filter((c) => c.tags.includes(tag));
}

/**
 * Get all unique tags from chapters
 */
export function getChapterTags(): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();

  chapters.forEach((chapter) => {
    chapter.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get all chapter slugs (for static generation)
 */
export function getAllChapterSlugs(): string[] {
  return chapters.map((c) => c.slug);
}

