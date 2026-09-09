"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/data/products";
import { formatBRL, discountPercent } from "@/lib/format";
import { FavoriteButton } from "./FavoriteButton";

const BADGE_COPY: Record<NonNullable<Product["badge"]>, string> = {
  new: "New",
  drop: "Drop 085",
  sale: "Sale",
  last: "Last pieces",
};

type Props = {
  product: Product;
  priority?: boolean;
  /** Index within the grid — drives the staggered vertical offset. */
  index?: number;
  /** Asymmetric grids let some cards run taller than their neighbours. */
  aspect?: "tall" | "regular";
};

export function ProductCard({
  product,
  priority = false,
  index = 0,
  aspect = "regular",
}: Props) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const secondary = product.images[1] ?? product.images[0];
  const onSale = typeof product.compareAt === "number";

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.85, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div
          className={`relative overflow-hidden bg-sand-deep ${
            aspect === "tall" ? "aspect-[3/4.6]" : "aspect-[3/4]"
          }`}
        >
          <Image
            src={product.images[0]}
            alt={`${product.name} — ${product.subtitle}`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-[1100ms] [transition-timing-function:var(--ease-editorial)] ${
              hovered && !reduced ? "scale-[1.04] opacity-0" : "scale-100 opacity-100"
            }`}
          />
          <Image
            src={secondary}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-[1100ms] [transition-timing-function:var(--ease-editorial)] ${
              hovered && !reduced ? "scale-100 opacity-100" : "scale-[1.05] opacity-0"
            }`}
          />

          {product.badge && (
            <span
              className={`label-xs absolute left-0 top-0 px-3 py-2 ${
                product.badge === "sale"
                  ? "bg-ember text-sand"
                  : "bg-sand/92 text-charcoal backdrop-blur-sm"
              }`}
            >
              {BADGE_COPY[product.badge]}
            </span>
          )}
        </div>
      </Link>

      <FavoriteButton
        productId={product.id}
        productName={product.name}
        className="absolute right-3 top-3 h-8 w-8 bg-sand/85 backdrop-blur-sm sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      />

      <div className="flex items-start justify-between gap-4 pt-3.5">
        <div className="min-w-0">
          <h3 className="font-sans text-[0.8125rem] leading-snug tracking-[0.02em]">
            <Link href={`/product/${product.slug}`} className="link-rule">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 truncate text-[0.75rem] leading-snug text-taupe">
            {product.subtitle}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p
            className={`font-sans text-[0.8125rem] tabular-nums ${
              onSale ? "text-ember" : "text-charcoal"
            }`}
          >
            {formatBRL(product.price)}
          </p>
          {onSale && product.compareAt && (
            <p className="mt-0.5 flex items-baseline justify-end gap-1.5 text-[0.6875rem] tabular-nums text-taupe">
              <span className="line-through">{formatBRL(product.compareAt)}</span>
              <span className="text-ember">
                −{discountPercent(product.price, product.compareAt)}%
              </span>
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}
