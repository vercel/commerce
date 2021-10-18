import { Product } from '@commerce/types/product'
import React from 'react'
import { ButtonCommon, LabelCommon, QuanittyInput } from 'src/components/common'
import { IconBuy } from 'src/components/icons'
import { LANGUAGE } from 'src/utils/language.utils'
import s from './ProductInfo.module.scss'

interface Props {
    productInfoDetail: Product
}

const ProductInfo = ({ productInfoDetail }: Props) => {
    console.log(productInfoDetail)
    return (
        <section className={s.productInfo}>
            <div className={s.info}>
                <LabelCommon shape='half'>{productInfoDetail.collection}</LabelCommon>
                <h2 className={s.heading}>{productInfoDetail.name}</h2>
                <div className={s.price}>
                    <div className={s.old}>
                        <span className={s.number}>Rp {productInfoDetail.price}</span>
                        <LabelCommon type='discount'>-15%</LabelCommon>
                    </div>
                    <div className={s.current}>Rp {productInfoDetail.price}</div>
                </div>
                <div className={s.description}>
                    {productInfoDetail.description}
                </div>
            </div>
            <div className={s.actions}>
                <QuanittyInput />
                <div className={s.bottom}>
                    {/* <ButtonCommon size='large'>{LANGUAGE.BUTTON_LABEL.PREORDER}</ButtonCommon> */}
                    <ButtonCommon size='large'>{LANGUAGE.BUTTON_LABEL.BUY_NOW}</ButtonCommon>

                    <ButtonCommon size='large' type='light'>
                        <span className={s.buttonWithIcon}>
                            <IconBuy /><span className={s.label}>{LANGUAGE.BUTTON_LABEL.ADD_TO_CARD}</span>
                        </span>
                    </ButtonCommon>
                </div>
            </div>
        </section >
    )
}

export default ProductInfo
