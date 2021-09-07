import React from 'react';
import { PRODUCT_CART_DATA_TEST } from 'src/utils/demo-data';
import { DrawerCommon } from '..';
import s from './CartDrawer.module.scss';
import CartCheckoutButton from './components/CartCheckoutButton/CartCheckoutButton';
import CartMessage from './components/CartMessage/CartMessage';
import CartRecommendation from './components/CartRecommendation/CartRecommendation';
import ProductsInCart from './components/ProductsInCart/ProductsInCart';

interface Props {
  visible: boolean
  onClose: () => void
}

const CartDrawer = ({ visible, onClose }: Props) => {
  return (
    <DrawerCommon
      title={`Your cart (${PRODUCT_CART_DATA_TEST.length})`}
      visible={visible}
      onClose={onClose}>
      <div className={s.cartDrawer}>
        <div className={s.body}>
          <ProductsInCart data={PRODUCT_CART_DATA_TEST}/>
          <CartRecommendation />
        </div>
        <div className={s.bottom}>
          <CartMessage />
          <CartCheckoutButton />
        </div>
      </div>
    </DrawerCommon>
  )
}

export default CartDrawer;