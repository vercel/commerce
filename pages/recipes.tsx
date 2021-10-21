import { Layout } from 'src/components/common';
import RecipeListBanner from 'src/components/modules/recipes-list/RecipeListBanner/RecipeListBanner';
import RecipesList from 'src/components/modules/recipes-list/RecipesList/RecipesList';
import { GetStaticPropsContext } from 'next';
import { PromiseWithKey } from 'src/utils/types.utils';
import { DEFAULT_BLOG_PAGE_SIZE } from "src/utils/constanst.utils";
import commerce from '@lib/api/commerce';
import { getAllPromies } from 'src/utils/funtion.utils';
export default function RecipeListPage() {
  return (
    <>
      <RecipeListBanner />
      <RecipesList/>
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

  
  const blogsPromise = commerce.getAllBlogs({
    variables: {
      excludeBlogIds: [],
      take: DEFAULT_BLOG_PAGE_SIZE,
      filter: {
        isFeatured: {
            eq:false
        }
      }
    },
    config,
    preview,
  })
  promisesWithKey.push({ key: 'blogsResult', promise: blogsPromise })


  try {
    const promises = getAllPromies(promisesWithKey)
    const rs = await Promise.all(promises)

    promisesWithKey.map((item, index) => {
      props[item.key] = item.keyResult ? rs[index][item.keyResult] : rs[index]
      return null
    })
    console.log(props);
    return {
      props,
      revalidate: 60
    }
  } catch (err) {

  }
}


RecipeListPage.Layout = Layout
