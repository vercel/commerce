import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'

// export async function getStaticProps({
//   preview,
//   locale,
//   locales,
// }: GetStaticPropsContext) {
//   const config = { locale, locales }
//   const pagesPromise = commerce.getAllPages({ config, preview })
//   const siteInfoPromise = commerce.getSiteInfo({ config, preview })
//   const { pages } = await pagesPromise
//   const { categories } = await siteInfoPromise

//   return {
//     props: { pages, categories },
//   }
// }

export default function Orders() {
  return (
    <Container>
      <Text variant="pageHeading">My Orders</Text>
      <div className="flex flex-col items-center justify-center flex-1 p-24 ">
        <span className="flex items-center justify-center w-16 h-16 p-12 border border-dashed rounded-full border-secondary bg-primary text-primary">
          <Bag className="absolute" />
        </span>
        <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
          No orders found
        </h2>
        <p className="px-10 pt-2 text-center text-accent-6">
          Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
        </p>
      </div>
    </Container>
  )
}

Orders.Layout = Layout
