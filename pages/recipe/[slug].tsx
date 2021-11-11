
import commerce from '@lib/api/commerce';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { Layout, RecipeDetail, RecommendedRecipes } from 'src/components/common';
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard';
import { RecipeBreadcrumb } from 'src/components/modules/recipe-detail';
import { REVALIDATE_TIME } from 'src/utils/constanst.utils';
import { getAllPromies } from 'src/utils/funtion.utils';
import { PromiseWithKey } from 'src/utils/types.utils';
interface Props {
  recipe:RecipeCardProps,
}
export default function Slug({recipe}:Props) {

  return <div className="page-recipe-detail">
    <RecipeBreadcrumb title={recipe.title || ''}/>
    <RecipeDetail 
      {...recipe}
    />
   {(recipe?.recommendedRecipes?.length !== 0)  && <RecommendedRecipes data={recipe?.recommendedRecipes} />} 
  </div>
}


export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }> ) {
  const config = { locale, locales }
  let promisesWithKey = [] as PromiseWithKey[]
  let props = {} as any
  
  //  recipe detail
  const recipesPromise = await commerce.getRecipeDetail({
    variables: { slug: params!.slug },
    config,
    preview,
  })
  props.recipe = recipesPromise;
  if (recipesPromise === null) {
    return { notFound: true };
  }

  try {
    const promises = getAllPromies(promisesWithKey)
    const rs = await Promise.all(promises)

    promisesWithKey.map((item, index) => {
      props[item.key] = item.keyResult ? rs[index][item.keyResult] : rs[index]
      return null
    })
  
    return {
      props,
      revalidate: REVALIDATE_TIME,
    }
  } catch (err) {

  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  
  const { recipes } = await commerce.getAllRecipePaths()
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
        recipes.forEach((blog: any) => {
          arr.push(`/${locale}/recipe/${blog.slug}`)
        })
        return arr
      }, [])
      : recipes.map((product: any) => `/recipe/${product.path}`),
    fallback: 'blocking',
  }
}


Slug.Layout = Layout
