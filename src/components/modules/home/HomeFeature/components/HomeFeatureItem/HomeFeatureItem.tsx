import React from 'react'
import s from './HomeFeatureItem.module.scss'

import { StaticImage } from 'src/components/common'

export interface HomeFeatureItemProps {
    image: StaticImageData;
    children: React.ReactNode;
}

const HomeFeatureItem = ({ image, children }: HomeFeatureItemProps) => {
    
    return (
        <div className={s.homeFeatureItem}>
            <div className={s.itemImg}>
                <StaticImage src={image} alt="home feature item img" />
            </div>
            
            <div className={s.itemText}>{children}</div>
        </div> 
    )

}

export default HomeFeatureItem
