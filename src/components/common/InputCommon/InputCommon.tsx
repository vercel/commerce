import classNames from 'classnames';
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
    type?: 'text' | 'number' | 'email',
    styleType?: 'default' | 'custom',
    backgroundTransparent?: boolean,
    icon?: React.ReactNode,
    onChange?: (value: string | number) => void,
    onEnter?: (value: string | number) => void,
}

const InputCommon = forwardRef<Ref, Props>(({ value, placeholder, type, styleType = 'default', icon, backgroundTransparent = false,
    onChange, onEnter }: Props, ref) => {
    const inputElementRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputElementRef.current?.focus();
        },
        getValue: () => {
            const value = inputElementRef.current?.value || ''
            return value
        }
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e.target.value)
    }

    const handleKeyDown = (e: any) => {
        if (e.key === KEY.ENTER && onEnter) {
            console.log("on enter***")
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
                className={classNames({
                    [s.inputCommon]: true,
                    [s[styleType]]: true,
                    [s.bgTransparent]: backgroundTransparent
                })}
            />
        </div>
    )

})

export default InputCommon
