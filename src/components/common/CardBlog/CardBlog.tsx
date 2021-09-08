import Link from 'next/link'
import React from 'react'
import { RecipeProps } from 'src/utils/types.utils'
import s from './CardBlog.module.scss'
export interface BlogCardProps extends RecipeProps {
    link: string,
}

const CardBlog = ({ imageSrc, title, description, link }: BlogCardProps) => {
  return (
    <div className={s.cardBlogWarpper}>
      <Link href={link}>
        <div className={s.image}>
          <img src={imageSrc} alt="image cardblog" />
        </div>
      </Link>
      <Link href={link}>
        <div className={s.title}>{title}</div>
      </Link>
      <div className={s.description}>{description}</div>
    </div>
  )
}

export default CardBlog
