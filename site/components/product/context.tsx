import { Product, ProductImage, ProductVariant } from '@commerce/types/product'

import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from './helpers'

import React, { FC, useMemo, useState, ReactNode, useEffect } from 'react'

import usePrice from '@framework/product/use-price'

export interface ProductContextValue {
  product: Product
  imageIndex: number | null
  setImageIndex: React.Dispatch<React.SetStateAction<number | null>>
  price: string
  variant: ProductVariant
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
}

export const ProductContext = React.createContext<ProductContextValue | null>(
  null
)

ProductContext.displayName = 'ProductContext'

type ProductProviderProps = {
  product: Product
  children?: ReactNode
}

export const ProductProvider: FC<ProductProviderProps> = ({
  product,
  children,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const [imageIndex, setImageIndex] = useState<number | null>(null)

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
    const idx = product.images.findIndex((image: ProductImage) => {
      return image.url === variant?.image?.url
    })
    if (idx !== -1) {
      setImageIndex(idx)
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
  const context = React.useContext(ProductContext) as ProductContextValue
  if (context === undefined) {
    throw new Error(`useProduct must be used within a ProductProvider`)
  }
  return context
}
