import React from 'react'
import { Banner } from 'src/components/common'
import s from './HomeBanner.module.scss'

interface Props {
    className?: string
    children?: any
}

const HomeBanner = ({ }: Props) => {
    return (
        <div className={s.homeBanner}>
            <section className={s.left}>
                <div className={s.text}>
                    Freshness<br/>guaranteed
                </div>
            </section >
            <Banner
                title="Save 15% on your first order"
                subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
                imgLink="https://user-images.githubusercontent.com/76729908/130574371-3b75fa72-9552-4605-aba9-a4b31cd9dce7.png"
            />
        </div >
    )
}

export default HomeBanner
