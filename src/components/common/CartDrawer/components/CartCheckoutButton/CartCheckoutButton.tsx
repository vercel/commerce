import React, { memo } from 'react';
import { ButtonCommon } from 'src/components/common';
import s from './CartCheckoutButton.module.scss';

const CartCheckoutButton = memo(() => {
  return (
    <div className={s.cartCheckoutButton}>
      <ButtonCommon size='large'>Check out - Rp 120.500</ButtonCommon>
    </div>
  )
})

export default CartCheckoutButton;