import { LineItem } from '@commerce/types/cart';
import React from 'react';
import { EmptyCommon } from 'src/components/common';
import ProductCartItem from '../ProductCartItem/ProductCartItem';
import s from './ProductsInCart.module.scss';

interface Props {
  data: LineItem[]
  currency: { code: string }
}

const ProductsInCart = ({ data, currency }: Props) => {
  return (
    <ul className={s.productsInCart}>
      {
        data.map(item => <li key={item.name}>
          <ProductCartItem
            currency = {currency}
            {...item}
          />
        </li>)
      }
      {
        data.length === 0 && <EmptyCommon description="No item in cart"/>
      }
    </ul>
  )
}

export default ProductsInCart;