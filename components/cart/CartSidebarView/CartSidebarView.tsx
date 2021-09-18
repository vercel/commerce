import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from '../CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'
// import useCart from '@framework/cart/use-cart'
// import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'

const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()
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
  // const handleClose = () => closeSidebar()
  // const goToCheckout = () => setSidebarView('CHECKOUT_VIEW')

  // const error = null
  // const success = null

  return <div />
}

export default CartSidebarView
