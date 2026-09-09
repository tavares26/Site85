import type { Metadata } from "next";
import { SearchPageContent } from "@/components/commerce/SearchPageContent";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the NORTH 85 catalogue by product, fabric, colour or collection.",
  alternates: { canonical: "/search" },
};

export default function SearchPage() {
  return <SearchPageContent />;
}
