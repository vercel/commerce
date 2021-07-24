import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getRecipePages, getRecipes } from '@lib/api/airtable'
import { Text } from '@components/ui'

interface Recipe {
  slug: string
  title: string
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  // const config = { locale, locales }
  // const pagesPromise = commerce.getAllPages({ config, preview })
  // const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  // const { pages } = await pagesPromise
  // const { categories } = await siteInfoPromise
  // const path = params?.pages.join('/')
  const recipes = await getRecipes()
  const recipe = recipes.find((recipe) => recipe.slug === params?.slug)
  // const pageItem = pages.find((p: Page) =>
  //   p.url ? getSlug(p.url) === slug : false
  // )
  // const data =
  //   pageItem &&
  //   (await commerce.getPage({
  //     variables: { id: pageItem.id! },
  //     config,
  //     preview,
  //   }))

  // const page = data?.page

  if (!recipe) {
    // We throw to make sure this fails at build time as this is never expected to happen
    throw new Error(`Page with slug '${params?.slug}' not found`)
  }

  return {
    props: { recipe },
    revalidate: 60 * 60, // Every hour
  }
}

export const getStaticPaths = async () => {
  const pages = await getRecipePages()
  return {
    paths: pages.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  }
}

const Recipe = ({ recipe }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <div className="max-w-2xl mx-8 sm:mx-auto py-20">
    <Text>{recipe.title}</Text>
  </div>
)

export default Recipe
