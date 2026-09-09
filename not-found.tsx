import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="tex-brick tex-grain flex min-h-screen flex-col justify-center px-5 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[92rem]">
        <p className="stamp text-bk-brass">Nothing at this address</p>
        <h1 className="mt-6 font-slab text-mega uppercase leading-[0.84] text-bk-paper">
          Wrong
          <span className="block text-bk-brass">door.</span>
        </h1>
        <p className="mt-8 max-w-measure font-grot text-xl leading-relaxed text-bk-paper/70">
          Two houses, eleven pages, and this is not one of them. The split screen is the
          way back in.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="stamp bg-bk-brass px-7 py-3.5 text-bk-ink">
            Back to the split
          </Link>
          <Link
            href="/brooklyn"
            className="stamp border border-bk-brass/40 px-7 py-3.5 text-bk-paper/75"
          >
            The shop
          </Link>
          <Link
            href="/fifth"
            className="stamp border border-bk-brass/40 px-7 py-3.5 text-bk-paper/75"
          >
            The salon
          </Link>
        </div>
      </div>
    </main>
  );
}
