import { TOptionsEvents } from 'keen-slider'
import React from 'react'
import CarouselCommon, {
  CarouselCommonProps,
} from '../../CarouselCommon/CarouselCommon'
import BlogCard, { BlogCardProps } from 'src/components/common/CardBlog/CardBlog'
import s from "./BlogPostCarousel.module.scss"

interface BlogPostCarouselProps
  extends Omit<CarouselCommonProps<BlogCardProps>, 'Component'|"option"> {
		option?:TOptionsEvents
	}

const OPTION_DEFAULT: TOptionsEvents = {
  slidesPerView: 1.25,
  mode: 'free',
  spacing:24,
  breakpoints: {
    '(min-width: 640px)': {
      slidesPerView: 2,
    },
    '(min-width: 1024px)': {
      slidesPerView: 2.5,
    },
    '(min-width: 1440px)': {
      slidesPerView: 3,
    },
    '(min-width: 1536px)': {
      slidesPerView: 3.5,
    },
  },
}
const BlogPostCarousel = ({ option, data, ...props }: BlogPostCarouselProps) => {
  return (
    <div className={s.blogCardWarpper}>
      <CarouselCommon<BlogCardProps>
        data={data}
        Component={BlogCard}
        {...props}
        option={{ ...OPTION_DEFAULT, ...option }}
      />
    </div>
  )
}

export default BlogPostCarousel
