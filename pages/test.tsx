import { CarouselCommon, ProductCard, Layout } from 'src/components/common'
// import { RecipeListPage } from 'src/components/modules/recipes';
import { useModalCommon } from 'src/components/hooks'
import { PRODUCT_DATA_TEST } from 'src/utils/demo-data'
import { useKeenSlider } from 'keen-slider/react'
import { CSSProperties } from 'react'
import { ProductCardProps } from 'src/components/common/ProductCard/ProductCard'
import ColectionCarcousel from 'src/components/modules/home/CollectionCarcousel/CollectionCarcousel'
import { HomeCollection } from 'src/components/modules/home'
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
  const RESPONSIVE = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5.5,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <>
      <HomeCollection />
      {/* <CarouselCommon<ProductCardProps> showDots={true} draggable={true} infinite={true} data={PRODUCT_DATA_TEST} Component={ProductCard} responsive={RESPONSIVE} itemKey="tets"/> */}
    </>
  )
}

Test.Layout = Layout
