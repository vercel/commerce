import React from 'react'
import s from './CollectionHeading.module.scss'
import HeadingCommon from '../HeadingCommon/HeadingCommon'

interface CollectionHeadingProps {
    type?: 'default' | 'highlight' | 'light';
    title: string;
    subtitle: string;
}

const CollectionHeading = ({ type = 'default', title, subtitle }: CollectionHeadingProps) => {

    return (
        <section>
            <HeadingCommon type={type}>{title}</HeadingCommon>
            <div className={s.subtitle}>{subtitle}</div>
        </section>
    )

}

export default CollectionHeading
