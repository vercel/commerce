import React, { FC, useState } from 'react'
import cn from 'classnames'
import type { ProductNode } from '@lib/bigcommerce/api/operations/get-all-products'
import useAddItem from '@lib/bigcommerce/wishlist/use-add-item'
import useWishlist from '@lib/bigcommerce/wishlist/use-wishlist'
import useCustomer from '@lib/bigcommerce/use-customer'
import { Heart } from '@components/icons'
import { useUI } from '@components/ui/context'

type Props = {
  productId: number
  variant: NonNullable<ProductNode['variants']['edges']>[0]
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const WishlistButton: FC<Props> = ({
  productId,
  variant,
  className,
  ...props
}) => {
  const addItem = useAddItem()
  const { data } = useWishlist()
  const { data: customer } = useCustomer()
  const [loading, setLoading] = useState(false)
  const { openModal, setModalView } = useUI()
  const isInWishlist = data?.items?.some(
    (item) =>
      item.product_id === productId &&
      item.variant_id === variant?.node.entityId
  )

  const addToWishlist = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    // A login is required before adding an item to the wishlist
    if (!customer) {
      setModalView('LOGIN_VIEW')
      return openModal()
    }

    try {
      await addItem({
        productId,
        variantId: variant?.node.entityId!,
      })

      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <button
      {...props}
      className={cn({ 'opacity-50': loading }, className)}
      onClick={addToWishlist}
    >
      <Heart fill={isInWishlist ? 'white' : 'none'} />
    </button>
  )
}

export default WishlistButton
