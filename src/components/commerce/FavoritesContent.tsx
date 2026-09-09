"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "./ProductCard";

export function FavoritesContent() {
  const { favoriteProducts, ready } = useStore();

  if (!ready) {
    return (
      <div className="gutter mx-auto max-w-[120rem] py-24">
        <p className="label-xs text-taupe">Loading your favourites…</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={
          favoriteProducts.length > 0
            ? `Favourites — ${favoriteProducts.length} saved`
            : "Favourites"
        }
        title={favoriteProducts.length > 0 ? "Saved for" : "Nothing saved"}
        italic={favoriteProducts.length > 0 ? "later." : "yet."}
        description={
          favoriteProducts.length > 0
            ? "Kept on this device, no account required. Clear your browser data and the list goes with it."
            : "Tap the heart on any product to keep it here. No login, no email — the list lives in this browser."
        }
      />

      <div className="gutter mx-auto max-w-[120rem] pb-28">
        {favoriteProducts.length === 0 ? (
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="label inline-flex h-13 items-center bg-charcoal px-8 py-4 text-sand transition-colors hover:bg-charcoal-soft"
            >
              Browse the shop
            </Link>
            <Link
              href="/journal"
              className="label inline-flex h-13 items-center border border-charcoal/25 px-8 py-4 transition-colors hover:border-charcoal"
            >
              Read the journal
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
            {favoriteProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
