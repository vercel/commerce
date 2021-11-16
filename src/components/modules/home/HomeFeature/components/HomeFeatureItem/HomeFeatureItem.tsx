import React from 'react'
import s from './HomeFeatureItem.module.scss'

export interface HomeFeatureItemProps {
    imageSrc: string  ;
    content:  string ;
}

const HomeFeatureItem = ({ imageSrc, content }: HomeFeatureItemProps) => {
    
    return (
        <div className={s.homeFeatureItem}>
            <div className={s.itemImg}>
                <img src={imageSrc ?? ''} alt="home feature item img" />
            </div>
            
            <div className={s.itemText} dangerouslySetInnerHTML={{__html: content ?? ''}}></div>
        </div> 
    )

}

export default HomeFeatureItem
