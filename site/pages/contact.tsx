import { Layout } from '@components/common'
import { Text } from '@components/ui'

export default function Contact() {
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
      <Text variant="heading">Contact</Text>
      <Text className="">
        The requested page doesn't exist or you don't have access to it.
      </Text>
    </div>
  )
}

Contact.Layout = Layout
