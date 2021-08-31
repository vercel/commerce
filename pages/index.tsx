
import { Layout } from 'src/components/common';
import { MenuNavigation,MenuFilter} from 'src/components/common';
import { HomeBanner, HomeCategories, HomeCTA, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import { OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
const CATEGORY = [
  {
      name: 'All',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=${OPTION_ALL}`,
  },
  {
      name: 'Veggie',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=veggie`,
  },
  {
      name: 'Seafood',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=seafood`,
  },
  {
      name: 'Frozen',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=frozen`,
  },
  {
      name: 'Coffee Bean',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=coffee-bean`,
  },
  {
      name: 'Sauce',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=sauce`,
  },
]
export default function Home() {
  return (
    <>
      {/* <HomeBanner />
      <HomeCategories/>
      <HomeVideo />
      <HomeCTA />
      <HomeSubscribe /> */}
      <MenuFilter categories={CATEGORY} heading="Categories"/> 
      <MenuNavigation categories={CATEGORY} heading="Categories"/>
    </>
  )
}

Home.Layout = Layout
