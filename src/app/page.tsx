import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { NewArrivals } from "@/components/home/NewArrivals";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { DropSection } from "@/components/home/DropSection";
import { PrivateSale } from "@/components/home/PrivateSale";
import { BrandStory } from "@/components/home/BrandStory";
import { JournalPreview } from "@/components/home/JournalPreview";
import { Worn85 } from "@/components/home/Worn85";

export const metadata: Metadata = {
  title: "NORTH 85 — Concept Store, New York",
  description:
    "A New York concept store for considered dressing. Fourteen pieces across clothing, accessories, fragrance and objects, cut in small runs and revised rather than replaced.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <CategoryGrid />
      <DropSection />
      <PrivateSale />
      <BrandStory />
      <JournalPreview />
      <Worn85 />
    </>
  );
}
