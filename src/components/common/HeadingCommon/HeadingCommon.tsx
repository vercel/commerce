import React from 'react'
import classNames from 'classnames'
import s from './HeadingCommon.module.scss'

interface HeadingCommonProps {
    type?: 'highlight' | 'light' | 'default';
    align?: 'center' | 'left';
    children: string;
}

const HeadingCommon = ({ type='default', align='left', children }: HeadingCommonProps) => {

    return (
        <h1 className={classNames(s.headingCommon, {
            [s[type]]: type,
            [s[align]]: align
          })}
        >{children}</h1>
    )

}

export default HeadingCommon
