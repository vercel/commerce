import React from 'react'
import s from './HomeFeature.module.scss'

import HomeFeatureItem from './HomeFeatureItem'

import img from './assets/desktop.png'

interface HomeFeatureProps {
    
}

const HomeFeature = ({  }: HomeFeatureProps) => {
    return (
        <section className={s.homeFeature}>
            <HomeFeatureItem image={img} children="Webshop owner will upload products at 10:30pm, shoppers can buy fresh products at 11pm." />
            <HomeFeatureItem image={img} children="Most fresh fish and seafood will be listed at 8am from inventory. " />
            <HomeFeatureItem image={img} children="Show that food will be shipped in a greengrocery plastic bag" />
        </section>
    )

}

export default HomeFeature
