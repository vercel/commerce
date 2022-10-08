import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}

export default function Profile() {
  const { data } = useCustomer()
  return (
    <Container className="pt-4">
      <Text variant="pageHeading">My Profile</Text>
      <div className="grid grid-cols-4">
        {data && (
          <div className="flex flex-col divide-accent-2 divide-y">
            <div className="flex flex-row items-center space-x-4 py-4">
              <span className="text-lg font-medium text-accent-600 flex-1">
                Full Name
              </span>
              <span>
                {data.firstName} {data.lastName}
              </span>
            </div>
            <div className="flex flex-row items-center space-x-4 py-4">
              <span className="text-lg font-medium text-accent-600 flex-1">
                Email
              </span>
              <span>{data.email}</span>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

Profile.Layout = Layout
