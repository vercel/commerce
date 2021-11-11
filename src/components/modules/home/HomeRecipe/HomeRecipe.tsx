import React, { useEffect, useState } from 'react'
import {  HeadingCommon, ViewAllItem } from 'src/components/common'
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard'
import RecipeCarousel from 'src/components/common/RecipeCarousel/RecipeCarousel'
import s from './HomeRecipe.module.scss'
import classNames from 'classnames';
import image13 from "../../../../../public/assets/images/image13.png"
import image14 from "../../../../../public/assets/images/image14.png"
import image12 from "../../../../../public/assets/images/image12.png"
import HomeRecipeTab from './HomeRecipeTab/HomeRecipeTab'
import { RecipeCollection } from '@commerce/types/recipe-collection';
import { normalizeRecipe } from '@framework/utils/normalize'
import { ROUTE } from 'src/utils/constanst.utils'


interface HomeRecipeProps {
  // data?: RecipeCardProps[]
  itemKey?: string
  title?: string
  viewAllLink?: string
  recipesCollection:RecipeCollection[]

}

const HomeRecipe = ({ itemKey="home-recipe", title="Special Recipes", recipesCollection }: HomeRecipeProps) => {
  const [activeTab, setActiveTab] = useState<string>(recipesCollection[0].slug)
  const [data, setData] = useState<RecipeCardProps[]>(recipesCollection[0].recipes.items||[])

  const  onTabChanged = (value: string) => {
    setActiveTab(value)
    setData(recipesCollection.find(collection => collection.slug === value)?.recipes.items||[])
  }
  return (
    <div className={s.homeRecipeWarpper}>
      <div className={s.top}>
        <div className={s.left}>
          <HeadingCommon>{title}</HeadingCommon>
        </div>
        <div className={s.right}>
          <ViewAllItem link={ROUTE.RECIPES}/>
        </div>
      </div>
			<div className={s.mid}>
        {
          recipesCollection.map(item => <HomeRecipeTab
            key={item.id}
            activeValue={activeTab}
            name={item.name}
            value={item.slug}
            onClick={onTabChanged} />)
        }
      </div>
      <div className={s.bot}>
        <RecipeCarousel data={data} itemKey={itemKey} infinite={true}/>
      </div>
    </div>
  )
}

export default HomeRecipe
