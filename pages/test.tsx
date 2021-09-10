import {
  Layout, RecipeDetail
} from 'src/components/common';
import MenuNavigation from 'src/components/common/MenuNavigation/MenuNavigation';
import MenuNavigationProductList from 'src/components/common/MenuNavigationProductList/MenuNavigationProductList';
import BlogContent from 'src/components/modules/blogs/BlogContent/BlogContent';
// import { RecipeListPage } from 'src/components/modules/recipes';
import { OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
import BlogDetailPage from 'src/components/modules/blogs/BlogDetailPage/BlogDetailPage';

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
const BRAND = [

  {
      name: 'Maggi',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=veggie`,
  },
  {
      name: 'Cholimes',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=seafood`,
  },
  {
      name: 'Chinsu',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=frozen`,
  }
];

const FEATURED = [

    {
        name: 'Best Sellers',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=veggie`,
    },
    {
        name: 'Sales',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=seafood`,
    },
    {
        name: 'New Item',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=frozen`,
    },
    {
        name: 'Viewed',
        link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=viewed`,
    }
  ];
export default function Test() {

  return (
    <>
      {/* <BlogDetailPage /> */}
      
      {/* <RecipeListPage/> */}
        {/*<MenuNavigation heading="CATEGORIES" categories={CATEGORY}/>*/}
           <MenuNavigationProductList categories={CATEGORY}  brands={BRAND} featured={FEATURED}/> 
    </>
  )
}

Test.Layout = Layout
