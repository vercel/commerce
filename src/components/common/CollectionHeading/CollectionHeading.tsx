import React from 'react'
// import classNames from 'classnames'
import s from './CollectionHeading.module.scss'
import HeadingCommon from '../HeadingCommon/HeadingCommon'

interface CollectionHeadingProps {
    headingType?: 'default' | 'highlight' | 'light'
    headingText: string;
    subtitle: string
}

const CollectionHeading = ({ headingType='default', headingText, subtitle }: CollectionHeadingProps) => {

    return (
        <section className="collectionHeading">
            <HeadingCommon headingType={headingType} headingText={headingText}/>
            <div className={s.subtitle}>{subtitle}</div>
        </section>
    )

}

export default CollectionHeading
