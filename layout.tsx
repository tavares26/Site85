import type { Metadata } from "next";
import { UniverseNav } from "@/components/UniverseNav";
import { UniverseCurtain } from "@/components/UniverseCurtain";
import { UniverseFooter } from "@/components/AgencyMarks";

export const metadata: Metadata = {
  title: { default: "Fifth — Beauty Salon", template: "%s · Brooklyn & Fifth" },
  description: "New York looks good on you. Third floor, 1067 Fifth Avenue.",
};

export default function FifthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="u-fifth min-h-screen bg-ff-cream text-ff-noir">
      <UniverseCurtain universe="fifth" />
      <UniverseNav universe="fifth" />
      <main id="main">{children}</main>
      <UniverseFooter universe="fifth" />
    </div>
  );
}
