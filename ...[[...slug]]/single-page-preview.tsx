'use client'

import PreviewBanner from 'components/ui/preview-banner'
import { usePreview } from 'lib/sanity/sanity.preview'
import SinglePage from './single-page'

export default function SinglePagePreview({
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
      <SinglePage data={data} />
      <PreviewBanner title={`${title} (${_type})`} />
    </>
  )
}