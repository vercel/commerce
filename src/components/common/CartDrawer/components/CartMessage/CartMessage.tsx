import React, { memo } from 'react';
import { IconInfo } from 'src/components/icons';
import s from './CartMessage.module.scss';

const CartMessage = memo(() => {
  return (
    <div className={s.cartMessage}>
      <div className={s.text}>
        Welcome to 'beta' FarFromYou
      </div>
      <div className={s.icon}>
        <IconInfo />
      </div>
    </div>
  )
})

CartMessage.displayName = 'CartMessage'
export default CartMessage;