import type { Metadata } from "next";
import { FavoritesContent } from "@/components/commerce/FavoritesContent";

export const metadata: Metadata = {
  title: "Favourites",
  description: "The NORTH 85 pieces you have saved. Stored on this device — no account required.",
  alternates: { canonical: "/favorites" },
};

export default function FavoritesPage() {
  return <FavoritesContent />;
}
