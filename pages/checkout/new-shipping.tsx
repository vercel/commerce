import { Layout } from '@components/common'
import { getConfig } from '@framework/api'
import { Text, Container, Input } from '@components/ui'
import { defaultPageProps } from '@lib/defaults'
import type { GetStaticPropsContext } from 'next'
import getAllPages from '@framework/common/get-all-pages'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  // Disabling page if Feature is not available
  if (!process.env.COMMERCE_CHECKOUT_ENABLED) {
    return {
      notFound: true,
    }
  }

  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: {
      pages,
      ...defaultPageProps,
    },
  }
}

export default function NewShipping() {
  return (
    <Container>
      <div className="mt-3 mb-20">
        <Text variant="pageHeading">New Shipping Address</Text>
        <div>
          <Input type="country" placeholder="Country" />
        </div>
      </div>
    </Container>
  )
}

NewShipping.Layout = Layout
