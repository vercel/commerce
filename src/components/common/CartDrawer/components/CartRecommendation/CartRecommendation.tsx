import React from 'react';
import { ResponsiveType } from 'react-multi-carousel';
import { CarouselCommon, ViewAllItem } from 'src/components/common';
import ProductCard, { ProductCardProps } from 'src/components/common/ProductCard/ProductCard';
import { useGetActiveOrder, useRecommendedProductsInCart } from 'src/components/hooks/cart';
import { ROUTE } from 'src/utils/constanst.utils';
import s from './CartRecommendation.module.scss';

const RESPONSIVE:ResponsiveType = {
  desktop: {
    breakpoint: { max: 99999, min: 1440 },
    items: 2.5,
    slidesToSlide: 1 // optional, default to 1.
  },
  lap: {
    breakpoint: { max: 1440, min: 1008 },
    items: 2.2,
  },
  tablet: {
    breakpoint: { max: 1008, min: 768 },
    items: 2.5,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1.5,
  }
};


const CartRecommendation = () => {
  const { products, mutate: mutateRecommendedProductsInCart } = useRecommendedProductsInCart()
  const { mutate: mutateGetActiveOrder } = useGetActiveOrder()

  const onAddToCartCallBack = () => {
    mutateGetActiveOrder()
    mutateRecommendedProductsInCart()
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
}

export default CartRecommendation;
