import { FC, useState } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import { Stack, Text, Heading, Box, useColorModeValue, Card, CardBody } from '@chakra-ui/react'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

  const [isHover, setIsHover] = useState(false)
  const hoverCardBgColor = useColorModeValue('white', 'gray.800')
  const fontColor = useColorModeValue("black", "black");

  return (
    <Card>
      <CardBody>
        <Link href={`/product/${product.slug}`}>
          <a 
            className={rootClassName}
            aria-label={product.name} 
            onTouchStart={() => setIsHover(true)} 
            onTouchEnd={() => setIsHover(false)} 
            onMouseOut={() => setIsHover(false)}
            onMouseOver={() => setIsHover(true)}
          >
            {variant === 'slim' && !isHover && (
              <>
                <div className={s.header}>
                  <span>{product.name}</span>
                </div>
                {product?.images && (
                  <div>
                    <Image
                      quality="85"
                      src={product.images[0]?.url || placeholderImg}
                      alt={product.name || 'Product Image'}
                      height={320}
                      width={320}
                      layout="fixed"
                      {...imgProps}
                    />
                  </div>
                )}
              </>
            )}

            {variant === 'simple' && !isHover && (
              <>
                {process.env.COMMERCE_WISHLIST_ENABLED && (
                  <WishlistButton
                    className={s.wishlistButton}
                    productId={product.id}
                    variant={product.variants[0]}
                  />
                )}
                <div className={s.imageContainer}>
                  {product?.images && (
                    <div>
                      <Image
                        alt={product.name || 'Product Image'}
                        className={s.productImage}
                        src={product.images[0]?.url || placeholderImg}
                        height={540}
                        width={540}
                        quality="85"
                        layout="responsive"
                        {...imgProps}
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            {variant === 'default' && !isHover && (
              <>
                {process.env.COMMERCE_WISHLIST_ENABLED && (
                  <WishlistButton
                    className={s.wishlistButton}
                    productId={product.id}
                    variant={product.variants[0] as any}
                  />
                )}
                <div className={s.imageContainer}>
                  {product?.images && (
                    <div>
                      <Image
                        alt={product.name || 'Product Image'}
                        className={s.productImage}
                        src={product.images[0]?.url || placeholderImg}
                        height={540}
                        width={540}
                        quality="85"
                        layout="responsive"
                        {...imgProps}
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            {isHover && (
              <>
                <Box
                  role={'group'}
                  p={6}
                  w={'full'}
                  bg={hoverCardBgColor}
                  zIndex={1}>
                  {process.env.COMMERCE_WISHLIST_ENABLED && (
                    <WishlistButton
                      className={s.wishlistButton}
                      productId={product.id}
                      variant={product.variants[0] as any}
                    />
                  )}
                  <div className={s.imageContainer}>
                    {product?.images && (
                      <div>
                        <Image
                          alt={product.name || 'Product Image'}
                          className={s.productImage}
                          src={product.images[0]?.url || placeholderImg}
                          height={540}
                          width={540}
                          quality="85"
                          layout="responsive"
                          {...imgProps}
                        />
                      </div>
                    )}
                  </div>
                  <Stack backgroundColor={"white"} pt={10} align={'center'}>
                      <Heading color={fontColor} fontSize={'lg'} fontFamily={'body'} fontWeight={500} textAlign={"center"}>
                        {product.name}
                      </Heading>
                      <Stack direction={'row'} align={'center'}>
                        <Text color={fontColor} fontWeight={800} fontSize={'xl'}>
                        {`${price} ${product.price?.currencyCode}`}
                        </Text>
                      </Stack>
                  </Stack>
                </Box>
              </>
            )}
            
          </a>
        </Link>
      </CardBody>
    </Card>
  )
}

export default ProductCard
