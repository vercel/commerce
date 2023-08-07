'use client'

import PreviewBanner from 'components/ui/preview-banner'
import { usePreview } from 'lib/sanity/sanity.preview'
import HomePage from './home-page'

export default function HomePagePreview({
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
      <HomePage data={data} />
      <PreviewBanner title={`${title} (${_type})`} />
    </>
  )
}