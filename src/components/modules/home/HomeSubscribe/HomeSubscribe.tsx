import React from 'react'
import { HeadingCommon } from 'src/components/common'
import FormSubscribe from './FormSubscribe/FormSubscribe'
import s from './HomeSubscribe.module.scss'

const HomeSubscribe = () => {
    return (
        <section className={s.homeSubscribe}>
            <HeadingCommon type='light'>Let's stay in touch</HeadingCommon>
            <div className={s.sub}>Subscribe to our newsletter for fresh news, seasonal arrivals and delicious recipes.</div>
            <FormSubscribe />
        </section >
    )
}

export default HomeSubscribe
