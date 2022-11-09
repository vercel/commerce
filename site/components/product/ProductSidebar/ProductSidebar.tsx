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

  const { product, variant, price } = useProduct()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addToCart = async () => {
    setLoading(true)
    setError(null)
    try {
      if (variant) {
        await addItem({
          productId: String(product.id),
          variantId: String(variant.id),
        })
        setSidebarView('CART_VIEW')
        openSidebar()
      } else {
        throw new Error('The variant selected is not available')
      }
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
      if (err instanceof Error) {
        setError(err.message)
      }
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
            disabled={loading || !variant || variant.availableForSale === false}
          >
            {!variant || variant.availableForSale === false ? (
              'Not Available'
            ) : (
              <>Add To Cart - {price}</>
            )}
          </Button>
        )}

        {error && (
          <div className="text-red py-3 text-sm font-bold">{error}</div>
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
      </div>
    </div>
  )
}

export default ProductSidebar
