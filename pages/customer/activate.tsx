import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages },
  }
}

export default function ActivateAccount() {
  return (
    <Container>
      <Text variant="pageHeading">Activate Your Account</Text>
    </Container>
  )
}

ActivateAccount.Layout = Layout
