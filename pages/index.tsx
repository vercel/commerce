
import { Layout } from 'src/components/common';
import { HomeBanner, HomeCTA } from 'src/components/modules/home';


export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeCTA/>
    </>
  )
}

Home.Layout = Layout
