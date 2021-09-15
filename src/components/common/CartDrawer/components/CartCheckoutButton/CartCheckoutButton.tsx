import React, { memo } from 'react';
import { ButtonCommon } from 'src/components/common';
import s from './CartCheckoutButton.module.scss';
import Link from 'next/link'
import { ROUTE } from 'src/utils/constanst.utils';

interface Props {
  onClose: () => void
}


const CartCheckoutButton = memo(({ onClose }: Props) => {
  return (
    <Link href={ROUTE.CHECKOUT}>
      <a className={s.cartCheckoutButton}>
        <ButtonCommon size='large' onClick={onClose}>Check out - Rp 120.500</ButtonCommon>
      </a>
    </Link>
  )
})

export default CartCheckoutButton;