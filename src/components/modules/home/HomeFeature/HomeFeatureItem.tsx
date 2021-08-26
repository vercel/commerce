import React from 'react'
import s from './HomeFeature.module.scss'
import Image from 'next/image'

interface HomeFeatureItemProps {
    image?: any;
    children: string;
}

const HomeFeatureItem = ({ image, children }: HomeFeatureItemProps) => {
    
    return (
        <div className={s.homeFeatureItem}>
            <Image className={s.itemImg} src={image} alt="home feature item img" />
            {/* <img className={s.itemImg} src="" alt="home feature item img" />  */}
            <div className={s.itemText}>{children}</div>
        </div>
    )

}

export default HomeFeatureItem
