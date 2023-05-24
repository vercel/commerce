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
import {
  Alert,
  AlertIcon,
  Box,
  CloseButton,
  Stack,
  Text as ChakraText,
  useDisclosure,
} from '@chakra-ui/react'
import { Metafield } from '@commerce/types/common'

import productDetailsMetafields from '../../../static_data/productDetailsMetafields.json'
import { useRouter } from 'next/router'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const { locale = 'it' } = useRouter()

  const {
    isOpen: isAlertVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })

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
          {productDetailsMetafields.metafields[
            locale as keyof typeof productDetailsMetafields.metafields
          ].map((meta: any) => (
            <Box key={meta.key}>
              <ChakraText
                as={'span'}
                textTransform={'uppercase'}
                fontWeight={'bold'}
              >
                {meta.name}:{' '}
              </ChakraText>
              <ChakraText as={'span'}>
                {product.metafields!.custom[meta.key as keyof Metafield].value}
              </ChakraText>
            </Box>
          ))}

          {isAlertVisible ? (
            <Box>
              <Alert marginTop={5} status="info">
                <AlertIcon />
                {locale === 'it'
                  ? "Il modello 3D potrebbe non rappresentare fedelmente l'aspetto del prodotto"
                  : 'The 3D model may not accurately represent the appearance of the product'}
                <CloseButton
                  alignSelf="flex-start"
                  position="relative"
                  right={-1}
                  top={-1}
                  onClick={onClose}
                />
              </Alert>
            </Box>
          ) : (
            <></>
          )}
        </Stack>
      </Box>

      <div style={{ marginTop: 20 }}>
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label={
              locale === 'en' ? 'Add to Cart' : 'Aggiungi al Carrello'
            }
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {locale === 'en'
              ? variant?.availableForSale === false
                ? 'Not Available'
                : 'Add To Cart'
              : variant?.availableForSale === false
              ? 'Non Disponibile'
              : 'Aggiungi al Carrello'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProductSidebar
