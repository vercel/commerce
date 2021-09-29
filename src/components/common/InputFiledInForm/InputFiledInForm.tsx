import classNames from 'classnames'
import { Field } from 'formik'
import React, { useMemo, useRef } from 'react'
import { IconCheck, IconError } from 'src/components/icons'
import { KEY } from 'src/utils/constanst.utils'
import s from './InputFiledInForm.module.scss'

interface Props {
  placeholder?: string
  type?: 'text' | 'number' | 'email' | 'password'
  styleType?: 'default' | 'custom'
  backgroundTransparent?: boolean
  icon?: React.ReactNode
  isIconSuffix?: boolean
  isShowIconSuccess?: boolean
  name: string
  error?: string
  onChange?: (value: string | number) => void
  onChangeEvent?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: any) => void
  onEnter?: (value: string | number) => void
}

const InputFiledInForm = ({
  name,
  placeholder,
  type,
  styleType = 'default',
  icon,
  backgroundTransparent = false,
  isIconSuffix = true,
  isShowIconSuccess,
  error,
  onEnter,
}: Props) => {
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
        <Field
          name={name}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          type={type}
        />
      </div>
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  )
}

InputFiledInForm.displayName = 'InputFiledInForm'
export default InputFiledInForm
