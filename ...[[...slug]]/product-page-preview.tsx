'use client'

import PreviewBanner from 'components/ui/preview-banner'
import { usePreview } from 'lib/sanity/sanity.preview'
import ProductPage from './product-page'

export default function ProductPagePreview({
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
      <ProductPage data={data} />
      <PreviewBanner title={`${title} (${_type})`} />
    </>
  )
}