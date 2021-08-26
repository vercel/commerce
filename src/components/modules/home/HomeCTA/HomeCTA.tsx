import Link from 'next/link'
import React from 'react'
import { ButtonCommon } from 'src/components/common'
import { ROUTE } from 'src/utils/constanst.utils'
import { LANGUAGE } from 'src/utils/language.utils'
import s from './HomeCTA.module.scss'


const HomeCTA = () => {
    return (
        <section className={s.homeCTA}>
            <div className={s.inner}>
                <div className={s.text}>
                    <h1 className={s.heading}>SALE 70%</h1>
                    <div className={s.sub}>for Vegetarian Day</div>
                </div>
                <Link href={ROUTE.PRODUCTS}>
                    <a>
                        <ButtonCommon type='ghost' size='large'>{LANGUAGE.BUTTON_LABEL.SHOP_NOW}</ButtonCommon>
                    </a>
                </Link>
            </div>
        </section >
    )
}

export default HomeCTA
