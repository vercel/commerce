import { Product, ProductImage, ProductVariant } from '@commerce/types/product'

import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from './helpers'

import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import usePrice from '@framework/product/use-price'

export interface ProductContextValue {
  product: Product
  imageIndex: number | null
  price: string
  variant: ProductVariant
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
  resetImageIndex: () => void
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
  const resetImageIndex = useCallback(() => setImageIndex(null), [])

  const variant = useMemo(() => {
    const v = getProductVariant(product, selectedOptions)
    return v || product.variants[0]
  }, [product, selectedOptions])

  const { price } = usePrice({
    amount: variant?.price?.value || product.price.value,
    baseAmount: variant?.price?.retailPrice || product.price.retailPrice,
    currencyCode: variant?.price?.currencyCode || product.price.currencyCode!,
  })

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  useEffect(() => {
    const idx = product.images.findIndex(
      (image: ProductImage) => image.url === variant?.image?.url
    )
    if (idx) {
      setImageIndex(idx)
    }
  }, [variant, product])

  return (
    <ProductContext.Provider
      value={{
        price,
        product,
        variant,
        imageIndex,
        resetImageIndex,
        selectedOptions,
        setSelectedOptions,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  const context = React.useContext(ProductContext) as ProductContextValue
  if (context === undefined) {
    throw new Error(`useProduct must be used within a ProductProvider`)
  }
  return context
}
