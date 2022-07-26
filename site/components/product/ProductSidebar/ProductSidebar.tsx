import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useState } from 'react'
import { ProductOptions } from '@components/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'

import { useProduct } from '../context'
import ProductCustomFields from '../ProductCustomFields'
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
        variantId: String(variant.id),
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
        <Collapse title="Care">
          This is a limited edition production run. Printing starts when the
          drop ends.
        </Collapse>
        <Collapse title="Details">
          This is a limited edition production run. Printing starts when the
          drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
          to COVID-19.
        </Collapse>
        {process.env.COMMERCE_CUSTOMFIELDS_ENABLED &&
          product.customFields &&
          product.customFields.length > 0 && (
            <Collapse title="Specifications">
              <ProductCustomFields fields={product.customFields} />
            </Collapse>
          )}
      </div>
    </div>
  )
}

export default ProductSidebar
