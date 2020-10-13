import cn from 'classnames'
import { FC, useState } from 'react'
import s from './ProductView.module.css'
import { Button } from '@components/ui'
import { Swatch } from '@components/product'
import { Colors } from '@components/ui/types'
import type { Product } from '@lib/bigcommerce/api/operations/get-product'
import useAddItem from '@lib/bigcommerce/cart/use-add-item'
import { useUI } from '@components/ui/context'

interface Props {
  className?: string
  children?: any
  product: Product
}

interface Choices {
  size?: string | null
  color?: string | null
}

const COLORS: Colors[] = ['pink', 'black', 'white']
const SIZES = ['s', 'm', 'l', 'xl', 'xxl']

const ProductView: FC<Props> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const [choices, setChoices] = useState<Choices>({
    size: null,
    color: null,
  })

  const addToCart = async () => {
    // TODO: loading state by awating the promise
    await addItem({
      productId: product.entityId,
      variantId: product.variants.edges?.[0]?.node.entityId!,
    })
    openSidebar()
  }

  const activeSize = choices.size
  const activeColor = choices.color

  console.log(product.images.edges.map((n) => n.node))

  return (
    <div className={cn(s.root, className)}>
      <div className="absolute">
        <h1 className="px-6 py-2 bg-violet text-white font-bold text-3xl">
          {product.name}
        </h1>
        <div className="px-6 py-2 pb-4 bg-violet text-white font-semibold inline-block">
          {product.prices?.price.value}
          {` `}
          {product.prices?.price.currencyCode}
        </div>
      </div>
      <div className="flex-1 h-48 p-24 relative min-h-screen overflow-hidden">
        <div className="absolute z-10 inset-0 flex items-center justify-center">
          <img
            className="w-full object-cover"
            src={product.images.edges?.[0]?.node.urlXL}
          />
        </div>
        <div className=" absolute inset-24 z-0 bg-violet"></div>
      </div>
      <div className="flex-1 flex flex-col">
        <section className="pb-4">
          <h2 className="uppercase font-medium">Color</h2>
          <div className="flex flex-row py-4">
            {COLORS.map((color) => (
              <Swatch
                key={color}
                color={color}
                active={color === activeColor}
                onClick={() =>
                  setChoices((choices) => {
                    return { ...choices, color }
                  })
                }
              />
            ))}
          </div>
        </section>
        <section className="pb-4">
          <h2 className="uppercase font-medium">Size</h2>
          <div className="flex flex-row py-4">
            {SIZES.map((size) => {
              return (
                <Swatch
                  size={size.toUpperCase()}
                  key={`size-${size}`}
                  active={size === activeSize}
                  onClick={() =>
                    setChoices((choices) => {
                      return { ...choices, size }
                    })
                  }
                />
              )
            })}
          </div>
        </section>
        <section className="pb-12">
          <div
            className="break-words"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
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
