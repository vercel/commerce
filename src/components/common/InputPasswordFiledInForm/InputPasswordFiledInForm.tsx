import React, { useState } from 'react'
import { IconPassword, IconPasswordCross } from 'src/components/icons'
import InputFiledInForm from '../InputFiledInForm/InputFiledInForm'
import s from './InputPasswordFiledInForm.module.scss'

interface Props {
  name?: string
  placeholder?: string
  styleType?: 'default' | 'custom'
  error?: string
  onChange?: (value: string | number) => void
  onEnter?: (value: string | number) => void
}

const InputPasswordFiledInForm = ({
  name = 'password',
  placeholder,
  styleType = 'default',
  error,
  onChange,
  onEnter,
}: Props) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const toggleShowPassword = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsShowPassword(!isShowPassword)
  }

  return (
    <InputFiledInForm
      name={name}
      type={isShowPassword ? 'text' : 'password'}
      styleType={styleType}
      error={error}
      placeholder={placeholder}
      icon={
        <button className={s.iconPassword} onClick={toggleShowPassword}>
          {isShowPassword ? <IconPassword /> : <IconPasswordCross />}
        </button>
      }
      isIconSuffix={true}
      onChange={onChange}
      onEnter={onEnter}
    />
  )
}

export default InputPasswordFiledInForm
