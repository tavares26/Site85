"use client";

import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";

export function FavoriteButton({
  productId,
  productName,
  className = "",
  size = 16,
}: {
  productId: string;
  productName: string;
  className?: string;
  size?: number;
}) {
  const { isFavorite, toggleFavorite, ready } = useStore();
  const saved = ready && isFavorite(productId);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(productId);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${productName} from favourites` : `Save ${productName} to favourites`}
      className={`grid place-items-center transition-all duration-500 [transition-timing-function:var(--ease-editorial)] ${className}`}
    >
      <Heart
        size={size}
        strokeWidth={1.25}
        className={saved ? "fill-ember text-ember" : "text-charcoal hover:text-ember"}
      />
    </button>
  );
}
