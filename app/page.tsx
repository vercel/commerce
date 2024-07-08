import FAQ from 'components/faq';
import Hero from 'components/hero';
import About from 'components/home-page/about';
import Manufacturers from 'components/home-page/manufacturers';
import WhyChoose from 'components/home-page/why-choose';
import Footer from 'components/layout/footer';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const runtime = 'edge';
const { SITE_NAME, STORE_PREFIX } = process.env;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SITE_NAME,
    description: `${SITE_NAME} is your ultimate destination for all your drivetrain replacement needs.`,
    openGraph: {
      type: 'website'
    }
  };
}

const manufactureVariant: Record<
  string,
  'home' | 'engines' | 'transmissions' | 'remanufactured-engines'
> = {
  'reman-transmission': 'transmissions',
  'car-part-planet': 'home',
  'reman-engine': 'remanufactured-engines',
  'transmission-locator': 'transmissions',
  'engine-locator': 'engines'
};

export default async function HomePage() {
  return (
    <>
      <Hero />
      <div className="flex min-h-96 flex-col">
        <Suspense>
          <About />
        </Suspense>
        <Suspense>
          <WhyChoose />
        </Suspense>
        <Suspense>
          <FAQ handle="home-page-faqs" />
        </Suspense>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-20">
          <Suspense>
            <Manufacturers variant={manufactureVariant[STORE_PREFIX!]} />
          </Suspense>
        </div>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
