
import { Layout } from 'src/components/common';
import { RecipesListPage } from 'src/components/modules/recipes';
import { BlogDetailImg } from 'src/components/modules/blogs';
import BlogDetail from '../src/components/modules/blogs/BlogDetailImg/img/blogdetail.png';
import { OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import MenuNavigation from 'src/components/common/MenuNavigation/MenuNavigation';
const CATEGORY = [
  {
      name: 'All',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=${OPTION_ALL}`,
  },
  {
      name: 'Veggie',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=veggie`,
  },
  {
      name: 'Seafood',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=seafood`,
  },
  {
      name: 'Frozen',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=frozen`,
  },
  {
      name: 'Coffee Bean',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=coffee-bean`,
  },
  {
      name: 'Sauce',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=sauce`,
  },
];
// const BRANDS = [

//   {
//       name: 'Maggi',
//       link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=veggie`,
//   },
//   {
//       name: 'Chomilex',
//       link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=chomilex`,
//   },
//   {
//     name: 'Chinsu',
//     link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=chinsu`,
//   }
// ];

// const FEATURED = [

//   {
//       name: 'Best Sellers',
//       link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=best-sellers`,
//   },
//   {
//       name: 'Sales',
//       link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=sales`,
//   },
//   {
//     name: 'New Item',
//     link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=new-item`,
//   },
//   {
//     name: 'Viewed',
//     link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=viewed`,
//   }
// ]
export default function Test() {
  return (
    <>
      {/* <RecipesListPage/> */}
      {/* <MenuNavigationProductList categories={CATEGORY} brands={BRANDS} featured={FEATURED}/> */}
      {/* <MenuFilter categories={CATEGORY} heading="Categories"/>  */}
      {/* <MenuNavigation categories={CATEGORY} heading="Categories"/> */}
      <MenuNavigation categories={CATEGORY} heading="Categories"/>
      {/* <BlogDetailImg image={BlogDetail}/> */}
    </>
  )
}

