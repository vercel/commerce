import { Layout } from 'src/components/common';
import RecipeListBanner from 'src/components/modules/recipes-list/RecipeListBanner/RecipeListBanner';
import RecipesList from 'src/components/modules/recipes-list/RecipesList/RecipesList';
import { GetStaticPropsContext } from 'next';
import { PromiseWithKey,SortOrder } from 'src/utils/types.utils';
import { DEFAULT_RECIPES_PAGE_SIZE,REVALIDATE_TIME,CODE_FACET_FEATURED,CODE_FACET_BRAND } from "src/utils/constanst.utils";
import commerce from '@lib/api/commerce';
import { getAllPromies } from 'src/utils/funtion.utils';
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard';
import { Collection } from '@commerce/types/collection';

interface Props {
  recipes?: RecipeCardProps[],
  collections: Collection[],
  totalItems?: number  
}
export default function RecipeListPage({collections,recipes,totalItems}:Props) {
  return (
    <>
      <RecipeListBanner />
      <RecipesList collections={collections} recipeList={recipes} total={totalItems ?? 0}/>
    </>
  )
}

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {

  const config = { locale, locales }
  let promisesWithKey = [] as PromiseWithKey[]
  let props = {} as any;


  const recipesPromise =  commerce.getAllRecipes({
    variables: {
      excludeBlogIds: [],
      take: DEFAULT_RECIPES_PAGE_SIZE,
    },
    config,
    preview,
  })
  
  promisesWithKey.push({ key: 'recipes', promise: recipesPromise, keyResult: 'recipes'})
  
  // collection
  const collectionsPromise = commerce.getAllCollections({
    variables: {},
    config,
    preview,
  })
  promisesWithKey.push({ key: 'collections', promise: collectionsPromise, keyResult: 'collections' })
  
  try {
    const promises = getAllPromies(promisesWithKey)
    const rs = await Promise.all(promises)

    promisesWithKey.map((item, index) => {
      props[item.key] = item.keyResult ? rs[index][item.keyResult] : rs[index]
      return null
    })
 
    return {
      props,
      revalidate: REVALIDATE_TIME
    }
  } catch (err) {

  }
}


RecipeListPage.Layout = Layout
