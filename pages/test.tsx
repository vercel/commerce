import { CartDrawer, Layout } from 'src/components/common'
import MenuNavigationProductList from 'src/components/common/MenuNavigationProductList/MenuNavigationProductList'
// import { RecipeListPage } from 'src/components/modules/recipes';
import { OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import { useModalCommon } from 'src/components/hooks'
import {
  CollectionCarcousel,
  HomeCollection,
} from 'src/components/modules/home'
import { PRODUCT_DATA_TEST } from 'src/utils/demo-data'
import { useKeenSlider } from 'keen-slider/react'
import { CSSProperties } from 'react'
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
  },
]

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
  },
]
export default function Test() {
  const {
    visible: visibleMenuFilter,
    openModal,
    closeModal: closeMenuFilter,
  } = useModalCommon({ initialValue: false })
  const toggle = () => {
    if (visibleMenuFilter) {
      closeMenuFilter()
    } else {
      openModal()
    }
  }

  const style: CSSProperties = {
    background: 'gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '50px',
    color: '#fff',
    fontWeight: 500,
    height: '300px',
    maxHeight: '100vh',
  }
  const [sliderRef] = useKeenSlider<HTMLDivElement>({ slidesPerView: 2 })

  return (
    <>
      {/* <HomeCollection /> */}
      {/* <CollectionCarcousel
        data={PRODUCT_DATA_TEST}
        itemKey="tesst"
        category="test"
        title="test"
        subtitle=""
      /> */}
      <div ref={sliderRef} className="keen-slider">
        {/* {[...Array(10).keys()].map(() => {
          return (
            <div className="keen-slider__slide number-slide1" style={style}>
              1
            </div>
          )
        })} */}
                    <div className="keen-slider__slide number-slide1" style={style}>
              1
            </div>
            <div className="keen-slider__slide number-slide1" style={style}>
              1
            </div>
            <div className="keen-slider__slide number-slide1" style={style}>
              1
            </div>
            <div className="keen-slider__slide number-slide1" style={style}>
              1
            </div>
            <div className="keen-slider__slide number-slide1" style={style}>
              1
            </div>
            <div className="keen-slider__slide number-slide1" style={style}>
              1
            </div>
            <div className="keen-slider__slide number-slide1" style={style}>
              1
            </div>
            <div className="keen-slider__slide number-slide1" style={style}>
              1
            </div>
            
      </div>
    </>
  )
}

Test.Layout = Layout
