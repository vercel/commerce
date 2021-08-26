import React from 'react'
import {  HeadingCommon, ViewAllItem } from 'src/components/common'
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard'
import RecipeCaroucel from 'src/components/common/RecipeCaroucel/RecipeCaroucel'
import s from './HomeRecipe.module.scss'
import classNames from 'classnames';
interface HomeRecipeProps {
  data: RecipeCardProps[]
  itemKey: string
  title: string
  viewAllLink?: string
}

const HomeRecipe = ({ data, itemKey, title }: HomeRecipeProps) => {
  return (
    <div className={s.homeRecipeWarpper}>
      <div className={s.top}>
        <div className={s.left}>
          <HeadingCommon>{title}</HeadingCommon>
        </div>
        <div className={s.right}>
          <ViewAllItem />
        </div>
      </div>
			<div className={s.mid}>
        <button className={classNames(s.tab,s.active)}>Noodle</button>
        <button className={s.tab}>Curry</button>
        <button className={s.tab}>Special Recipes</button>
      </div>
      <div className={s.bot}>
        <RecipeCaroucel data={data} itemKey={itemKey} />
      </div>
    </div>
  )
}

export default HomeRecipe
