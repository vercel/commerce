import { Layout } from 'src/components/common';
import { HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import Test from './test';

export default function Home() {
  return (
    <>

      <Test />
      {/* <HomeBanner />
      <HomeFeature />
      <HomeCategories />
      <HomeCollection />
      <HomeVideo />
      <HomeCTA />
      <HomeRecipe />
      <HomeSubscribe /> */}

      {/* // todo: uncomment
      {/* <ModalCreateUserInfo/> */}
    </>
  )
}

Home.Layout = Layout
