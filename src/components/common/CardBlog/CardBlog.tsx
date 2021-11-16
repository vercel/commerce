import Link from 'next/link'
import React from 'react'
import { ROUTE } from 'src/utils/constanst.utils'
import { BlogProps } from 'src/utils/types.utils'
import { ImgWithLink } from '..'
import s from './CardBlog.module.scss'

export interface BlogCardProps extends BlogProps {
}

const CardBlog = ({ imageSrc, title, description, slug }: BlogCardProps) => {
  return (
    <div className={s.cardBlogWarpper}>
      <Link href={`${ROUTE.BLOG_DETAIL}/${slug}`}>
        <a> 
          <div className={s.image}>
            <ImgWithLink src={imageSrc ?? ''} alt={title} />
          </div>
        </a>
      </Link>
      <Link href={`${ROUTE.BLOG_DETAIL}/${slug}`}>
        <a>
          <div className={s.title}>{title}</div>
        </a>
      </Link>
      <div className={s.description} dangerouslySetInnerHTML={{__html: description}}></div>
    </div>
  )
}

export default CardBlog