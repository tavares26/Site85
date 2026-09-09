import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { DemoNotice } from "@/components/layout/DemoNotice";
import { BagDrawer } from "@/components/commerce/BagDrawer";
import { SearchOverlay } from "@/components/commerce/SearchOverlay";
import { BRAND, STUDIO } from "@/data/site";

/**
 * Cormorant Garamond carries the display voice — high contrast, old-style
 * figures, the register of a printed lookbook. Jost handles every label and
 * control: a geometric grotesque close to the Futura used across fashion
 * houses, which keeps the small caps crisp at 11px.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://north85.demo"),
  title: {
    default: `${BRAND.name} — Concept Store, New York`,
    template: `%s — ${BRAND.name}`,
  },
  description:
    "NORTH 85 is a New York concept store for considered dressing: clothing, accessories, fragrance and objects, cut in small runs. A fictional commerce experience by Manhattan Studios.",
  keywords: [
    "concept store",
    "editorial fashion ecommerce",
    "minimal menswear",
    "considered wardrobe",
    "New York concept store",
  ],
  authors: [{ name: STUDIO.name }],
  creator: STUDIO.name,
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: `${BRAND.name} — Concept Store, New York`,
    description:
      "Clothing, accessories, fragrance and objects, cut in small runs. A demonstration commerce experience by Manhattan Studios.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Concept Store, New York`,
    description: "A fictional concept store built by Manhattan Studios.",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#11110F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-dvh antialiased">
        <MotionProvider>
        <StoreProvider>
          <a
            href="#main"
            className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-charcoal focus:px-5 focus:py-3 focus:text-sand"
          >
            Skip to content
          </a>

          <AnnouncementBar />
          <Header />

          <main id="main">{children}</main>

          <Footer />

          <BagDrawer />
          <SearchOverlay />
          <DemoNotice />
        </StoreProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
