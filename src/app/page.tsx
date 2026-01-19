import { Metadata } from "next";
import { siteConfig, proofItems } from "@/lib/constants";
import { getFeaturedChapters } from "@/lib/chapters";
import { generatePersonJsonLd } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { ProofStrip } from "@/components/home/ProofStrip";
import { FeaturedChapters } from "@/components/home/FeaturedChapters";
import { SecondaryCTA } from "@/components/home/SecondaryCTA";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function StoryPage() {
  const featuredChapters = getFeaturedChapters();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePersonJsonLd()),
        }}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Proof Strip */}
        <ProofStrip items={proofItems} />

        {/* Featured Chapters */}
        <FeaturedChapters chapters={featuredChapters} />

        {/* Secondary CTA */}
        <SecondaryCTA />
      </div>
    </>
  );
}
