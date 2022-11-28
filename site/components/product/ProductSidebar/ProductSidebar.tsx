import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import ErrorMessage from '@components/ui/ErrorMessage'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    setError(null)
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
      if (err instanceof Error) {
        console.error(err)
        setError({
          ...err,
          message: 'Could not add item to cart. Please try again.',
        })
      }
    }
  }

  return (
    <div className={className}>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description}
      />

      {product.metafields?.reviews?.rating && (
        <div className="flex flex-row justify-between items-center">
          <Rating value={product.metafields.reviews.rating.value} />
          <div className="text-accent-6 pr-1 font-medium text-sm">
            {product.metafields.reviews.count?.value || 2} reviews
          </div>
        </div>
      )}

      <div>
        {error && <ErrorMessage error={error} className="my-5" />}
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
        {product.metafields?.descriptors?.care_guide && (
          <Collapse title="Care">
            <Text
              className="leading-0"
              html={product.metafields.descriptors.care_guide.html}
            />
          </Collapse>
        )}

        {product.metafields?.my_fields && (
          <Collapse title="Details">
            {Object.entries(product.metafields.my_fields).map(([_, field]) => (
              <div
                key={field.key}
                className="flex gap-2 border-b py-3 border-accent-2 border-dashed last:border-b-0"
              >
                <strong className="leading-7">{field.name}:</strong>
                <Text html={field.html || field.value} className="!mx-0" />
              </div>
            ))}
          </Collapse>
        )}
      </div>
    </div>
  )
}

export default ProductSidebar
