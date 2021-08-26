import React from 'react'
import s from './CollectionHeading.module.scss'
import HeadingCommon from '../HeadingCommon/HeadingCommon'

interface CollectionHeadingProps {
    type?: 'default' | 'highlight' | 'light';
    children: string;
    subtitle: string;
}

const CollectionHeading = ({ type='default', children, subtitle }: CollectionHeadingProps) => {

    return (
        <section>
            <HeadingCommon type={type} children={children}/>
            <div className={s.subtitle}>{subtitle}</div>
        </section>
    )

}

export default CollectionHeading
