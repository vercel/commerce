import React from 'react'
import s from './HomeFeature.module.scss'

import HomeFeatureItem from '../HomeFeatureItem/HomeFeatureItem'

const HomeFeature = () => {
    return (
        <section className={s.homeFeature}>       
            <HomeFeatureItem image="firstImg" 
            children={<span> Webshop owner will <b>upload products at 10:30pm </b>shoppers can buy <b>fresh products at 11pm.</b></span>} />

            <HomeFeatureItem image="secondImg"
            children={<span>Most fresh fish and seafood <b>will be listed at 8am </b>from inventory.</span>} />

            <HomeFeatureItem image="thirdImg"
            children={<span>Show that food will be shipped in <b>a greengrocery plastic bag</b>.</span>} />
        </section>
    )

}

export default HomeFeature
