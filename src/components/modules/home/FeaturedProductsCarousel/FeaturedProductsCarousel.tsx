import React from 'react'
import { ResponsiveType } from 'react-multi-carousel'
import { CarouselCommon, FeaturedProductCard,HeadingCommon} from 'src/components/common'
import { FeaturedProductCardProps } from 'src/components/common/FeaturedProductCard/FeaturedProductCard'
import s from "./FeaturedProductsCarousel.module.scss"
interface FeaturedProductsCarouselProps {
  title?: string
}

const dataDemo:FeaturedProductCardProps[] = [{
    title: "Sale 25% Coffee Bean",
    subTitle: "50 first Orders within a day",
    originPrice: "$20.00",
    price: "$14.00",
    imageSrc: "https://user-images.githubusercontent.com/76099413/133043628-db7813f9-1bb7-4ee1-b028-dc4295563494.png"
},{
    title: "Sale 20% Fruits",
    subTitle: "50 first Orders within a day",
    originPrice: "$20.00",
    price: "$14.00",
    imageSrc: "https://user-images.githubusercontent.com/76099413/133043630-07a353b9-573d-4c1d-b1de-2c932e3f14f7.png"
},{
    title: "Sale 25% Coffee Bean",
    subTitle: "50 first Orders within a day",
    originPrice: "$20.00",
    price: "$14.00",
    imageSrc: "https://user-images.githubusercontent.com/76099413/133043633-954c105b-c703-4e5c-8f5f-7943ad633ff0.png"
}]
  const RESPONSIVE: ResponsiveType = {
    hugeScreen: {
      breakpoint: { max: 9999, min: 1500 },
      items: 2.25,
      slidesToSlide: 1, // optional, default to 1.
    },
    largeScreen: {
      breakpoint: { max: 1500, min: 1440 },
      items: 2.075,
      slidesToSlide: 1, // optional, default to 1.
    },
    largeDesktop: {
      breakpoint: { max: 1440, min: 1280 },
      items: 1.75,
      slidesToSlide: 1, // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 1280, min: 1148 },
      items: 1.5,
      slidesToSlide: 1, // optional, default to 1.
    },
    smallDesktop: {
      breakpoint: { max: 1148, min: 1024 },
      items: 1.375,
      slidesToSlide: 1, // optional, default to 1.
    },
    lap: {
      breakpoint: { max: 1024, min: 968 },
      items: 1.7,
    },
    tablet: {
      breakpoint: { max: 968, min: 768 },
      items: 1.075,
    },
    smallTablet: {
      breakpoint: { max: 768, min: 640 },
      items: 1.25,
    },
    largeMobile: {
      breakpoint: { max: 640, min: 400 },
      items: 1.275,
    },
    mobile: {
      breakpoint: { max: 400, min: 300 },
      items: 1.1,
    },
    smallMobile: {
      breakpoint: { max: 300, min: 0 },
      items: 1,
    },
  }

const FeaturedProductsCarousel = ({title="Featured Products"}: FeaturedProductsCarouselProps) => {
    return (
        <div className={s.warpper}>
           <div className={s.heading}>
            <HeadingCommon>{title}</HeadingCommon>
          </div>
            <CarouselCommon<FeaturedProductCardProps> data={dataDemo} Component={FeaturedProductCard} itemKey="featured-products" responsive={RESPONSIVE}/>
        </div>
    )
}

export default FeaturedProductsCarousel
