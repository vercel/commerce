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
    bgcolor?: "default" | "cream"
}

const recipe:BlogCardProps[] = [
{
    title: "Want to Lose Weight? Here are 10 DEBM Diet Guidelines for Beginners",
    slug: 'have-a-nice-lunch',
    description:"The DEBM diet stands for "+'"Delicious Happy Fun Diet"'+". This diet was popularized by Robert...",
    imageSrc: "https://user-images.githubusercontent.com/46085455/133185783-8100ef4e-7a72-4dc1-bb12-2ca46b56b393.png",
},{
    title: "9 Ways to Make an Aloe Vera Mask at Home",
    slug: 'have-a-nice-lunch',
    description:"Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
    imageSrc: "https://user-images.githubusercontent.com/46085455/133185911-df505d10-fdcd-4312-add3-7c62ad8af71e.png",
},{
    title: "Don't Buy Wrong, Here Are 7 Ways to Choose a Ripe Dragon Fruit",
    slug: 'have-a-nice-lunch',
    description:"Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
    imageSrc: "https://user-images.githubusercontent.com/46085455/133185959-7ad75580-ca6d-4684-83d9-3f64500bbc97.png",
},{
    title: "Want to Lose Weight? Here are 10 DEBM Diet Guidelines for Beginners",
    slug: 'have-a-nice-lunch',
    description:"The DEBM diet stands for "+'"Delicious Happy Fun Diet"'+". This diet was popularized by Robert...",
    imageSrc: "https://user-images.githubusercontent.com/46085455/133185783-8100ef4e-7a72-4dc1-bb12-2ca46b56b393.png",
},{
    title: "9 Ways to Make an Aloe Vera Mask at Home",
    slug: 'have-a-nice-lunch',
    description:"Aloe vera or  aloe vera  is a green plant, has thorns on the side of the skin with yellowish patches and...",
    imageSrc: "https://user-images.githubusercontent.com/46085455/133185911-df505d10-fdcd-4312-add3-7c62ad8af71e.png",
},{
    title: "Don't Buy Wrong, Here Are 7 Ways to Choose a Ripe Dragon Fruit",
    slug: 'have-a-nice-lunch',
    description:"Dragon fruit is a type of fruit that is a favorite for many people because of its delicious and fresh...",
    imageSrc: "https://user-images.githubusercontent.com/46085455/133185959-7ad75580-ca6d-4684-83d9-3f64500bbc97.png",
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
            <ViewAllItem link={ROUTE.BLOGS}/>
          </div>
        </div>
        <div className={s.bot}>
          <BlogPostCarousel data={data} itemKey={itemKey} />
        </div>
      </div>
    )
  }
  
  export default RelevantBlogPosts