import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { BannerItemProps } from 'src/components/common/Banner/BannerItem/BannerItem';
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard';
import RecipeListBanner from 'src/components/modules/recipes-list/RecipeListBanner/RecipeListBanner';
import RecipesList from 'src/components/modules/recipes-list/RecipesList/RecipesList';
import { DEFAULT_RECIPES_PAGE_SIZE, REVALIDATE_TIME } from "src/utils/constanst.utils";
import { getAllPromies } from 'src/utils/funtion.utils';
import { PageName, PromiseWithKey } from 'src/utils/types.utils';
import ErrorPage from './_error';

interface Props {
  recipes?: RecipeCardProps[],
  recipeCollections?: {name: string, value: string, slug: string}[],
  totalItems?: number,
  banners: BannerItemProps[]
  error ?: string  
}
export default function RecipeListPage({banners,error,recipeCollections,recipes=[],totalItems}:Props) {
  if (error) {
    return <ErrorPage />
  }
  return (
    <>
      <RecipeListBanner banners={banners}/>
      {
        <RecipesList collections={recipeCollections || []} recipeList={recipes} total={totalItems ?? 0}/>
      }
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


  const recipesPromise = commerce.getAllRecipes({
    variables: {
      take: DEFAULT_RECIPES_PAGE_SIZE,
      createdAt:"DESC"
    },
    config,
    preview,
  })
  promisesWithKey.push({ key: 'recipes', promise: recipesPromise, keyResult: 'recipes'})
  
  // banner
   const homeBannersPromise = commerce.getBannersByPage({ variables: { page: PageName.HOME } })
   promisesWithKey.push({ key: 'banners', promise: homeBannersPromise })


  // collection
  const collectionsPromise = commerce.getAllRecipeCollections({
    variables: {},
    config,
    preview,
  })
  promisesWithKey.push({ key: 'recipeCollections', promise: collectionsPromise, keyResult: 'recipeCollections' })
  
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
  } catch (err: any) {
    return {
      props: { error: err.message }
    }
  }
}


RecipeListPage.Layout = Layout
