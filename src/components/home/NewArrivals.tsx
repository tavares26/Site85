import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionHeading } from "./SectionHeading";

export function NewArrivals() {
  const arrivals = [...PRODUCTS]
    .sort((a, b) => b.releasedAt.localeCompare(a.releasedAt))
    .slice(0, 4);

  return (
    <section className="gutter mx-auto max-w-[120rem] pt-20 sm:pt-28">
      <SectionHeading
        eyebrow="01 — Just landed"
        title="New"
        italic="arrivals"
        link={{ href: "/shop", label: "All products" }}
        description="The most recent additions to the permanent collection, in the order they came off the machine."
      />

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
        {arrivals.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            /* Second and fourth cards run taller — a printed-page rhythm
               rather than a uniform grid. */
            aspect={index % 2 === 1 ? "tall" : "regular"}
            priority={index < 2}
          />
        ))}
      </div>
    </section>
  );
}
