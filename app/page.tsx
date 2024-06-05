import Hero from 'components/hero';
import About from 'components/home-page/about';
import WhyChoose from 'components/home-page/why-choose';
import Footer from 'components/layout/footer';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const runtime = 'edge';
const { SITE_NAME } = process.env;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SITE_NAME,
    description: `${SITE_NAME} is your ultimate destination for all your drivetrain replacement needs.`,
    openGraph: {
      type: 'website'
    }
  };
}

export default async function HomePage() {
  return (
    <>
      <Suspense>
        <Hero />
      </Suspense>
      <div className="mx-auto flex min-h-96 max-w-7xl flex-col space-y-14 px-6 py-16 sm:space-y-28 lg:px-8">
        <About />
        <WhyChoose />
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
