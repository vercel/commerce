import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
// import useCart from '@framework/cart/use-cart'
// import usePrice from '@framework/product/use-price'
// import { Button, Text } from '@components/ui'
// import { Bag, Cross, Check, MapPin, CreditCard } from '@components/icons'
// import { CartItem } from '@components/cart'

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

export default function Cart() {
  // const error = null
  // const success = null
  // const { data, isLoading, isEmpty } = useCart()

  // const { price: subTotal } = usePrice(
  //   data && {
  //     amount: Number(data.subtotalPrice),
  //     currencyCode: data.currency.code,
  //   }
  // )
  // const { price: total } = usePrice(
  //   data && {
  //     amount: Number(data.totalPrice),
  //     currencyCode: data.currency.code,
  //   }
  // )

  return (
    <div>
      This is cart page
    </div>
  )
}

Cart.Layout = Layout
