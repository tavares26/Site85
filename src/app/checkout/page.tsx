import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/commerce/CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout",
  description: "A demonstration checkout for NORTH 85. No real payment is processed.",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
