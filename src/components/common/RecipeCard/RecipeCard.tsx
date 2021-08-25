import React from 'react'
import { RecipeProps } from 'src/utils/types.utils'
import s from './RecipeCard.module.scss'
interface RecipeCardProps extends RecipeProps {}

const RecipeCard = ({ imageSrc, title, description }: RecipeCardProps) => {
  return (
    <div className={s.recipeCardWarpper}>
      <div className={s.image}>
        <img src={imageSrc} alt="image recipe" />
      </div>
      <div className={s.title}>{title}</div>
      <div className={s.description}>{description}</div>
    </div>
  )
}

export default RecipeCard
