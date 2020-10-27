import React, { FC, useState } from 'react'
import cn from 'classnames'
import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'
import useAddItem from '@bigcommerce/storefront-data-hooks/wishlist/use-add-item'
import useRemoveItem from '@bigcommerce/storefront-data-hooks/wishlist/use-remove-item'
import useWishlist from '@bigcommerce/storefront-data-hooks/wishlist/use-wishlist'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
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
      aria-label="Add to wishlist"
      className={cn({ 'opacity-50': loading }, className)}
      onClick={handleWishlistChange}
      {...props}
    >
      <Heart fill={itemInWishlist ? 'var(--pink)' : 'none'} />
    </button>
  )
}

export default WishlistButton
