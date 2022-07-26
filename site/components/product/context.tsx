import { useMemo, useState, useEffect, useContext, createContext } from 'react'

import type { FC, ReactNode, Dispatch, SetStateAction } from 'react'
import type { SelectedOptions } from './helpers'
import type {
  Product,
  ProductImage,
  ProductVariant,
} from '@commerce/types/product'

import usePrice from '@framework/product/use-price'
import { getProductVariant, selectDefaultOptionFromProduct } from './helpers'

export interface ProductContextValue {
  product: Product
  imageIndex: number | null
  setImageIndex: Dispatch<SetStateAction<number | null>>
  price: string
  variant: ProductVariant
  selectedOptions: SelectedOptions
  setSelectedOptions: Dispatch<SetStateAction<SelectedOptions>>
}

export const ProductContext = createContext<ProductContextValue | null>(null)

ProductContext.displayName = 'ProductContext'

type ProductProviderProps = {
  product: Product
  children?: ReactNode
}

export const ProductProvider: FC<ProductProviderProps> = ({
  product,
  children,
}) => {
  const [imageIndex, setImageIndex] = useState<number | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(
    () => selectDefaultOptionFromProduct(product, setSelectedOptions),
    [product]
  )

  const variant = useMemo(
    () => getProductVariant(product, selectedOptions) || product.variants[0],
    [product, selectedOptions]
  )

  const { price } = usePrice({
    amount: variant?.price?.value || product.price.value,
    baseAmount: variant?.price?.retailPrice || product.price.retailPrice,
    currencyCode: variant?.price?.currencyCode || product.price.currencyCode!,
  })

  useEffect(() => {
    const index = product.images.findIndex((image: ProductImage) => {
      return image.url === variant?.image?.url
    })
    if (index !== -1) {
      setImageIndex(index)
    }
  }, [variant, product])

  const value = useMemo(
    () => ({
      price,
      product,
      variant,
      imageIndex,
      setImageIndex,
      selectedOptions,
      setSelectedOptions,
    }),
    [price, product, variant, imageIndex, selectedOptions]
  )

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}

export const useProduct = () => {
  const context = useContext(ProductContext) as ProductContextValue
  if (context === undefined) {
    throw new Error(`useProduct must be used within a ProductProvider`)
  }
  return context
}
