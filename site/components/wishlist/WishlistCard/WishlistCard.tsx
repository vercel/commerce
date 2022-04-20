import { FC, useState } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import s from './WishlistCard.module.css'
import { Trash } from '@components/icons'
import { Button, Text } from '@components/ui'

import { useUI } from '@components/ui/context'
import type {
  Product,
  ProductOption,
  ProductVariant,
} from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import useAddItem from '@framework/cart/use-add-item'
import useRemoveItem from '@framework/wishlist/use-remove-item'
import type { Wishlist } from '@commerce/types/wishlist'

const placeholderImg = '/product-img-placeholder.svg'

const WishlistCard: React.FC<{
  item: Wishlist
}> = ({ item }) => {
  const product: Product = item.product
  const { price } = usePrice({
    amount: product.price?.value,
    baseAmount: product.price?.retailPrice,
    currencyCode: product.price?.currencyCode!,
  })
  // @ts-ignore Wishlist is not always enabled
  const removeItem = useRemoveItem({ wishlist: { includeProducts: true } })
  const [loading, setLoading] = useState(false)
  const [removing, setRemoving] = useState(false)

  const { options } = item.product.variants.find(
    (variant: ProductVariant) => item.variantId === variant.id
  )

  // TODO: fix this missing argument issue
  /* @ts-ignore */
  const addItem = useAddItem()
  const { openSidebar } = useUI()

  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem({
        id: item.productId,
        //TODO: enable itemVariantId when using shopify provider
        itemVariantId: item.variantId,
      })
    } catch (error) {
      setRemoving(false)
    }
  }
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        //for shopify provider, use the productId and variantId stored in wishlist
        productId: item.productId,
        variantId: item.variantId,
        // productId: String(product.id),
        // variantId: String(product.variants[0].id),
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
          src={product.images[0]?.url || placeholderImg}
          alt={product.images[0]?.alt || 'Product Image'}
        />
      </div>

      <div className={s.description}>
        <div className="flex-1 mb-6">
          <h3 className="text-2xl mb-2 -mt-1">
            <Link href={`/product${product.path}`}>
              <a>{product.name}</a>
            </Link>
          </h3>

          {options && options.length > 0 && (
            <div className="flex items-center pb-1">
              {options.map((option: ProductOption, i: number) => (
                <div
                  key={`${option.id}`}
                  className="text-sm font-semibold text-accent-7 inline-flex items-center justify-center"
                >
                  {option.displayName}
                  {option.displayName === 'Color' ? (
                    <span
                      className="mx-2 rounded-full bg-transparent border w-5 h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden"
                      style={{
                        backgroundColor: `${option.values[0].label}`,
                      }}
                    ></span>
                  ) : (
                    <span className="mx-2 rounded-full bg-transparent border h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden">
                      {option.values[0].label}
                    </span>
                  )}
                  {i === options.length - 1 ? '' : <span className="mr-3" />}
                </div>
              ))}
            </div>
          )}
          <div className="mb-4">
            <Text html={product.description} />
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
