import classNames from 'classnames'
import React from 'react'
import { ButonType, ButtonSize } from 'src/utils/constanst.utils'
import s from './ButtonCommon.module.scss'

interface Props {
    children?: any,
    type?: ButonType,
    size?: ButtonSize,
    icon?: any,
    loading?: boolean,
    disabled?: boolean,
    onClick?: () => void,
}

const ButtonCommon = ({ type = ButonType.primary, size = ButtonSize.default,
    icon, loading, disabled, children, onClick }: Props) => {
    return (
        <button className={classNames({
            [s.buttonCommon]: true,
            [s[type]]: !!type,
            [s[size]]: !!size,
            [s.loading]: loading,
        })}
            disabled={disabled}
            onClick={onClick}
        >
            {
                icon && <span className={s.icon}>{icon}</span>
            }
            <span className={s.label}>{children}</span>
        </button>
    )
}

export default ButtonCommon
