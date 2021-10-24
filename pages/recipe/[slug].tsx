
import { useRouter } from 'next/router'
import { Layout, RecipeDetail, RecommendedRecipes } from 'src/components/common'
import { INGREDIENT_DATA_TEST, RECIPE_DATA_TEST } from 'src/utils/demo-data'
import commerce from '@lib/api/commerce';
import { PromiseWithKey } from 'src/utils/types.utils';
import { GetStaticPropsContext,GetStaticPathsContext } from 'next';
import { getAllPromies } from 'src/utils/funtion.utils';
import {  REVALIDATE_TIME } from 'src/utils/constanst.utils'
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard';
interface Props {
  recipe:{recipeDetail?: RecipeCardProps},
  relevant:{relevantBlogs?:RecipeCardProps[]}
}
export default function Slug({recipe,relevant}:Props) {

  return <div className="page-recipe-detail">
    <RecipeDetail ingredients={INGREDIENT_DATA_TEST} 
      {...recipe.recipeDetail}
    />
    <RecommendedRecipes data={relevant?.relevantBlogs} />
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
  
  //  Blog detail
  const recipesPromise = await commerce.getRecipeDetail({
    variables: { slug: params!.slug },
    config,
    preview,
  })
  props.recipe = recipesPromise;

  if (recipesPromise.recipeDetail === null) {
    return { notFound: true };
  }

  // // Relevant Blogs
  const relevantProductId = recipesPromise?.recipeDetail?.relevantProducts?.[0];
  if (relevantProductId && recipesPromise?.recipeDetail?.relevantProducts?.length > 0) {

    const relevantBlogs = commerce.getRelevantBlogs({
      variables: { productId: relevantProductId },
      config,
      preview,
    })
    promisesWithKey.push({ key: 'relevant', promise: relevantBlogs})

  }else {
    props.relevantBlogs = [];
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
