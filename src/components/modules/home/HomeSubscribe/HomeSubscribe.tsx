import React from 'react'
import FormSubscribe from './FormSubscribe/FormSubscribe'
import s from './HomeSubscribe.module.scss'

const HomeSubscribe = () => {
    return (
        <section className={s.homeSubscribe}>
            <h2 className={s.heading}>Let's stay in touch</h2>
            <div className={s.sub}>Subscribe to our newsletter for fresh news, seasonal arrivals and delicious recipes.</div>
            <FormSubscribe />
        </section >
    )
}

export default HomeSubscribe
