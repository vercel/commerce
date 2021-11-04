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


interface HomeRecipeProps {
  // data?: RecipeCardProps[]
  itemKey?: string
  title?: string
  viewAllLink?: string
  recipesCollection:RecipeCollection[]

}



// const recipe:RecipeCardProps[] = [{
//   title: "Special Recipe of Vietnamese Phở",
//   description:"Alright, before we get to the actual recipe, let’s chat for a sec about the ingredients.  To make this pho soup recipe, you will need:",
//   imageSrc: image12.src
// },{
//   title: "Original Recipe of Curry",
//   description:"Chicken curry is common to several countries including India, countries in Asia and the Caribbean. My favorite of them though is this aromatic Indian...",
//   imageSrc: image13.src
// },{
//   title: "The Best Recipe of Beef Noodle Soup",
//   description:"The broth for Bun Bo Hue is prepared by slowly simmering various types of beef and pork bones (ox tail, beef shank, pork neck bones, pork feet,...",
//   imageSrc: image14.src
// },{
//   title: "Special Recipe of Vietnamese Phở",
//   description:"Alright, before we get to the actual recipe, let’s chat for a sec about the ingredients.  To make this pho soup recipe, you will need:",
//   imageSrc: image12.src
// },{
//   title: "Original Recipe of Curry",
//   description:"Chicken curry is common to several countries including India, countries in Asia and the Caribbean. My favorite of them though is this aromatic Indian...",
//   imageSrc: image13.src
// },{
//   title: "The Best Recipe of Beef Noodle Soup",
//   description:"The broth for Bun Bo Hue is prepared by slowly simmering various types of beef and pork bones (ox tail, beef shank, pork neck bones, pork feet,...",
//   imageSrc: image14.src
// }]


const TABS = [
  {
    name: 'Noodle',
    value: 'Noodle',
  },
  {
    name: 'Curry',
    value: 'Curry',
  },
  {
    name: 'Special Recipes',
    value: 'Special Recipes',
  }
]

const HomeRecipe = ({ itemKey="home-recipe", title="Special Recipes", recipesCollection }: HomeRecipeProps) => {
  const [activeTab, setActiveTab] = useState<string>(recipesCollection[0].slug)
  const [data, setData] = useState<RecipeCardProps[]>(recipesCollection[0].recipes.items.map((recipe)=>normalizeRecipe(recipe))||[])

  const  onTabChanged = (value: string) => {
    setActiveTab(value)
    setData(recipesCollection.find(collection => collection.slug === value)?.recipes.items.map((recipe)=>normalizeRecipe(recipe))||[])
  }
  return (
    <div className={s.homeRecipeWarpper}>
      <div className={s.top}>
        <div className={s.left}>
          <HeadingCommon>{title}</HeadingCommon>
        </div>
        <div className={s.right}>
          <ViewAllItem link="#"/>
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
        <RecipeCarousel data={data} itemKey={itemKey} />
      </div>
    </div>
  )
}

export default HomeRecipe
