import type { GetStaticPropsContext } from 'next'
import getAllPages from '@lib/bigcommerce/api/operations/get-all-pages'
import useCustomer from '@lib/bigcommerce/use-customer'
import { Layout } from '@components/core'
import { Container, Text } from '@components/ui'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { pages } = await getAllPages({ preview })
  return {
    props: { pages },
  }
}

export default function Profile() {
  const { data } = useCustomer()
  return (
    <Container>
      <Text variant="pageHeading">My Profile</Text>
      {data && (
        <div className="max-w-2xl flex flex-col space-y-5">
          <div>
            <Text variant="sectionHeading">Full Name</Text>
            <span>
              {data.firstName} {data.lastName}
            </span>
          </div>
          <div>
            <Text variant="sectionHeading">Email</Text>
            <span>{data.email}</span>
          </div>
        </div>
      )}
    </Container>
  )
}

Profile.Layout = Layout
