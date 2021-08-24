import React, { forwardRef, RefObject, useImperativeHandle, useRef } from 'react';
import { InputType, KEY } from 'src/utils/constanst.utils';
import s from './InputCommon.module.scss'

type Ref = {
    focus: () => void
} | null;

interface Props {
    children?: React.ReactNode,
    value?: string | number,
    placeholder?: string,
    type?: InputType,
    onChange?: (value: string | number) => void,
    onEnter?: (value: string | number) => void,
}


const InputCommon = forwardRef<Ref, Props>(({ value, placeholder, type, onChange, onEnter }: Props, ref) => {
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
        <input
            ref={inputElementRef}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={s.inputCommon}
        />
    )

})

export default InputCommon
