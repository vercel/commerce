import React, { memo } from 'react';
import { useCartDrawer } from 'src/components/contexts';
import useGetActiveOrder from 'src/components/hooks/cart/useGetActiveOrder';
import { DEFAULT_CURRENCY } from 'src/utils/constanst.utils';
import { DrawerCommon } from '..';
import s from './CartDrawer.module.scss';
import CartCheckoutButton from './components/CartCheckoutButton/CartCheckoutButton';
import CartMessage from './components/CartMessage/CartMessage';
import CartRecommendation from './components/CartRecommendation/CartRecommendation';
import ProductsInCart from './components/ProductsInCart/ProductsInCart';

interface Props {

}

const CartDrawer = memo(({ }: Props) => {
  const { cartVisible, closeCartDrawer } = useCartDrawer()
  const { order } = useGetActiveOrder()
  return (
    <DrawerCommon
      title={`Your cart (${order?.lineItems.length || 0})`}
      visible={cartVisible}
      onClose={closeCartDrawer}>
      <div className={s.cartDrawer}>
        <div className={s.body}>
          <ProductsInCart data={order?.lineItems || []} currency={order?.currency || { code: DEFAULT_CURRENCY }} />
          <CartRecommendation />
        </div>
        <div>
          <CartMessage />
          <CartCheckoutButton onClose={closeCartDrawer} total={order?.totalPrice || 0} currency={order?.currency || { code: DEFAULT_CURRENCY }} />
        </div>
      </div>
    </DrawerCommon>
  )
})

CartDrawer.displayName = 'CartDrawer'
export default CartDrawer;