import React, { memo } from 'react';
import { ButtonCommon } from 'src/components/common';
import s from './CartCheckoutButton.module.scss';
import Link from 'next/link'
import { ROUTE } from 'src/utils/constanst.utils';

const CartCheckoutButton = memo(() => {
  return (
    <Link href={ROUTE.CHECKOUT}>
      <a className={s.cartCheckoutButton}>
        <ButtonCommon size='large'>Check out - Rp 120.500</ButtonCommon>
      </a>
    </Link>
  )
})

export default CartCheckoutButton;