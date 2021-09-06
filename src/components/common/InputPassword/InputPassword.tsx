import React, { useState } from 'react';
import { IconPassword, IconPasswordCross } from 'src/components/icons';
import { Inputcommon } from '..';
import s from './InputPassword.module.scss';

interface Props {
    children?: React.ReactNode,
    value?: string | number,
    placeholder?: string,
    styleType?: 'default' | 'custom',
    error?: string,
    onChange?: (value: string | number) => void,
    onEnter?: (value: string | number) => void,
}

const InputPassword = ({ value, placeholder, styleType = 'default', error,
    onChange, onEnter }: Props) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    return (
        <Inputcommon
            value={value}
            type={isShowPassword ? 'text' : 'password'}
            styleType={styleType}
            error={error}
            placeholder={placeholder}
            icon={<button className={s.iconPassword} onClick={toggleShowPassword}>
                {isShowPassword ? <IconPassword /> : <IconPasswordCross />}
            </button>}
            isIconSuffix={true}
            onChange={onChange}
            onEnter={onEnter}
        />
    )
}

export default InputPassword
