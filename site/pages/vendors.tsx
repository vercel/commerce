import type { GetStaticPropsContext } from 'next'
import useVendors from '@framework/vendors/use-vendors'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Container } from '@components/ui'
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react'

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

export default function Vendor() {
  const { data, isLoading } = useVendors()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <div>
        <h1>Vendor:</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>About us</th>
              <th>Contact us</th>
            </tr>
          </thead>
          <tbody>
            {/* TODO Fix type for vendor */}
            {data.data.map(
              (vendor: {
                id: Key | null | undefined
                attributes: {
                  name:
                    | boolean
                    | ReactChild
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined
                  about_us:
                    | boolean
                    | ReactChild
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined
                  contact_us:
                    | boolean
                    | ReactChild
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined
                }
              }) => {
                return (
                  <tr key={vendor.id}>
                    <td>{vendor.attributes.name}</td>
                    <td>{vendor.attributes.about_us}</td>
                    <td>{vendor.attributes.contact_us}</td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      </div>
    </Container>
  )
}

Vendor.Layout = Layout
