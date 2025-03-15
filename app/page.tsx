import Footer from "components/layout/footer";
import { MainProductCard } from "components/product/main-product-card";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <MainProductCard />
      <Footer />
    </>
  );
}
