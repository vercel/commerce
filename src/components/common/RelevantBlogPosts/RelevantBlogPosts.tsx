import image15 from '../../../../public/assets/images/image15.png'
import image16 from '../../../../public/assets/images/image16.png'
import image17 from '../../../../public/assets/images/image17.png'
import classNames from 'classnames'
import React from 'react'
import {  HeadingCommon, ViewAllItem } from 'src/components/common'
import { BlogCardProps } from 'src/components/common/CardBlog/CardBlog'
import BlogPostCarousel from './BlogPostCarousel/BlogPostCarousel'
import s from './RelevantBlogPosts.module.scss'
import { ROUTE } from 'src/utils/constanst.utils';

interface RelevantProps {
    data?: BlogCardProps[],
    itemKey?: string,
    title?: string,
    viewAllLink?: string,
    bgcolor: "default" | "cream"
}

const recipe:BlogCardProps[] = [
{
    title: "Want to Lose Weight? Here are 10 DEBM Diet Guidelines for Beginners",
    description:"The DEBM diet stands for "+'"Delicious Happy Fun Diet"'+". This diet was popularized by Robert...",
    imageSrc: image15.src,
    link: `${ROUTE.BLOG_DETAIL}`
},{
    title: "9 Ways to Make an Aloe Vera Mask at Home",
    description:"Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
    imageSrc: image16.src,
    link: `${ROUTE.BLOG_DETAIL}`
},{
    title: "Don't Buy Wrong, Here Are 7 Ways to Choose a Ripe Dragon Fruit",
    description:"Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
    imageSrc: image17.src,
    link: `${ROUTE.BLOG_DETAIL}`
},{
    title: "Want to Lose Weight? Here are 10 DEBM Diet Guidelines for Beginners",
    description:"The DEBM diet stands for "+'"Delicious Happy Fun Diet"'+". This diet was popularized by Robert...",
    imageSrc: image15.src,
    link: `${ROUTE.BLOG_DETAIL}`
},{
    title: "9 Ways to Make an Aloe Vera Mask at Home",
    description:"Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
    imageSrc: image16.src,
    link: `${ROUTE.BLOG_DETAIL}`
},{
    title: "Don't Buy Wrong, Here Are 7 Ways to Choose a Ripe Dragon Fruit",
    description:"Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
    imageSrc: image17.src,
    link: `${ROUTE.BLOG_DETAIL}`
}]

  const RelevantBlogPosts = ({ data = recipe, itemKey="detail-relevant", title="Relevant Blog Posts", bgcolor = "default" }: RelevantProps) => {
    return (
      <div className={classNames({
        [s.blogPostWarpper] : true,
        [s[bgcolor]] : bgcolor,
      })}
      >
        <div className={s.top}>
          <div className={s.left}>
            <HeadingCommon>{title}</HeadingCommon>
          </div>
          <div className={s.right}>
            <ViewAllItem link="#"/>
          </div>
        </div>
        <div className={s.bot}>
          <BlogPostCarousel data={data} itemKey={itemKey} />
        </div>
      </div>
    )
  }
  
  export default RelevantBlogPosts