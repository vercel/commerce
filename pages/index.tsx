import { Layout } from 'src/components/common';
import { FeaturedProductsCarousel, HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import HomeSpice from 'src/components/modules/home/HomeSpice/HomeSpice';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeFeature />
      <HomeCategories />
      <HomeCollection />
      <HomeVideo />
      <FeaturedProductsCarousel/>
      <HomeSpice/>
      <HomeCTA />
      <HomeRecipe />  
      <HomeSubscribe />

      {/* // todo: uncomment
      {/* <ModalCreateUserInfo/> */}
    </>
  )
}

Home.Layout = Layout
