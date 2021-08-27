import React from 'react'
import s from './HomeFeature.module.scss'

import HomeFeatureItem from '../HomeFeatureItem/HomeFeatureItem'

const HomeFeature = () => {
    return (
        <section className={s.homeFeature}>       
            <HomeFeatureItem image="firstImg">
                <span> Webshop owner will <b>upload products at 10:30pm </b>shoppers can buy <b>fresh products at 11pm.</b></span>
            </HomeFeatureItem>

            <HomeFeatureItem image="secondImg">
                <span>Most fresh fish and seafood <b>will be listed at 8am </b>from inventory.</span>
            </HomeFeatureItem>

            <HomeFeatureItem image="thirdImg">
                <span>Show that food will be shipped in <b>a greengrocery plastic bag</b>.</span>
            </HomeFeatureItem>
        </section>
    )

}

export default HomeFeature
