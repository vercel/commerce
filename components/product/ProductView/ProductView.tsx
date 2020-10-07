import cn from 'classnames'
import { FC } from 'react'
import s from './ProductView.module.css'
import { Button } from '@components/ui'
import { Swatch } from '@components/product'
import { Colors } from '@components/ui/types'
import type { Product } from '@lib/bigcommerce/api/operations/get-product'
import useAddItem from '@lib/bigcommerce/cart/use-add-item'

interface ProductData {
  name: string
  images: any
  prices: any
  description: string
  colors?: any[]
  sizes?: any[]
}

interface Props {
  className?: string
  children?: any
  productData: ProductData
  product: Product
}

const COLORS: Colors[] = ['pink', 'black', 'white']

const ProductView: FC<Props> = ({ product, productData, className }) => {
  const addItem = useAddItem()
  const addToCart = () => {
    // TODO: loading state by awating the promise
    addItem({
      productId: product.entityId,
      variantId: product.variants.edges?.[0]?.node.entityId!,
    })
  }

  return (
    <div className={cn(s.root, className)}>
      <div className="absolute">
        <h1 className="px-8 py-2 bg-violet text-white font-bold text-3xl">
          {productData.name}
        </h1>
        <div className="px-6 py-2 pb-4 bg-violet text-white font-semibold inline-block">
          {productData.prices}
        </div>
      </div>
      <div className="flex-1 h-full p-24">
        <div className="bg-violet h-full"></div>
      </div>
      <div className="flex-1 flex flex-col">
        <section className="pb-4">
          <h2 className="uppercase font-medium">Color</h2>
          <div className="flex flex-row py-4">
            {COLORS.map((c) => (
              <Swatch key={c} color={c} />
            ))}
          </div>
        </section>
        <section className="pb-4">
          <h2 className="uppercase font-medium">Size</h2>
          <div className="flex flex-row py-4">
            <Swatch size="S" />
            <Swatch size="M" />
            <Swatch size="L" />
            <Swatch size="XL" />
            <Swatch size="XXL" />
          </div>
        </section>
        <section className="pb-12">
          <p>{productData.description}</p>
        </section>
        <section className="pb-4">
          <Button type="button" className={s.button} onClick={addToCart}>
            Add to Cart
          </Button>
        </section>
      </div>
    </div>
  )
}

export default ProductView
