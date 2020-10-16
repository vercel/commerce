import { NextSeo } from 'next-seo'
import { FC, useState } from 'react'
import s from './ProductView.module.css'
import { Colors } from '@components/ui/types'
import { useUI } from '@components/ui/context'
import { Button, Container } from '@components/ui'
import { Swatch, ProductSlider } from '@components/product'
import useAddItem from '@lib/bigcommerce/cart/use-add-item'
import type { Product } from '@lib/bigcommerce/api/operations/get-product'
import { getProductOptions } from '../helpers'

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
  const options = getProductOptions(product)
  console.log(options)

  const addItem = useAddItem()
  const { openSidebar } = useUI()

  const [choices, setChoices] = useState<Choices>({
    size: null,
    color: null,
  })

  const [loading, setLoading] = useState(false)

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
      // Error err.
      setLoading(false)
    }
  }

  const activeSize = choices.size
  const activeColor = choices.color

  return (
    <Container>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images.edges?.[0]?.node.urlXL || '',
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
      <div className="relative flex flex-row items-start fit my-12">
        <div className="absolute top-0 left-0 z-50">
          <h1 className="px-6 py-2 bg-violet text-white font-bold text-3xl">
            {product.name}
          </h1>
          <div className="px-6 py-2 pb-4 bg-violet text-white font-bold inline-block traking">
            {product.prices?.price.value}
            {` `}
            {product.prices?.price.currencyCode}
          </div>
        </div>
        <div className="flex-1 px-24 pb-0 relative fit  box-border">
          <div className="absolute z-10 inset-0 flex items-center justify-center">
            <ProductSlider>
              {product.images.edges?.map((image, i) => (
                <img
                  className="w-full object-cover"
                  src={image?.node.urlXL}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </ProductSlider>
          </div>

          <div className="absolute z-10 bottom-10 left-1/2 transform -translate-x-1/2 inline-block">
            <img src="/slider-arrows.png" />
          </div>

          <div className={s.squareBg}></div>
        </div>

        <div className="flex-1 flex flex-col pt-24">
          {options?.map((opt) => (
            <section className="pb-4">
              <h2 className="uppercase font-medium">{opt.displayName}</h2>
              <div className="flex flex-row py-4">
                {opt.values.map((v: any) => {
                  return (
                    <Swatch
                      key={v.entityId}
                      label={v.label}
                      active={v.label === activeColor}
                      variant={opt.displayName}
                      onClick={() =>
                        setChoices((choices) => {
                          return {
                            ...choices,
                            [opt.displayName.toLowerCase()]: v.label,
                          }
                        })
                      }
                    />
                  )
                })}
              </div>
            </section>
          ))}
          <section className="pb-12">
            <div
              className="break-words"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </section>
          <section className="">
            <Button
              type="button"
              className={s.button}
              onClick={addToCart}
              loading={loading}
            >
              Add to Cart
            </Button>
          </section>
        </div>
      </div>
    </Container>
  )
}

export default ProductView
