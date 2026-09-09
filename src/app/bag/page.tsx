import type { Metadata } from "next";
import { BagPageContent } from "@/components/commerce/BagPageContent";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Review your NORTH 85 selection, apply a promotion code and estimate delivery before checkout.",
  alternates: { canonical: "/bag" },
};

export default function BagPage() {
  return <BagPageContent />;
}
