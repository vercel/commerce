
import { Layout, ModalCreateUserInfo } from 'src/components/common'
import { HomeBanner, HomeCollection, HomeCTA, HomeSubscribe, HomeVideo, HomeCategories, HomeFeature, HomeRecipe } from 'src/components/modules/home';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeFeature />
      <HomeCategories />
      <HomeCollection />
      <HomeVideo />
      <HomeCTA />
      <HomeRecipe />
      <HomeSubscribe />

      <ModalCreateUserInfo/>
    </>
  )
}

Home.Layout = Layout
