import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/commerce/OrderConfirmation";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Your demonstration order at NORTH 85, with a simulated tracking timeline.",
  robots: { index: false, follow: false },
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderConfirmation orderId={id} />;
}
