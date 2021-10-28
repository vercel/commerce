import { normalizeCart } from '@framework/utils/normalize';
import React from 'react';
import { useCartDrawer } from 'src/components/contexts';
import useGetActiveOrder from 'src/components/hooks/cart/useGetActiveOrder';
import { PRODUCT_CART_DATA_TEST } from 'src/utils/demo-data';
import { DrawerCommon } from '..';
import s from './CartDrawer.module.scss';
import CartCheckoutButton from './components/CartCheckoutButton/CartCheckoutButton';
import CartMessage from './components/CartMessage/CartMessage';
import CartRecommendation from './components/CartRecommendation/CartRecommendation';
import ProductsInCart from './components/ProductsInCart/ProductsInCart';

interface Props {

}

const CartDrawer = ({ }: Props) => {
  const { cartVisible, closeCartDrawer } = useCartDrawer()
  const {order} = useGetActiveOrder()
  return (
    <DrawerCommon
      title={`Your cart (${order?.lineItems.length || 0})`}
      visible={cartVisible}
      onClose={closeCartDrawer}>
      <div className={s.cartDrawer}>
        <div className={s.body}>
          <ProductsInCart data={order?.lineItems||[]} currency={order?.currency||{code:"USA"}}/>
          <CartRecommendation />
        </div>
        <div>
          <CartMessage />
          <CartCheckoutButton onClose={closeCartDrawer} />
        </div>
      </div>
    </DrawerCommon>
  )
}

export default CartDrawer;