/**
 * General utility functions
 */

import { type ClassValue, clsx } from "clsx";

/**
 * Combines class names with clsx (no twMerge needed for our simple setup)
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

/**
 * Format a date for short display (e.g., "Jan 2025")
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

/**
 * Truncate text to a certain length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if we're on the client side
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Get the absolute URL for a path
 */
export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ashwin.dev";
  return `${baseUrl}${path}`;
}

/**
 * Get color class for a tag based on its category
 */
export function getTagColorClass(tag: string): string {
  const tagLower = tag.toLowerCase();
  
  // AI/ML tags
  if (tagLower.includes("ai") || tagLower.includes("ml") || tagLower.includes("machine-learning") || tagLower.includes("deep-learning")) {
    return "tag-ai";
  }
  
  // VR/Unity tags
  if (tagLower.includes("vr") || tagLower.includes("unity") || tagLower.includes("ar") || tagLower.includes("xr")) {
    return "tag-vr";
  }
  
  // Backend/Systems tags
  if (tagLower.includes("backend") || tagLower.includes("api") || tagLower.includes("server") || tagLower.includes("database") || tagLower.includes("aws") || tagLower.includes("infrastructure")) {
    return "tag-backend";
  }
  
  // Web/Frontend tags
  if (tagLower.includes("web") || tagLower.includes("frontend") || tagLower.includes("react") || tagLower.includes("nextjs") || tagLower.includes("ui") || tagLower.includes("ux")) {
    return "tag-web";
  }
  
  // Creative/Design tags
  if (tagLower.includes("design") || tagLower.includes("creative") || tagLower.includes("art") || tagLower.includes("visual")) {
    return "tag-creative";
  }
  
  // Default
  return "tag-default";
}

/**
 * Get hover color class for a tag
 */
export function getTagHoverClass(tag: string): string {
  const tagLower = tag.toLowerCase();
  
  if (tagLower.includes("ai") || tagLower.includes("ml")) return "hover-teal";
  if (tagLower.includes("vr") || tagLower.includes("unity")) return "hover-purple";
  if (tagLower.includes("backend") || tagLower.includes("api") || tagLower.includes("aws")) return "hover-emerald";
  if (tagLower.includes("web") || tagLower.includes("frontend") || tagLower.includes("react")) return "hover-coral";
  if (tagLower.includes("design") || tagLower.includes("creative")) return "hover-pink";
  
  return "";
}

/**
 * Get card hover class for a project based on primary tag
 */
export function getCardHoverClass(tags: string[]): string {
  // Check tags in priority order
  for (const tag of tags) {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes("ai") || tagLower.includes("ml")) return "card-hover-teal";
    if (tagLower.includes("vr") || tagLower.includes("unity")) return "card-hover-purple";
    if (tagLower.includes("backend") || tagLower.includes("api") || tagLower.includes("aws")) return "card-hover-emerald";
    if (tagLower.includes("web") || tagLower.includes("frontend") || tagLower.includes("react")) return "card-hover-teal"; // Web can use teal too
    if (tagLower.includes("design") || tagLower.includes("creative")) return "card-hover-pink";
  }
  return "";
}

