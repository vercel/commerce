
import { Layout, BreadcrumbCommon, TabCommon } from 'src/components/common'
import { AccountNavigation, DeliveryItem, AccountPage } from 'src/components/modules/account';


export default function Home() {

  const crumbs = [
    {link: "/", name: "Home"},
    {link: "/blogs", name: "Blog"},
    {link: "/product-list", name: "Product List"},
    {link: "/product-detail", name: "Product Detail"},
  ];

  return (
    <>
      <BreadcrumbCommon crumbs={crumbs} showHomePage={true} />
      <AccountPage />

      

      {/* <HomeBanner />
      <HomeFeature />
      <HomeCategories />
      <HomeCollection />
      <HomeVideo />
      <HomeCTA />
      <HomeRecipe />
      <HomeSubscribe /> */}
    </>
  )
}

Home.Layout = Layout
