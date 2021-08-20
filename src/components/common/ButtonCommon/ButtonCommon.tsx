import classNames from 'classnames'
import React from 'react'
import { ButonType, ButtonSize } from 'src/utils/constanst.utils'
import s from './ButtonCommon.module.scss'

interface Props {
    children?: any,
    type?: ButonType,
    size?: ButtonSize,
    icon?: HTMLElement,
}

const ButtonCommon = ({ type, size, icon, children }: Props) => {
    return (
        <button className={classNames({
            [s.buttonCommon]: true,
            [s.type]: type,
            [s.size]: size,
        })}>
            {
                icon && { icon }
            }
            <span className={s.label}>{children}</span>
        </button>
    )
}

export default ButtonCommon
