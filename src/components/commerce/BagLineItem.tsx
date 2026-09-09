"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useStore, type ResolvedLine } from "@/lib/store";
import { formatBRL } from "@/lib/format";
import { QuantityStepper } from "./QuantityStepper";

export function BagLineItem({
  line,
  compact = false,
  onNavigate,
}: {
  line: ResolvedLine;
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const { setQuantity, removeLine } = useStore();

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/product/${line.product.slug}`}
        onClick={onNavigate}
        className={`relative shrink-0 overflow-hidden bg-sand-deep ${
          compact ? "h-28 w-[5.25rem]" : "h-36 w-28"
        }`}
      >
        <Image
          src={line.image}
          alt={line.product.name}
          fill
          sizes="120px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-sans text-[0.8125rem] leading-snug">
              <Link href={`/product/${line.product.slug}`} onClick={onNavigate} className="link-rule">
                {line.product.name}
              </Link>
            </h3>
            <p className="mt-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-taupe">
              {line.color} · {line.size}
            </p>
          </div>
          <p className="shrink-0 font-sans text-[0.8125rem] tabular-nums">
            {formatBRL(line.lineTotal)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <QuantityStepper
            value={line.quantity}
            onChange={(next) => setQuantity(line.key, next)}
            min={1}
            label={line.product.name}
            compact={compact}
          />
          <button
            type="button"
            onClick={() => removeLine(line.key)}
            aria-label={`Remove ${line.product.name} from the bag`}
            className="grid h-8 w-8 place-items-center text-taupe transition-colors hover:text-ember"
          >
            <Trash2 size={14} strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </li>
  );
}
