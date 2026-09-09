"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const HERO =
  "https://images.unsplash.com/photo-1727341557146-4abab94d0812?auto=format&fit=crop&w=1600&q=80";

/** The image opens first, the sentence is set into the space it leaves. */
export function FifthHero() {
  const reduced = useReducedMotion();

  const line = (delay: number) => ({
    initial: reduced ? false : { y: "112%" },
    animate: { y: "0%" },
    transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <section className="tex-stock relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:px-12 lg:pb-24">
      <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-center lg:col-span-8">
          <motion.p
            className="font-garamond text-xl italic text-ff-noir/50"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            1067 Fifth Avenue, third floor, by appointment
          </motion.p>

          <h1 className="mt-5 font-didone text-ff-noir">
            <span className="block overflow-hidden">
              <motion.span className="block text-colossal leading-[0.86]" {...line(0.3)}>
                New York
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-colossal italic leading-[0.86] text-ff-rouge"
                {...line(0.4)}
              >
                looks good
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block text-colossal leading-[0.86]" {...line(0.5)}>
                on you.
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mt-8 max-w-measure-serif font-garamond text-2xl leading-relaxed text-ff-noir/75">
              A room above the avenue with four stations, north light and no music. Colour
              is judged against the window, never under a lamp, which is why the
              appointments run long and the diary is short.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/book"
                className="stamp bg-ff-noir px-7 py-4 text-ff-chalk transition-colors hover:bg-ff-rouge"
              >
                Request a station
              </Link>
              <Link
                href="/fifth/services"
                className="link-underline font-garamond text-xl italic text-ff-noir/70"
              >
                See the service list
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative lg:col-span-4"
          initial={reduced ? false : { clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[34rem]">
            <Image
              src={HERO}
              alt="A woman photographed against a wall on the Upper East Side"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="object-cover object-top"
            />
          </div>
          <p className="mt-2 font-garamond text-base italic text-ff-noir/45">
            Colour by Isabel, photographed off Madison
          </p>
        </motion.div>
      </div>
    </section>
  );
}
