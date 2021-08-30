import React from 'react'
import { ButtonCommon, LabelCommon, QuanittyInput } from 'src/components/common'
import { LANGUAGE } from 'src/utils/language.utils'
import s from './ProductInfo.module.scss'

interface Props {
    className?: string
    children?: any,
}

const ProductInfo = ({ }: Props) => {
    return (
        <section className={s.productInfo}>
            <div className={s.info}>
                <LabelCommon shape='half'>SEAFOOD</LabelCommon>
                <h2 className={s.heading}>SeaPAk</h2>
                <div className={s.price}>
                    <div className={s.old}>
                        <span className={s.number}>Rp 32.000</span>
                        <LabelCommon type='discount'>-15%</LabelCommon>
                    </div>
                    <div className={s.current}>Rp 27.500</div>
                </div>
                <div className={s.description}>
                    In a large non-reactive dish, mix together the orange juice, soy sauce, olive oil, lemon juice, parsley
                </div>
            </div>
            <QuanittyInput />
            <div className={s.bottom}>
                <ButtonCommon size='large'>{LANGUAGE.BUTTON_LABEL.BUY_NOW}</ButtonCommon>
                <ButtonCommon size='large' type='light'>{LANGUAGE.BUTTON_LABEL.ADD_TO_CARD}</ButtonCommon>
            </div>
        </section >
    )
}

export default ProductInfo
