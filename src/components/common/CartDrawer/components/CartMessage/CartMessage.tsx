import React, { memo } from 'react';
import { IconInfo } from 'src/components/icons';
import s from './CartMessage.module.scss';

const CartMessage = memo(() => {
  return (
    <div className={s.cartMessage}>
      <div className={s.text}>
        You save - Rp 150
      </div>
      <div className={s.icon}>
        <IconInfo />
      </div>
    </div>
  )
})

export default CartMessage;