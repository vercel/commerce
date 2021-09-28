import classNames from 'classnames'
import React, { memo } from 'react'
import s from './ButtonCommon.module.scss'

interface Props {
    children?: React.ReactNode,
    type?: 'primary' | 'light' | 'ghost' | 'lightBorderNone',
    size?: 'default' | 'large' | 'small',
    icon?: React.ReactNode,
    isIconSuffix?: boolean,
    loading?: boolean,
    disabled?: boolean,
    onClick?: () => void,
}

const ButtonCommon = memo(({ type = 'primary', size = 'default', loading = false, isIconSuffix = false,
    icon, disabled, children, onClick }: Props) => {
    return (
        <button className={classNames({
            [s.buttonCommon]: true,
            [s[type]]: !!type,
            [s[size]]: !!size,
            [s.loading]: loading,
            [s.preserve]: isIconSuffix,
            [s.onlyIcon]: icon && !children,
        })}
            disabled={disabled || loading}
            onClick={onClick}
        >
            <div className={s.inner}>
                {
                    icon && <span className={s.icon}>{icon}</span>
                }
                <span className={s.label}>{children}</span>
            </div>
        </button>
    )
})

export default ButtonCommon
