import React from 'react'
import classNames from 'classnames'
import s from './HomeFeatureItem.module.scss'


interface HomeFeatureItemProps {
    image: string;
    children: any;
}

const HomeFeatureItem = ({ image, children }: HomeFeatureItemProps) => {
    
    return (
        <div className={s.homeFeatureItem}>
            <img className={classNames(s.itemImg, {
            [s[image]]: image,
          })} alt="home feature item img" /> 
            <div className={s.itemText}>{children}</div>
        </div>
    )

}

export default HomeFeatureItem
