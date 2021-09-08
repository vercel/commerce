import React from 'react';
import Link from 'next/link'
import { QuanittyInput } from 'src/components/common';
import { IconDelete } from 'src/components/icons';
import { ROUTE } from 'src/utils/constanst.utils';
import { ProductProps } from 'src/utils/types.utils';
import ImgWithLink from '../../../ImgWithLink/ImgWithLink';
import LabelCommon from '../../../LabelCommon/LabelCommon';
import s from './ProductCartItem.module.scss';

export interface ProductCartItempProps extends ProductProps {
  quantity: number,
}

const ProductCartItem = ({ name, slug, weight, price, oldPrice, discount, imageSrc, quantity }: ProductCartItempProps) => {
  return (
    <div className={s.productCartItem}>
      <div className={s.info}>
        <Link href={`${ROUTE.PRODUCT_DETAIL}/${slug}`}>
          <a href="">
            <div className={s.imgWrap}>
              <ImgWithLink src={imageSrc} alt={name} />
            </div>
          </a>
        </Link>
        <div className={s.detail}>
          <Link href={`${ROUTE.PRODUCT_DETAIL}/${slug}`}>
            <a>
              <div className={s.name}>
                {name} {weight ? `(${weight})` : ''}
              </div>
            </a>
          </Link>
          <div className={s.price}>
            {
              oldPrice &&
              <div className={s.old}>
                <span className={s.number}>{oldPrice}</span>
                <LabelCommon type='discount'>{discount}</LabelCommon>
              </div>
            }
            <div className={s.current}>{price}</div>
          </div>
        </div>
      </div>
      <div className={s.actions}>
        <div className={s.iconDelete}>
          <IconDelete />
        </div>
        <QuanittyInput size='small' initValue={quantity} />
      </div>
    </div>
  )
}

export default ProductCartItem;