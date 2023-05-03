'use client'

import dynamic from 'next/dynamic'

const DynamicContentManager = dynamic(
  () => import('components/ui/dynamic-content-manager')
)

interface SinglePageProps {
  data: any
}

const SinglePage = ({ data }: SinglePageProps) => {
  return (
    <DynamicContentManager content={data?.content} />
  )
}

export default SinglePage
