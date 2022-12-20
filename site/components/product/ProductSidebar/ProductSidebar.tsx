import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Rating, Collapse, Text, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import { Box, Stack, Text as ChakraText } from '@chakra-ui/react'

import productDetailsMetafields from '../../../static_data/productDetailsMetafields.json'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  console.log(product.metafields!.custom)

  return (
    <div className={className}>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />

      {/* Product Description With Metafields */}

      <Box>
        <Stack>
          {productDetailsMetafields.metafields[0].names.map((meta) => (
            <Box key={meta.key}>
              <ChakraText
                as={'span'}
                textTransform={'uppercase'}
                fontWeight={'bold'}
              >
                {meta.name}:{' '}
              </ChakraText>
              <ChakraText as={'span'}>
                {product.metafields.custom
                  .filter((o) => o.key == meta.key)
                  .map((o) => o.value)}
              </ChakraText>
            </Box>
          ))}
        </Stack>
      </Box>

      <div style={{ marginTop: 20 }}>
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
    </div>
  )
}

export default ProductSidebar
