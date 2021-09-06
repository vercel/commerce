
import { Layout } from 'src/components/common';
import { HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import {SelectCommon} from 'src/components/common'

const OPTION_SORT = [
  {
    name: "By Name"
  },
  {
    name: "Price (High to Low)"
  },
  {
    name: "On Sale"
  }
]

export default function Home() {
  return (
    <>
      {/* <HomeBanner />
      <HomeBanner/>
      <HomeFeature />
      <HomeCategories />
      <HomeCollection />
      <HomeVideo />
      <HomeCTA />
      <HomeRecipe />
      <HomeSubscribe /> */}
      <SelectCommon option={OPTION_SORT}>Sort By</SelectCommon>
      <SelectCommon option={OPTION_SORT} size="large" type="custom">Sort By</SelectCommon>

      {/* // todo: uncomment */}
      {/* <ModalCreateUserInfo/> */}
    </>
  )
}

Home.Layout = Layout
