import React, { memo } from 'react';
import { ButtonCommon } from 'src/components/common';
import s from './CartCheckoutButton.module.scss';
import Link from 'next/link'
import { ROUTE } from 'src/utils/constanst.utils';

interface Props {
  onClose: () => void
  total:number
  currency: { code: string }
}


const CartCheckoutButton = memo(({ onClose, total, currency }: Props) => {
  return (
    <Link href={ROUTE.CHECKOUT}>
      <a className={s.cartCheckoutButton}>
        <ButtonCommon size='large' onClick={onClose}>Check out - {total} {currency.code}</ButtonCommon>
      </a>
    </Link>
  )
})

CartCheckoutButton.displayName = 'CartCheckoutButton'
export default CartCheckoutButton;