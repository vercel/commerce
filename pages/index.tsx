
import { Layout } from 'src/components/common';
import { HomeBanner, HomeCategories, HomeCTA, HomeSubscribe, HomeVideo } from 'src/components/modules/home';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeCategories/>
      <HomeVideo />
      <HomeCTA />
      <HomeSubscribe />
    </>
  )
}

Home.Layout = Layout
