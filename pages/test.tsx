import {
  CartDrawer,
  Layout
} from 'src/components/common';
import MenuNavigationProductList from 'src/components/common/MenuNavigationProductList/MenuNavigationProductList';
// import { RecipeListPage } from 'src/components/modules/recipes';
import { OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
import { useModalCommon } from 'src/components/hooks';

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


import CheckoutSuccess from 'src/components/modules/checkout/CheckoutSuccess/CheckoutSuccess'
import LoadingCommon from 'src/components/common/LoadingCommon/LoadingCommon'
import SkeletonParagraph from 'src/components/common/SkeletonCommon/SkeletonParagraph/SkeletonParagraph'
import SkeletonImage from 'src/components/common/SkeletonCommon/SkeletonImage/SkeletonImage'

export default function Test() {
  return (
    <>
    <div className="shape-common-border">
      <div className="inner">
        Lorem ipsum dolor sit amet.
      </div>
    </div>
      {/* <BlogDetailPage /> */}
      
      {/* <RecipeListPage/> */}
        {/*<MenuNavigation heading="CATEGORIES" categories={CATEGORY}/>*/}
        {/* <button onClick={toggle}>toggle menu : {visibleMenuFilter.toString()}</button>
           <MenuNavigationProductList categories={CATEGORY}  brands={BRAND} featured={FEATURED} visible={visibleMenuFilter} onClose={closeMenuFilter}/>  */}
           {/* <CartDrawer  /> */}
           <div className="shape-common-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit maiores aut, delectus assumenda explicabo, dolore facilis, quasi quae sed obcaecati doloribus dolorum architecto aperiam nisi dignissimos consequuntur amet neque possimus.
           </div>
           <div className="shape-common-lg-border">
              <div className="inner">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, porro aut. Quas, consequuntur! Officiis magni cum placeat magnam ut hic beatae error facere obcaecati. Labore eius explicabo fugit minus veritatis.
              </div>
           </div>
    </>
  )
}

Test.Layout = Layout
