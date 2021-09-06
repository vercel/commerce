import React from 'react';
import ProductCartItem, { ProductCartItempProps } from '../ProductCartItem/ProductCartItem';
import s from './ProductsInCart.module.scss';

interface Props {
  data: ProductCartItempProps[]
}

const ProductsInCart = ({ data }: Props) => {
  return (
    <div className={s.productsInCart}>
      {
        data.map(item => <ProductCartItem
          key={item.name}
          name={item.name}
          weight={item.weight}
          price={item.price}
          oldPrice={item.oldPrice}
          discount={item.discount}
          imageSrc={item.imageSrc}
          quantity={item.quantity}
        />)
      }
    </div>
  )
}

export default ProductsInCart;