
import { Layout } from 'src/components/common';
import { HomeBanner, HomeCTA, HomeSubscribe, HomeVideo } from 'src/components/modules/home';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeVideo />
      <HomeCTA />
      <HomeSubscribe />
    </>
  )
}

Home.Layout = Layout
