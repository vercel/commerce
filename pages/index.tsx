
import { Layout } from 'src/components/common'
import { HomeBanner, HomeCollection, HomeCTA, HomeSubscribe, HomeVideo, HomeCategories } from 'src/components/modules/home';
import HomeRecipe from 'src/components/modules/home/HomeRecipe/HomeRecipe';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeCollection/>
      <HomeCategories/>
      <HomeVideo />
      <HomeCTA />
      <HomeRecipe />
      <HomeSubscribe />
    </>
  )
}

Home.Layout = Layout
