import React from 'react'
import classNames from 'classnames'
import s from './HeadingCommon.module.scss'

interface HeadingCommonProps {
    headingType?: 'highlight' | 'light' | 'default';
    textAlign?: 'center' | 'left';
    headingText?: string;
}

const HeadingCommon = ({ headingType='default', textAlign='left', headingText='categories' }: HeadingCommonProps) => {

    return (
        <div className={classNames(s.headingCommon, {
            [s[`${headingType}`]]: headingType,
            [s[`${textAlign}`]]: textAlign
          })}
        >{headingText}</div>
    )

}

export default HeadingCommon
