import { Layout } from 'src/components/common';
import { HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import {SelectCommon} from 'src/components/common'
import card from "../public/assets/images/card.png"


export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeBanner/>
      <HomeFeature />
      <HomeCategories />
      <HomeCollection />
      <HomeVideo />
      <HomeCTA />
      <HomeRecipe />
      <HomeSubscribe />
      {/* todo: uncomment */}
      {/* <ModalCreateUserInfo/> */}
    </>
  )
}

Home.Layout = Layout
