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
        <div className={classNames(s.headingCommon, {
            [s[type]]: type,
            [s[align]]: align
          })}
        >{children}</div>
    )

}

export default HeadingCommon
