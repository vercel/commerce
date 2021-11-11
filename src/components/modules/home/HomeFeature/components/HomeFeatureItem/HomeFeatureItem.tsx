import React from 'react'
import s from './HomeFeatureItem.module.scss'

import { StaticImage } from 'src/components/common'

export interface HomeFeatureItemProps {
    imageSrc?: string | null;
    content?: string | null;
}

const HomeFeatureItem = ({ imageSrc, content }: HomeFeatureItemProps) => {
    
    return (
        <div className={s.homeFeatureItem}>
            <div className={s.itemImg}>
                <StaticImage src={imageSrc} alt="home feature item img" />
            </div>
            
            <div className={s.itemText}>{content}</div>
        </div> 
    )

}

export default HomeFeatureItem
