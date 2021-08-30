
import { Layout } from 'src/components/common';
import { MenuNavigation,MenuFilter} from 'src/components/common';
import { HomeBanner, HomeCategories, HomeCTA, HomeSubscribe, HomeVideo } from 'src/components/modules/home';

export default function Home() {
  return (
    <>
      {/* <HomeBanner />
      <HomeCategories/>
      <HomeVideo />
      <HomeCTA />
      <HomeSubscribe /> */}
      <MenuFilter heading="Categories"/> 
      <MenuNavigation heading="Categories"/>
    </>
  )
}

Home.Layout = Layout
