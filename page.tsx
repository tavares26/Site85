import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BookingFlow } from "@/components/BookingFlow";
import { agency } from "@/data/fictional-data";

export const metadata: Metadata = {
  title: "Book a chair",
  description:
    "Six steps, no backend. A demonstration booking flow for Brooklyn & Fifth.",
};

export default function BookPage() {
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-bk-brass/20 bg-bk-ink/90 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-12">
        <Link href="/" className="font-slab text-xl uppercase tracking-rivet text-bk-paper">
          Brooklyn <span className="text-bk-brass">&amp;</span> Fifth
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/brooklyn" className="stamp text-bk-paper/60 hover:text-bk-brass">
            Shop
          </Link>
          <Link href="/fifth" className="stamp text-bk-paper/60 hover:text-bk-brass">
            Salon
          </Link>
        </div>
      </nav>

      <main id="main">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-bk-ink">
            <p className="stamp text-bk-brass">Opening the diary</p>
          </div>
        }
      >
        <BookingFlow />
      </Suspense>
      </main>

      <footer className="border-t border-bk-brass/20 bg-bk-ink px-5 py-8 sm:px-8 lg:px-12">
        <p className="stamp text-bk-brass/70">{agency.signature}</p>
      </footer>
    </>
  );
}
