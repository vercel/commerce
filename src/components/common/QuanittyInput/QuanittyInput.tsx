import React, { ChangeEvent, useEffect, useState } from 'react'
import s from './QuanittyInput.module.scss'
import classNames from 'classnames'
import { IconMinus, IconPlus } from '../../icons'
interface QuanittyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'min' | 'max' | 'step' | 'type' | 'size'
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
    initValue && setValue(initValue)
  }, [initValue])

  const onPlusClick = () => {
    if (typeof max === 'number') {
      if (value + step > max) {
        setValue(max)
        onChange && onChange(max)
      } else {
        setValue(value + step)
        onChange && onChange(value + step)
      }
    } else {
      setValue(value + step)
      onChange && onChange(value + step)
    }
  }

  const onMinusClick = () => {
    if (typeof min === 'number') {
      if (value - step < min) {
        setValue(min)
        onChange && onChange(min)
      } else {
        setValue(value - step)
        onChange && onChange(value - step)
      }
    } else {
      setValue(value - step)
      onChange && onChange(value - step)
    }
  }

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value) || 0
    if (typeof min === 'number' && value < min) {
      setValue(min)
      onChange && onChange(min)
    } else if (typeof max === 'number' && value > max) {
      setValue(max)
      onChange && onChange(max)
    } else {
      setValue(value)
      onChange && onChange(value)
    }
  }

  return (
    <div className={classNames(s.quanittyInputWarper, { [s[size]]: size })}>
      <div className={s.inner}>
        <div className={s.minusIcon} onClick={onMinusClick}>
          <IconMinus />
        </div>
        <input
          {...props}
          type="number"
          value={value}
          onChange={onValueChange}
          className={s.quanittyInput}
        />
        <div className={s.plusIcon} onClick={onPlusClick}>
          <IconPlus />
        </div>
      </div>
    </div>
  )
}

export default QuanittyInput
