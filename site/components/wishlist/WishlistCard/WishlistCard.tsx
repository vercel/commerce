import { FC, useState } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import s from './WishlistCard.module.css'
import { Trash } from '@components/icons'
import { Button, Text } from '@components/ui'

import { useUI } from '@components/ui/context'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import useAddItem from '@framework/cart/use-add-item'
import useRemoveItem from '@framework/wishlist/use-remove-item'
import type { Wishlist } from '@commerce/types/wishlist'

const placeholderImg = '/product-img-placeholder.svg'

interface Props {
  item: Product
  variant: string | number
}

const WishlistCard: FC<Props> = ({ item, variant }) => {
  const { price } = usePrice({
    amount: item.price?.value,
    baseAmount: item.price?.retailPrice,
    currencyCode: item.price?.currencyCode!,
  })
  // @ts-ignore Wishlist is not always enabled
  const removeItem = useRemoveItem({ item })
  const [loading, setLoading] = useState(false)
  const [removing, setRemoving] = useState(false)

  // TODO: fix this missing argument issue
  /* @ts-ignore */
  const addItem = useAddItem()
  const { openSidebar } = useUI()

  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem({ productId: item.id, variantId: variant })
    } catch (error) {
      setRemoving(false)
    }
  }
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(item.id),
        variantId: String(item.variants[0].id),
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className={cn(s.root, { 'opacity-75 pointer-events-none': removing })}>
      <div className={s.imageWrapper}>
        <Image
          width={230}
          height={230}
          src={item.images[0]?.url || placeholderImg}
          alt={item.images[0]?.alt || 'Product Image'}
        />
      </div>

      <div className={s.description}>
        <div className="flex-1 mb-6">
          <h3 className="text-2xl mb-2 -mt-1">
            <Link href={`/product${item.path}`}>
              <a>{item.name}</a>
            </Link>
          </h3>
          <div className="mb-4">
            <Text html={item.description} />
          </div>
        </div>
        <div>
          <Button
            width={260}
            aria-label="Add to Cart"
            type="button"
            onClick={addToCart}
            loading={loading}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className={s.actions}>
        <div className="flex justify-end font-bold">{price}</div>
        <div className="flex justify-end mt-4 lg:mt-0">
          <button onClick={handleRemove}>
            <Trash />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WishlistCard
