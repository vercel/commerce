import React, { memo } from 'react';
import { ResponsiveType } from 'react-multi-carousel';
import { CarouselCommon, ViewAllItem } from 'src/components/common';
import ProductCard, { ProductCardProps } from 'src/components/common/ProductCard/ProductCard';
import { useGetActiveOrder, useRecommendedProductsInCart } from 'src/components/hooks/cart';
import { ROUTE } from 'src/utils/constanst.utils';
import s from './CartRecommendation.module.scss';
import { useGetUserOrder } from 'src/components/hooks/account'

const RESPONSIVE: ResponsiveType = {
  desktop: {
    breakpoint: { max: 99999, min: 1440 },
    items: 2.5,
    slidesToSlide: 2.5,
  },
  lap: {
    breakpoint: { max: 1440, min: 1008 },
    items: 2.2,
    slidesToSlide: 2.2,
  },
  tablet: {
    breakpoint: { max: 1008, min: 768 },
    items: 2.5,
    slidesToSlide: 2.5,

  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1.5,
    slidesToSlide: 1.5,

  }
};


const CartRecommendation = memo(() => {
  const { products, mutate: mutateRecommendedProductsInCart } = useRecommendedProductsInCart()
  const { mutate: mutateGetActiveOrder } = useGetActiveOrder()
  const { mutate: mutateUserOrder } = useGetUserOrder();

  const onAddToCartCallBack = () => {
    mutateGetActiveOrder()
    mutateRecommendedProductsInCart()
    mutateUserOrder()
  }

  return (
    <div className={s.cartRecommendation}>
      <div className={s.top}>
        <div className={s.heading}>
          Recommendation
        </div>
        <ViewAllItem link={ROUTE.PRODUCTS} />
      </div>
      <div className={s.productCardWarpper}>
        <CarouselCommon<ProductCardProps>
          data={products}
          Component={ProductCard}
          itemKey="cart-recommendation"
          responsive={RESPONSIVE}
          defaultComponentProps={{ isSingleButton: true, onAddToCartCallBack }}
        />
      </div>
    </div>
  )
})

CartRecommendation.displayName = 'CartRecommendation'
export default CartRecommendation;
