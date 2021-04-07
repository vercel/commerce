import type { GetStaticPropsContext } from 'next'
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Button, Container, Text } from '@components/ui'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import { useOrders } from '../framework/aquilacms/orders'

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

export default function Orders() {
  const { data: orders } = useOrders()
  return (
    <Container>
      <Text variant="pageHeading">My Orders</Text>
      {orders?.length && (
        <div className="flex flex-col">
          {orders?.map((o) => (
            <div className="flex p-5">
              <div className="flex-1 justify-center items-center">{o.code}</div>
              <div className="flex-1 justify-center items-center">
                {o.createdAt}
              </div>
              <div className="flex-1 justify-center items-center">
                {o.price.currency} {o.price.value}
              </div>
              <Button
                Component="a"
                className="flex-1 justify-center items-center"
                onClick={() => alert(o.id)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="flex-1 p-24 flex flex-col justify-center items-center">
        {!orders?.length && (
          <>
            <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
              <Bag className="absolute" />
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              No orders found
            </h2>
            <p className="text-accents-6 px-10 text-center pt-2">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </>
        )}
      </div>
    </Container>
  )
}

Orders.Layout = Layout
