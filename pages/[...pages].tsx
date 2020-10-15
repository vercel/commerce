import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { Layout } from '@components/core'
import getAllPages from '@lib/bigcommerce/api/operations/get-all-pages'
import getPage from '@lib/bigcommerce/api/operations/get-page'
import getSlug from '@utils/get-slug'
import PageContent from '@components/custom-pages/PageContent'

export async function getStaticProps({
  preview,
  params,
}: GetStaticPropsContext<{ pages: string[] }>) {
  const { pages } = await getAllPages()
  const slug = params?.pages.join('/')
  const pageItem = pages.find((p) => (p.url ? getSlug(p.url) === slug : false))
  const data = pageItem && (await getPage({ variables: { id: pageItem.id! } }))
  const page = data?.page

  if (!page) {
    throw new Error(`Page with slug '${slug}' not found`)
  }

  return {
    props: { pages, page },
  }
}

export async function getStaticPaths() {
  const { pages } = await getAllPages()

  return {
    paths: pages.map((page) => page.url).filter((url) => url),
    // Fallback shouldn't be enabled here or otherwise this route
    // will catch every page, even 404s, and we don't want that
    fallback: false,
  }
}

export default function Pages({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="max-w-2xl mx-auto py-20">
      <PageContent html={page.body} />
    </div>
  )
}

Pages.Layout = Layout
