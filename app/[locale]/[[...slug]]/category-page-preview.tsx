'use client'

import PreviewBanner from 'components/ui/preview-banner'
import { usePreview } from 'lib/sanity/sanity.preview'
import CategoryPage from './category-page'

export default function CategoryPagePreview({
  query,
  queryParams,
}: {
  query: string
  queryParams: {
    [key: string]: any
  }
}) {
  const data = usePreview(null, query, queryParams)

  const { title, _type } = data

  return (
    <>
      <CategoryPage data={data} />
      <PreviewBanner title={`${title} (${_type})`} />
    </>
  )
}