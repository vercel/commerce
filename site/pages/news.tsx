import { Layout } from '@components/common'
import { Text } from '@components/ui'

export default function News() {
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
      <Text variant="heading">Work In Progress</Text>
      <Text className="">We are working for you...</Text>
    </div>
  )
}

News.Layout = Layout
