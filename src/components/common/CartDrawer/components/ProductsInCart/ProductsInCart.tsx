import React from 'react';
import ProductCartItem, { ProductCartItempProps } from '../ProductCartItem/ProductCartItem';
import s from './ProductsInCart.module.scss';

interface Props {
  data: ProductCartItempProps[]
}

const ProductsInCart = ({ data }: Props) => {
  return (
    <ul className={s.productsInCart}>
      {
        data.slice(0,1).map(item => <li key={item.name}>
          <ProductCartItem
            name={item.name}
            slug={item.slug}
            weight={item.weight}
            price={item.price}
            oldPrice={item.oldPrice}
            discount={item.discount}
            imageSrc={item.imageSrc}
            quantity={item.quantity}
          />
        </li>)
      }
    </ul>
  )
}

export default ProductsInCart;