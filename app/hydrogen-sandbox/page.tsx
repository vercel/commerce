import Footer from "components/layout/footer";
import { HydrogenDemo } from "components/hydrogen-demo";

export const metadata = {
  title: "Shopify Hydrogen React Sandbox | Lone Elk Coffee Co.",
  description: "Learn how to integrate and use @shopify/hydrogen-react components and hooks in Next.js.",
};

export default function HydrogenSandboxPage() {
  return (
    <>
      <HydrogenDemo />
      <Footer />
    </>
  );
}
