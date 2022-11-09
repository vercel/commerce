import s from './ProductView.module.css'

import type { FC } from 'react'
import type { Product } from '@commerce/types/product'

import { SEO } from '@components/common'
import { ProductProvider } from '../context'
import { Container, Text } from '@components/ui'
import { ProductCard } from '@components/product'

import ProductDetails from '../ProductDetails/ProductDetails'

interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  return (
    <>
      <Container className="max-w-none w-full" clean>
        <ProductProvider product={product}>
          <ProductDetails />
        </ProductProvider>

        <hr className="mt-7 border-accent-2" />

        <section className="py-12 px-6 mb-10">
          <Text variant="sectionHeading">Related Products</Text>
          <div className={s.relatedProductsGrid}>
            {relatedProducts.map((p) => (
              <div
                key={p.path}
                className="bg-accent-0 border border-accent-2 flex flex-1 h-full"
              >
                <ProductCard
                  className="animated fadeIn"
                  noNameTag
                  product={p}
                  key={p.path}
                  variant="simple"
                />
              </div>
            ))}
          </div>
        </section>
      </Container>
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '600',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
