import ContactUs from 'components/contact-us';
import Quicklinks from 'components/home/quicklinks';
import LatestNews from 'components/latest-news';
import Hero from 'components/layout/hero/hero-1';
import ScienceInnovation from 'components/science-innovation';

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Quicklinks />
      <LatestNews />
      <ScienceInnovation />
      <ContactUs />
    </>
  );
}
