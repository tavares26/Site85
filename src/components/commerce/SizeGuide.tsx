"use client";

import { useState } from "react";
import { Ruler } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import type { Product } from "@/data/products";

const APPAREL_ROWS = [
  { size: "XS", chest: "96", waist: "80", length: "68", sleeve: "60" },
  { size: "S", chest: "102", waist: "86", length: "70", sleeve: "61.5" },
  { size: "M", chest: "108", waist: "92", length: "72", sleeve: "63" },
  { size: "L", chest: "114", waist: "98", length: "74", sleeve: "64.5" },
  { size: "XL", chest: "120", waist: "104", length: "76", sleeve: "66" },
];

const TROUSER_ROWS = [
  { size: "28", waist: "71", hip: "94", thigh: "58", inseam: "84" },
  { size: "30", waist: "76", hip: "99", thigh: "60", inseam: "84" },
  { size: "32", waist: "81", hip: "104", thigh: "62", inseam: "86" },
  { size: "34", waist: "86", hip: "109", thigh: "64", inseam: "86" },
  { size: "36", waist: "91", hip: "114", thigh: "66", inseam: "88" },
  { size: "38", waist: "96", hip: "119", thigh: "68", inseam: "88" },
];

export function SizeGuide({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  if (product.sizeType !== "apparel") return null;

  const isTrouser = product.sizes.includes("32");
  const rows = isTrouser ? TROUSER_ROWS : APPAREL_ROWS;
  const headers = isTrouser
    ? ["Size", "Waist", "Hip", "Thigh", "Inseam"]
    : ["Size", "Chest", "Waist", "Length", "Sleeve"];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="label-xs link-rule inline-flex items-center gap-2 text-taupe hover:text-charcoal"
      >
        <Ruler size={13} strokeWidth={1.25} />
        Size guide
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} title="Size guide">
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-7 sm:px-7">
          <h3 className="font-display text-2xl font-light">{product.name}</h3>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-taupe">
            Garment measurements in centimetres, taken flat and doubled where
            relevant. Allow 1—2cm of tolerance: these are cut by people.
          </p>

          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[24rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-charcoal/25">
                  {headers.map((header) => (
                    <th key={header} scope="col" className="label-xs pb-3 pr-4 font-normal">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.size} className="border-b border-charcoal/10">
                    <th scope="row" className="label-xs py-3.5 pr-4 font-normal">
                      {row.size}
                    </th>
                    {Object.entries(row)
                      .filter(([key]) => key !== "size")
                      .map(([key, value]) => (
                        <td
                          key={key}
                          className="py-3.5 pr-4 text-[0.8125rem] tabular-nums text-taupe"
                        >
                          {value}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-9 space-y-4 border-t border-charcoal/12 pt-7">
            <div>
              <h4 className="label-xs">How we cut</h4>
              <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-taupe">
                Tops are cut with a squared shoulder and a straight body. If you
                are between sizes, take the smaller one — nothing here is
                intended to be oversized.
              </p>
            </div>
            <div>
              <h4 className="label-xs">Alterations</h4>
              <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-taupe">
                Trousers ship unhemmed. We finish them free in store, or cover
                the cost of your own tailor the first time.
              </p>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
