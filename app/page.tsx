import { Hero } from 'components/home/hero';
import Newsletter from 'components/home/newsletter';
import Services from 'components/home/services';
import Footer from 'components/layout/footer';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-10">
          <Hero
            title="Eco friendly living now"
            description=""
            ctaText1="We believe sustainable living is possible starting from right inside our homes."
            ctaText2="We aim to bring sustainable, eco friendly, zero waste alternatives to common household items."
            ctaText3="Our mission is to replace 10 million plastic items with sustainable alternatives by 2030."
            image1="/home/sapling.jpg"
            image2="/home/water.jpg"
            image3="/home/lava.jpg"
            image4="/home/forest.jpg"
            image5="/home/fish.jpg"
          />
          <Services />
          <Newsletter />
        </div>
        <Footer />
      </div>
    </>
  );
}
