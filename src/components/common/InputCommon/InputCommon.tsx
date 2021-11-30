import classNames from 'classnames'
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { IconCheck, IconError } from 'src/components/icons'
import { KEY } from 'src/utils/constanst.utils'
import s from './InputCommon.module.scss'

type Ref = {
  focus: () => void
  getValue: () => string | number
} | null
interface Props {
  children?: React.ReactNode
  value?: string | number
  placeholder?: string
  type?: 'text' | 'number' | 'email' | 'password'
  styleType?: 'default' | 'custom'
  backgroundTransparent?: boolean
  icon?: React.ReactNode
  isIconSuffix?: boolean
  isShowIconSuccess?: boolean
  error?: string
  onChange?: (value: string | number) => void
  onChangeEvent?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: any) => void
  onEnter?: (value: string | number) => void
}

const InputCommon = forwardRef<Ref, Props>(
  (
    {
      value,
      placeholder,
      type,
      styleType = 'default',
      icon,
      backgroundTransparent = false,
      isIconSuffix,
      isShowIconSuccess,
      error,
      onChange,
      onChangeEvent,
      onEnter,
      onBlur,
    }: Props,
    ref
  ) => {
    const inputElementRef = useRef<HTMLInputElement>(null)

    const iconElement = useMemo(() => {
      if (error) {
        return (
          <span className={s.icon}>
            <IconError />{' '}
          </span>
        )
      } else if (isShowIconSuccess) {
        return (
          <span className={s.icon}>
            <IconCheck />{' '}
          </span>
        )
      } else if (icon) {
        return <span className={s.icon}>{icon} </span>
      }
      return <></>
    }, [icon, error, isShowIconSuccess])

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputElementRef.current?.focus()
      },
      getValue: () => {
        const value = inputElementRef.current?.value || ''
        return value
      },
      setValue: (value: string) => {
        if (inputElementRef.current) {
          inputElementRef.current.value = value
        }
        return value
      },
    }))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChangeEvent) {
        onChangeEvent(e)
      } else {
        onChange && onChange(e.target.value)
      }
    }

    const handleKeyDown = (e: any) => {
      if (e.key === KEY.ENTER && onEnter) {
        const value = inputElementRef.current?.value || ''
        onEnter(value)
      }
    }

    return (
      <div
        className={classNames({
          [s.inputWrap]: true,
          [s[styleType]]: true,
          [s.bgTransparent]: backgroundTransparent,
        })}
      >
        <div
          className={classNames({
            [s.inputInner]: true,
            [s.preserve]: isIconSuffix,
            [s.success]: isShowIconSuccess,
            [s.error]: !!error,
          })}
        >
          {iconElement}
          <input
            ref={inputElementRef}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={onBlur}
          />
        </div>
        {error && <div className={s.errorMessage}>{error}</div>}
      </div>
    )
  }
)

InputCommon.displayName = 'InputCommon'
export default InputCommon
