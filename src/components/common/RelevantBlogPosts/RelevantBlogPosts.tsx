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

  const RelevantBlogPosts = ({ data , itemKey="detail-relevant", title="Relevant Blog Posts", bgcolor = "default" }: RelevantProps) => {
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
           <BlogPostCarousel data={data} itemKey={itemKey} />}
        </div>
      </div>
    )
  }
  
  export default RelevantBlogPosts