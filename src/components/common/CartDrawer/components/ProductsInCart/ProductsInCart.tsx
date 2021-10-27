import { LineItem } from '@commerce/types/cart';
import React from 'react';
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
    </ul>
  )
}

export default ProductsInCart;