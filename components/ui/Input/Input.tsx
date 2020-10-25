import cn from 'classnames'
import s from './Input.module.css'
import React, { InputHTMLAttributes } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  onChange?: (...args: any[]) => any
}

const Input: React.FC<Props> = (props) => {
  const { className, children, onChange, ...rest } = props

  const rootClassName = cn(s.root, {}, className)

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }

  return <input className={rootClassName} onChange={handleOnChange} {...rest} />
}

export default Input
