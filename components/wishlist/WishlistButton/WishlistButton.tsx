import React, { FC, useState } from 'react'
import cn from 'classnames'
import type { ProductNode } from '@lib/bigcommerce/api/operations/get-all-products'
import useAddItem from '@lib/bigcommerce/wishlist/use-add-item'
import useRemoveItem from '@lib/bigcommerce/wishlist/use-remove-item'
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
  const removeItem = useRemoveItem()
  const { data } = useWishlist()
  const { data: customer } = useCustomer()
  const [loading, setLoading] = useState(false)
  const { openModal, setModalView } = useUI()
  const itemInWishlist = data?.items?.find(
    (item) =>
      item.product_id === productId &&
      item.variant_id === variant?.node.entityId
  )

  const handleWishlistChange = async (e: any) => {
    e.preventDefault()

    if (loading) return

    // A login is required before adding an item to the wishlist
    if (!customer) {
      setModalView('LOGIN_VIEW')
      return openModal()
    }

    setLoading(true)

    try {
      if (itemInWishlist) {
        await removeItem({ id: itemInWishlist.id! })
      } else {
        await addItem({
          productId,
          variantId: variant?.node.entityId!,
        })
      }

      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <button
      {...props}
      className={cn({ 'opacity-50': loading }, className)}
      onClick={handleWishlistChange}
    >
      <Heart fill={itemInWishlist ? 'white' : 'none'} />
    </button>
  )
}

export default WishlistButton
