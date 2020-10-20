import { NextSeo } from 'next-seo'
import { FC, useState, useEffect } from 'react'
import type { ProductNode } from '@lib/bigcommerce/api/operations/get-product'
import { useUI } from '@components/ui/context'
import { Button, Container } from '@components/ui'
import { Swatch, ProductSlider } from '@components/product'
import useAddItem from '@lib/bigcommerce/cart/use-add-item'
import { getProductOptions } from '../helpers'
import s from './ProductView.module.css'
import { isDesktop } from '@lib/browser'
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
  const [validMedia, setValidMedia] = useState(false)

  const [choices, setChoices] = useState<Record<string, any>>({
    size: null,
    color: null,
  })

  useEffect(() => {
    setValidMedia(isDesktop())
  }, [])

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
              {/** TODO: Change with Image Component */}
              {product.images.edges?.map((image, i) => (
                <img
                  key={image?.node.urlSmall}
                  className="w-full object-cover"
                  src={image?.node.urlXL}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </ProductSlider>
          </div>

          {!validMedia && (
            <div className="absolute z-10 bottom-10 left-1/2 transform -translate-x-1/2 inline-block">
              <img src="/slider-arrows.png" />
            </div>
          )}

          <div className={s.squareBg}></div>
        </div>

        <div className="flex-1 flex flex-col pt-24">
          <section>
            {options?.map((opt: any) => (
              <div className="pb-4" key={opt.displayName}>
                <h2 className="uppercase font-medium">{opt.displayName}</h2>
                <div className="flex flex-row py-4">
                  {opt.values.map((v: any) => {
                    const active = choices[opt.displayName]

                    return (
                      <Swatch
                        key={v.entityId}
                        active={v.label === active}
                        variant={opt.displayName}
                        color={v.hexColors ? v.hexColors[0] : ''}
                        label={v.label}
                        onClick={() => {
                          setChoices((choices) => {
                            console.log(choices)
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
            <div className="pb-12">
              <div
                className="pb-14 break-words"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <Button
                type="button"
                className={s.button}
                onClick={addToCart}
                loading={loading}
              >
                Add to Cart
              </Button>
            </div>
          </section>
        </div>
      </div>
    </Container>
  )
}

export default ProductView
