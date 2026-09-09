"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { photo } from "@/data/products";
import { RevealWords } from "@/components/ui/Reveal";

const PRIMARY = photo("1739481152766-d99054136793", 1600);
const SECONDARY = photo("1713881587420-113c1c43e28a", 1000);

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative">
      <div className="gutter mx-auto max-w-[120rem]">
        <div className="grid items-end gap-8 pt-10 lg:grid-cols-12 lg:gap-6 lg:pt-16">
          {/* Type block ------------------------------------------------ */}
          <div className="lg:col-span-5 lg:pb-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.8 }}
              className="label text-taupe"
            >
              Autumn 2026 — Volume 04
            </motion.p>

            <h1 className="mt-6 font-display text-[3.25rem] font-light leading-[0.92] tracking-[-0.02em] sm:text-[4.5rem] lg:text-[5.25rem] xl:text-[6.5rem]">
              <RevealWords text="The wardrobe" className="block" />
              <RevealWords text="you stop" className="block" delay={0.1} />
              <span className="block italic text-ember">
                <RevealWords text="editing." delay={0.2} />
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }
              }
              className="mt-8 max-w-md"
            >
              <p className="text-[0.9375rem] leading-relaxed text-charcoal/75">
                Fourteen pieces. Four categories. Cut in Portugal, Scotland,
                Japan and Naples, in runs small enough that we know the people
                who made them.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/shop"
                  className="label inline-flex h-13 items-center bg-charcoal px-8 py-4 text-sand transition-colors duration-500 [transition-timing-function:var(--ease-editorial)] hover:bg-charcoal-soft"
                >
                  Shop the collection
                </Link>
                <Link
                  href="/shop/fragrance"
                  className="label link-rule inline-flex h-13 items-center px-2 py-4"
                >
                  Discover N85 →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Image block ----------------------------------------------- */}
          <div className="relative lg:col-span-7">
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              transition={
                reduced ? { duration: 0 } : { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
              }
              className="relative aspect-[4/5] w-full overflow-hidden bg-sand-deep sm:aspect-[16/13] lg:aspect-[4/4.4]"
            >
              <Image
                src={PRIMARY}
                alt="A model in the NORTH 85 autumn collection, photographed against a tall studio window"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-[50%_30%]"
              />
            </motion.div>

            {/* Offset secondary frame — the asymmetry that stops this
                reading like a template hero. */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }
              }
              className="absolute -bottom-12 -left-6 hidden aspect-[3/4] w-40 overflow-hidden bg-sand-deep shadow-[0_30px_60px_-40px_rgba(17,17,15,0.6)] lg:block xl:-left-16 xl:w-52"
            >
              <Image
                src={SECONDARY}
                alt="The Atelier Linen Shirt, photographed for the autumn campaign"
                fill
                sizes="220px"
                className="object-cover"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduced ? { duration: 0 } : { duration: 0.9, delay: 1 }}
              className="label-xs absolute right-0 top-full mt-4 text-taupe"
            >
              Campaign 04 — Crosby Street
            </motion.p>
          </div>
        </div>

        <div className="rule mt-24 flex items-center justify-between py-5 lg:mt-32">
          <p className="label-xs text-taupe">Scroll</p>
          <motion.div
            aria-hidden
            animate={{ y: [0, 6, 0] }}
            transition={
              reduced
                ? { duration: 0, repeat: 0 }
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <ArrowDown size={14} strokeWidth={1.25} className="text-taupe" />
          </motion.div>
          <p className="label-xs text-taupe">New York — 40.7237° N</p>
        </div>
      </div>
    </section>
  );
}
