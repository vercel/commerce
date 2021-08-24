import classNames from 'classnames'
import React, { memo } from 'react'
import { ButonType, ButtonSize } from 'src/utils/constanst.utils'
import s from './ButtonCommon.module.scss'

interface Props {
    children?: React.ReactNode,
    type?: 'primary' | 'light' | 'ghost',
    size?: 'default' | 'large',
    icon?: any,
    isIconSuffix?: boolean,
    loading?: boolean,
    disabled?: boolean,
    onClick?: () => void,
}

const ButtonCommon = memo(({ type = 'primary', size = 'default',
    icon, loading, disabled, isIconSuffix, children, onClick }: Props) => {
    return (
        <button className={classNames({
            [s.buttonCommon]: true,
            [s[type]]: !!type,
            [s[size]]: !!size,
            [s.loading]: loading,
            [s.preserve]: isIconSuffix,
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
})

export default ButtonCommon
