'use client'

import { cn } from 'lib/utils'
import { FC } from 'react'
// import type { Product } from '@commerce/types/product'
import dynamic from 'next/dynamic'
// import usePrice from '@framework/product/use-price'

// const WishlistButton = dynamic(
//   () => import('@components/wishlist/WishlistButton')
// )
const ProductTag = dynamic(() => import('components/ui/product-tag'))
const SanityImage = dynamic(() => import('components/ui/sanity-image'))

interface Props {
  className?: string
  // product: Product
  variant?: 'default'
}

const ProductCard: FC<Props> = ({
  // product,
  className,
  variant = 'default',
}) => {
  // const { price } = usePrice({
  //   amount: product.price.value,
  //   baseAmount: product.price.retailPrice,
  //   currencyCode: product.price.currencyCode!,
  // })

  const rootClassName = cn(
    'w-full min-w-0 grow-0 shrink-0  group relative box-border overflow-hidden transition-transform ease-linear basis-[50%]',
    className
  )

  return (
    <>Produyct</>
    // <Link
    //   href={`${product.slug}`}
    //   className={rootClassName}
    //   aria-label={product.name}
    //   locale={product.locale}
    // >
    //   {variant === 'default' && (
    //     <>
    //       <div className={'flex flex-col flex-1 justify-center w-full h-full'}>
    //         {/* {process.env.COMMERCE_WISHLIST_ENABLED && (
    //           <WishlistButton
    //             className={'top-4 right-4 z-10 absolute'}
    //             productId={product.id}
    //             variant={
    //               product?.variants ? (product.variants[0] as any) : null
    //             }
    //           />
    //         )} */}
    //         {/* <div className="w-full h-full aspect-square overflow-hidden relative">
    //           {product?.images && (
    //             <SanityImage
    //               image={product?.images[0]}
    //               alt={product.name || 'Product Image'}
    //               width={400}
    //               height={400}
    //               sizes="(max-width: 1024px) 50vw, 20vw"
    //             />
    //           )}
    //         </div> */}
    //         <ProductTag
    //           className="mt-2 lg:mt-3"
    //           name={product.title}
    //           price={`${price}`}
    //         />
    //       </div>
    //     </>
    //   )}
    // </Link>
  )
}

export default ProductCard
