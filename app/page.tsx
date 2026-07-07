import { FeaturedRoster } from "components/home/featured";
import { Hero } from "components/home/hero";
import { Marquee } from "components/home/marquee";
import { Metrics } from "components/home/metrics";
import { Story } from "components/home/story";
import Footer from "components/layout/footer";

export const metadata = {
  description:
    "Lone Elk Coffee Company — premium small-batch coffee, fresh-roasted on demand for outdoor athletes and rucking crews.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Metrics />
      <FeaturedRoster />
      <Story />
      <Footer />
    </>
  );
}
