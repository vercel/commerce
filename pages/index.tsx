import { Layout } from 'src/components/common';
import { FeaturedProductsCarousel, HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeFeature />
      <HomeCategories />
      <HomeCollection />
      <HomeVideo />
      <FeaturedProductsCarousel/>
      <HomeCTA />
      <HomeRecipe />
      <HomeSubscribe />

      {/* // todo: uncomment
      {/* <ModalCreateUserInfo/> */}
    </>
  )
}

Home.Layout = Layout
