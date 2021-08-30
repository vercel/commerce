
import { Layout } from 'src/components/common'
import { HomeBanner, HomeCollection, HomeCTA, HomeSubscribe, HomeVideo, HomeCategories, HomeFeature, HomeRecipe } from 'src/components/modules/home';

export default function Home() {
  return (
    <>
<<<<<<< HEAD
      <div>This is home page</div>
      <ViewAllItem link="/all"/>
      <ItemWishList />
      <Logo />
      <SelectCommon option={OPTION_SORT}>Sort by</SelectCommon>
      <SelectCommon option={OPTION_STATES} size={"large"} type={"custom"}>States</SelectCommon>
=======
      <HomeBanner />
      <HomeFeature />
      <HomeCategories />
      <HomeCollection />
      <HomeVideo />
      <HomeCTA />
      <HomeRecipe />
      <HomeSubscribe />
>>>>>>> 08cd011b5ebb28ba4205d167dc07c81e3b9c3072
    </>
  )
}

Home.Layout = Layout
