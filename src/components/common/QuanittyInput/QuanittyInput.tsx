import React, { ChangeEvent, useEffect, useState } from 'react'
import s from './QuanittyInput.module.scss'
import classNames from 'classnames'
import { Minus, Plus } from '@components/icons'
interface QuanittyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'min' | 'max' | 'step' | "type" | "size"
  > {
  size?: 'default' | 'small'
  onChange?: (value: number) => void
  initValue?: number
  min?: number
  max?: number
  step?: number
}

const QuanittyInput = ({
  size = 'default',
  onChange,
  initValue = 0,
  min,
  max,
  step = 1,
  ...props
}: QuanittyInputProps) => {
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    onChange && onChange(value)
  }, [value])

  useEffect(() => {
    initValue && setValue(initValue)
  }, [initValue])

  const onPlusClick = () => {
    if (max && value + step > max) {
      setValue(max)
    } else {
      setValue(value + step)
    }
  }

  const onMinusClick = () => {
    if (min && value - step < min) {
      setValue(min)
    } else {
      setValue(value - step)
    }
  }

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value) || 0
    if (min && value < min) {
      setValue(min)
    } else if (max && value > max) {
      setValue(max)
    } else {
      setValue(value)
    }
  }

  return (
    <div className={classNames(s.quanittyInputWarper, { [s[size]]: size })}>
      <div className={s.minusIcon} onClick={onMinusClick}>
        <Minus />
      </div>
      <input
        {...props}
        type="number"
        value={value}
        onChange={onValueChange}
        className={s.quanittyInput}
      />
      <div className={s.plusIcon} onClick={onPlusClick}>
        <Plus />
      </div>
    </div>
  )
}

export default QuanittyInput
