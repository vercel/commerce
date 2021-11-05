import React from 'react'
import CarouselCommon, {
  CarouselCommonProps,
} from '../../CarouselCommon/CarouselCommon'
import BlogCard, { BlogCardProps } from 'src/components/common/CardBlog/CardBlog'
import s from "./BlogPostCarousel.module.scss"
import { ResponsiveType } from 'react-multi-carousel'

interface BlogPostCarouselProps
  extends Omit<CarouselCommonProps<BlogCardProps>, 'Component'|"option"> {
	}
  
const RESPONSIVE: ResponsiveType = {
  largeDesktop: {
    breakpoint: { max: 9999, min: 1536 },
    items: 3.5,
    slidesToSlide: 3.5, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 1536, min: 1440 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  lap: {
    breakpoint: { max: 1440, min: 1024 },
    items: 2.5,
    slidesToSlide: 2.5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1.25,
    slidesToSlide: 1.25,
  },
}
const BlogPostCarousel = ({ data, ...props }: BlogPostCarouselProps) => {
  return (
    <div className={s.blogCardWarpper}>
      <CarouselCommon<BlogCardProps>
        data={data}
        Component={BlogCard}
        {...props}
        responsive={RESPONSIVE}
      />
    </div>
  )
}

export default BlogPostCarousel
