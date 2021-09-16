import React, { memo } from 'react'
import { IconBuy } from 'src/components/icons'
import ButtonCommon from '../ButtonCommon/ButtonCommon'

interface Props {
    type?: 'primary' | 'light' | 'ghost',
    size?: 'default' | 'large' | 'small',
    loading?: boolean,
    disabled?: boolean,
    onClick?: () => void,
}

const ButtonIconBuy = memo(({ type = 'light', size = 'small', loading = false, disabled, onClick }: Props) => {
    return (
        <ButtonCommon
            type={type}
            size={size}
            loading={loading}
            disabled={disabled}
            onClick={onClick}
            icon={<IconBuy />}
        />
    )
})

export default ButtonIconBuy
