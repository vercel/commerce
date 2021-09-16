import {
  FeaturedProductCard,
  Layout
} from 'src/components/common';
// import { RecipeListPage } from 'src/components/modules/recipes';
import { OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
import { PRODUCT_DATA_TEST, PRODUCT_DATA_TEST_PAGE } from 'src/utils/demo-data';

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



const data = PRODUCT_DATA_TEST[0]
export default function Test() {
  return (
    <>
      <FeaturedProductCard
        imageSrc={data.imageSrc}
        title="Sale 25% coffee bean"
        subTitle="50 first orders within a day"
        price={data.price}
        originPrice="$20.00" />
    </>
  )
}

Test.Layout = Layout
