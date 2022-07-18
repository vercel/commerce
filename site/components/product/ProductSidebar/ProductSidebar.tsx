import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useState } from 'react'
import { ProductOptions } from '@components/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'

import { useProduct } from '../context'
interface ProductSidebarProps {
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ className }) => {
  const addItem = useAddItem()

  const { product, variant } = useProduct()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <ProductOptions />
      <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description}
      />
      <div className="flex flex-row justify-between items-center">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
      </div>
      <div>
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'}
          </Button>
        )}
      </div>
      <div className="mt-6">
        {process.env.COMMERCE_METAFIELDS_ENABLED &&
          product.metafields &&
          product.metafields?.length > 0 && (
            <Collapse title="Metafields">
              <ul className="flex flex-col space-y-2 divide-y divide-dashed">
                {product.metafields.map((m) => (
                  <li
                    className="flex space-x-2 justify-start items-center text-sm pt-2"
                    key={m.key}
                  >
                    <span className="font-bold capitalize">{m.key}</span>:
                    <span>{m.value}</span>
                  </li>
                ))}
              </ul>
            </Collapse>
          )}
        <Collapse title="Care">
          This is a limited edition production run. Printing starts when the
          drop ends.
        </Collapse>
        <Collapse title="Details">
          This is a limited edition production run. Printing starts when the
          drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
          to COVID-19.
        </Collapse>
      </div>
    </div>
  )
}

export default ProductSidebar
