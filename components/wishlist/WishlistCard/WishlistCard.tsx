import { FC, useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import type { WishlistItem } from '@bigcommerce/storefront-data-hooks/api/wishlist'
import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import useRemoveItem from '@bigcommerce/storefront-data-hooks/wishlist/use-remove-item'
import useAddItem from '@bigcommerce/storefront-data-hooks/cart/use-add-item'
import { useUI } from '@components/ui/context'
import { Button } from '@components/ui'
import { HTMLContent } from '@components/common'
import { Trash } from '@components/icons'
import s from './WishlistCard.module.css'

interface Props {
  item: WishlistItem
}

const WishlistCard: FC<Props> = ({ item }) => {
  const product = item.product!
  const { price } = usePrice({
    amount: product.prices?.price?.value,
    baseAmount: product.prices?.retailPrice?.value,
    currencyCode: product.prices?.price?.currencyCode!,
  })
  const removeItem = useRemoveItem({ includeProducts: true })
  const [loading, setLoading] = useState(false)
  const [removing, setRemoving] = useState(false)
  const addItem = useAddItem()
  const { openSidebar } = useUI()

  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem({ id: item.id! })
    } catch (error) {
      setRemoving(false)
    }
  }
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: product.entityId,
        variantId: product.variants.edges?.[0]?.node.entityId!,
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className={cn(s.root, { 'opacity-75 pointer-events-none': removing })}>
      <div className={`col-span-3 ${s.productBg}`}>
        <Image
          src={product.images.edges?.[0]?.node.urlOriginal!}
          width={400}
          height={400}
          alt={product.images.edges?.[0]?.node.altText || 'Product Image'}
        />
      </div>

      <div className="col-span-7">
        <h3 className="text-2xl mb-2">
          <Link href={`/product${product.path}`}>
            <a>{product.name}</a>
          </Link>
        </h3>
        <div className="mb-4">
          <HTMLContent html={product.description!} />
        </div>
        <Button
          aria-label="Add to Cart"
          type="button"
          className={
            'py-1 px-3 border border-secondary rounded-md shadow-sm hover:bg-primary-hover'
          }
          onClick={addToCart}
          loading={loading}
        >
          Add to Cart
        </Button>
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <div className="flex justify-end font-bold">{price}</div>
        <div className="flex justify-end">
          <button onClick={handleRemove}>
            <Trash />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WishlistCard
