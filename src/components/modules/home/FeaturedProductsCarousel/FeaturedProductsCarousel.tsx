import { TOptionsEvents } from 'keen-slider'
import React from 'react'
import { ResponsiveType } from 'react-multi-carousel'
import { CarouselCommon, FeaturedProductCard } from 'src/components/common'
import { FeaturedProductCardProps } from 'src/components/common/FeaturedProductCard/FeaturedProductCard'
import s from "./FeaturedProductsCarousel.module.scss"
interface FeaturedProductsCarouselProps {
    
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

const OPTION_DEFAULT: TOptionsEvents = {
    slidesPerView: 1,
    mode: 'free',
    breakpoints: {
      '(min-width: 300px)': {
        slidesPerView: 1.5,
      },
      '(min-width: 400px)': {
        slidesPerView: 2,
      },
      '(min-width: 640px)': {
        slidesPerView: 1.25,
      },
      '(min-width: 768px)': {
        slidesPerView: 1.075,
      },
      '(min-width: 968px)': {
        slidesPerView: 1.175,
      },
      '(min-width: 1024px)': {
        slidesPerView: 1.375,
      },'(min-width: 1148px)': {
        slidesPerView: 1.5,
      },'(min-width: 1280px)': {
        slidesPerView: 1.75,
      },'(min-width: 1440px)': {
        slidesPerView: 2.075,
      },
    },
  }
  const RESPONSIVE: ResponsiveType = {
    largeScreen: {
      breakpoint: { max: 9999, min: 1440 },
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
      items: 1.75,
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
      items: 2,
    },
    mobile: {
      breakpoint: { max: 400, min: 300 },
      items: 1.5,
    },
    smallMobile: {
      breakpoint: { max: 300, min: 0 },
      items: 1,
    },
  }

const FeaturedProductsCarousel = ({}: FeaturedProductsCarouselProps) => {
    return (
        <div className={s.warpper}>
            <CarouselCommon<FeaturedProductCardProps> data={dataDemo} Component={FeaturedProductCard} itemKey="featured-products" responsive={RESPONSIVE}/>
        </div>
    )
}

export default FeaturedProductsCarousel
