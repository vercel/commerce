import Link from 'next/link'
import React from 'react'
import { RecipeProps } from 'src/utils/types.utils'
import s from './RecipeCard.module.scss'
export interface RecipeCardProps extends RecipeProps {}

const RecipeCard = ({ imageSrc, title, description }: RecipeCardProps) => {
  return (
    <div className={s.recipeCardWarpper}>
      <Link href="#">
        <div className={s.image}>
          <img src={imageSrc} alt="image recipe" />
        </div>
      </Link>
      <Link href="#">
        <div className={s.title}>{title}</div>
      </Link>
      <div className={s.description}>{description}</div>
    </div>
  )
}

export default RecipeCard
