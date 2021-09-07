import { TOptionsEvents } from 'keen-slider';
import React from 'react';
import { CarouselCommon, ViewAllItem } from 'src/components/common';
import ProductCard, { ProductCardProps } from 'src/components/common/ProductCard/ProductCard';
import { ROUTE } from 'src/utils/constanst.utils';
import { PRODUCT_DATA_TEST } from 'src/utils/demo-data';
import s from './CartRecommendation.module.scss';

const option: TOptionsEvents = {
  slidesPerView: 2,
  mode: 'free',
  breakpoints: {
    '(min-width: 640px)': {
      slidesPerView: 1,
    },
    '(min-width: 768px)': {
      slidesPerView: 2.5,
    }
  },
}

const CartRecommendation = () => {
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
          data={PRODUCT_DATA_TEST}
          Component={ProductCard}
          itemKey="cart-recommendation"
          option={option}
        />
      </div>
    </div>
  )
}

export default CartRecommendation;
