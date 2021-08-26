
import { Layout } from 'src/components/common';
import { HomeBanner, HomeCTA, HomeSubscribe } from 'src/components/modules/home';


export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeCTA />
      <HomeSubscribe />
    </>
  )
}

Home.Layout = Layout
