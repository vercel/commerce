import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { KEY } from 'src/utils/constanst.utils';
import s from './InputCommon.module.scss';

type Ref = {
    focus: () => void
} | null;

interface Props {
    children?: React.ReactNode,
    value?: string | number,
    placeholder?: string,
    type?: 'text' | 'number',
    styleType?: 'default' | 'custom',
    icon?: React.ReactNode,
    onChange?: (value: string | number) => void,
    onEnter?: (value: string | number) => void,
}

const InputCommon = forwardRef<Ref, Props>(({ value, placeholder, type, styleType = 'default', icon,
    onChange, onEnter }: Props, ref) => {
    const inputElementRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputElementRef.current?.focus();
        },
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e.target.value)
    }

    const handleKeyDown = (e: any) => {
        if (e.key === KEY.ENTER && onEnter) {
            const value = inputElementRef.current?.value || ''
            onEnter(value)
        }
    }

    return (
        <div className={s.inputWrap}>
            {
                icon && <span className={s.icon}>{icon}</span>
            }
            <input
                ref={inputElementRef}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`${s.inputCommon} ${s[styleType]}`}
            />
        </div>
    )

})

export default InputCommon
