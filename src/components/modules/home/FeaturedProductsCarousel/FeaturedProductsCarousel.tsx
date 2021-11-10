import { FacetValue } from '@framework/schema'
import React, { useMemo } from 'react'
import { ResponsiveType } from 'react-multi-carousel'
import { CarouselCommon, FeaturedProductCard, HeadingCommon } from 'src/components/common'
import { FeaturedProductCardProps } from 'src/components/common/FeaturedProductCard/FeaturedProductCard'
import { getFacetNamesFromIds } from 'src/utils/funtion.utils'
import s from "./FeaturedProductsCarousel.module.scss"
interface FeaturedProductsCarouselProps {
  data: FeaturedProductCardProps[]
  featuredFacetsValue: FacetValue[],
}

const RESPONSIVE: ResponsiveType = {
  hugeScreen: {
    breakpoint: { max: 9999, min: 1500 },
    items: 2.25,
    slidesToSlide: 2.25
  },
  largeScreen: {
    breakpoint: { max: 1500, min: 1440 },
    items: 2.075,
    slidesToSlide: 2.075,
  },
  largeDesktop: {
    breakpoint: { max: 1440, min: 1280 },
    items: 2.05,
    slidesToSlide: 2.05,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1148 },
    items: 1.85,
    slidesToSlide: 1.85,
  },
  smallDesktop: {
    breakpoint: { max: 1148, min: 1024 },
    items: 1.375,
    slidesToSlide: 1.375, 
  },
  lap: {
    breakpoint: { max: 1024, min: 968 },
    items: 1.7,
    slidesToSlide: 1.7, 
  },
  tablet: {
    breakpoint: { max: 968, min: 768 },
    items: 1.075,
    slidesToSlide: 1.075, 

  },
  smallTablet: {
    breakpoint: { max: 768, min: 640 },
    items: 1.25,
    slidesToSlide: 1.25, 
  },
  largeMobile: {
    breakpoint: { max: 640, min: 400 },
    items: 1.275,
    slidesToSlide: 1.275, 
  },
  mobile: {
    breakpoint: { max: 400, min: 300 },
    items: 1.1,
    slidesToSlide: 1.1, 
  },
  smallMobile: {
    breakpoint: { max: 300, min: 0 },
    items: 1,
    slidesToSlide: 1, 
  },
}

const FeaturedProductsCarousel = ({ data, featuredFacetsValue }: FeaturedProductsCarouselProps) => {
  const featuredProducts = useMemo(() => {
    return data.map(item => {
      return {
        ...item,
        subText: getFacetNamesFromIds(featuredFacetsValue, item.facetValueIds)
      }
    })
  }, [data, featuredFacetsValue])
  return (
    <div className={s.warpper}>
      <div className={s.heading}>
        <HeadingCommon>Featured Products</HeadingCommon>
      </div>
      <CarouselCommon<FeaturedProductCardProps>
        data={featuredProducts}
        defaultComponentProps={featuredFacetsValue}
        Component={FeaturedProductCard}
        itemKey="featured-products"
        responsive={RESPONSIVE} />
    </div>
  )
}

export default FeaturedProductsCarousel
