import Image from "next/image";
import Link from "next/link";
import { photo } from "@/data/products";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "./SectionHeading";

/** Client photography, credited by handle — the section our clients fill. */
const POSTS = [
  { id: "w1", image: photo("1743082217603-e6c91b3ecd90", 800), handle: "@marabranco", piece: "Atelier Linen Shirt" },
  { id: "w2", image: photo("1719417850549-56a81bb87eb3", 800), handle: "@t.oliveira", piece: "North Overshirt" },
  { id: "w3", image: photo("1741768019347-7fd7730dc9ec", 800), handle: "@junealves", piece: "Merino Crew Knit" },
  { id: "w4", image: photo("1584273143981-41c073dfe8f8", 800), handle: "@studio.parr", piece: "The 85 Blazer" },
  { id: "w5", image: photo("1737553338682-cd52f5df9781", 800), handle: "@l.andrade", piece: "Pleated Wool Trouser" },
  { id: "w6", image: photo("1758183583798-b7038bca9272", 800), handle: "@carminecruz", piece: "Essential Tee 085" },
];

export function Worn85() {
  return (
    <section className="gutter mx-auto max-w-[120rem] pt-28 sm:pt-36">
      <SectionHeading
        eyebrow="07 — In the world"
        title="Worn"
        italic="/ 85"
        link={{ href: "/shop", label: "Shop what they wear" }}
        description="Photographs sent in by clients. Tag @north85 and we will ask before we post."
      />

      <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {POSTS.map((post, index) => (
          <Reveal as="li" key={post.id} delay={(index % 6) * 0.05}>
            <Link href="/shop" className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-sand-deep">
                <Image
                  src={post.image}
                  alt={`${post.handle} wearing the ${post.piece}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-editorial)] group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/25"
                />
                <p className="label-xs absolute bottom-0 left-0 p-3 text-sand opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {post.handle}
                </p>
              </div>
              <p className="mt-2.5 truncate text-[0.6875rem] text-taupe">{post.piece}</p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
