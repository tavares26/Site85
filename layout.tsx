import type { Metadata } from "next";
import { UniverseNav } from "@/components/UniverseNav";
import { UniverseCurtain } from "@/components/UniverseCurtain";
import { UniverseFooter } from "@/components/AgencyMarks";

export const metadata: Metadata = {
  title: { default: "Brooklyn — Barbershop", template: "%s · Brooklyn & Fifth" },
  description: "Built sharp. Stay classic. Four chairs on Wythe Avenue, Williamsburg.",
};

export default function BrooklynLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bk-ink text-bk-paper">
      <UniverseCurtain universe="brooklyn" />
      <UniverseNav universe="brooklyn" />
      <main id="main">{children}</main>
      <UniverseFooter universe="brooklyn" />
    </div>
  );
}
