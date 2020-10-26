import { FC, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

import s from './ProductView.module.css'
import { Heart } from '@components/icon'
import { useUI } from '@components/ui/context'
import { Swatch, ProductSlider } from '@components/product'
import { Button, Container } from '@components/ui'
import { HTMLContent } from '@components/core'

import useAddItem from '@lib/bigcommerce/cart/use-add-item'
import type { ProductNode } from '@lib/bigcommerce/api/operations/get-product'
import { getProductOptions } from '../helpers'

interface Props {
  className?: string
  children?: any
  product: ProductNode
}

const ProductView: FC<Props> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const options = getProductOptions(product)
  const [loading, setLoading] = useState(false)

  const [choices, setChoices] = useState<Record<string, any>>({
    size: null,
    color: null,
  })

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: product.entityId,
        variantId: product.variants.edges?.[0]?.node.entityId!,
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <Container className="max-w-none w-full" clean>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images.edges?.[0]?.node.urlOriginal!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.productDisplay, 'fit')}>
          <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>
              {product.prices?.price.value}
              {` `}
              {product.prices?.price.currencyCode}
            </div>
          </div>

          <div className={s.sliderContainer}>
            <ProductSlider>
              {product.images.edges?.map((image, i) => (
                <div key={image?.node.urlOriginal} className={s.imageContainer}>
                  <Image
                    alt={product.name}
                    className={s.img}
                    src={image?.node.urlOriginal!}
                    width={1050}
                    height={1050}
                    priority={i === 0}
                    quality="90"
                  />
                </div>
              ))}
            </ProductSlider>
          </div>
        </div>

        <div className={s.sidebar}>
          <section>
            {options?.map((opt: any) => (
              <div className="pb-4" key={opt.displayName}>
                <h2 className="uppercase font-medium">{opt.displayName}</h2>
                <div className="flex flex-row py-4">
                  {opt.values.map((v: any, i: number) => {
                    const active = choices[opt.displayName]

                    return (
                      <Swatch
                        key={`${v.entityId}-${i}`}
                        active={v.label === active}
                        variant={opt.displayName}
                        color={v.hexColors ? v.hexColors[0] : ''}
                        label={v.label}
                        onClick={() => {
                          setChoices((choices) => {
                            return {
                              ...choices,
                              [opt.displayName]: v.label,
                            }
                          })
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="pb-14 break-words w-full max-w-xl">
              <HTMLContent html={product.description} />
            </div>
          </section>
          <div>
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.button}
              onClick={addToCart}
              loading={loading}
            >
              Add to Cart
            </Button>
          </div>
        </div>

        {/* TODO make it work */}
        <div className={s.wishlistButton}>
          <Heart />
        </div>
      </div>
    </Container>
  )
}

export default ProductView
