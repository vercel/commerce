import React, { FC, useState } from 'react'
import cn from 'classnames'
import { Heart } from '@components/icons'

import { useUI } from '@components/ui'
import { useCustomer } from '@framework/customer'
import { useAddItem, useWishlist, useRemoveItem } from '@framework/wishlist'

type Props = {
  productId: Product['id']
  variant: ProductVariant
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const WishlistButton: FC<Props> = ({
  productId,
  variant,
  className,
  ...props
}) => {
  const { data } = useWishlist()
  const addItem = useAddItem()
  const removeItem = useRemoveItem()
  const { data: customer } = useCustomer()
  const { openModal, setModalView } = useUI()
  const [loading, setLoading] = useState(false)

  const itemInWishlist = data?.items?.find(
    (item) => item.product_id === productId && item.variant_id === variant.id
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
          variantId: variant?.id!,
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
