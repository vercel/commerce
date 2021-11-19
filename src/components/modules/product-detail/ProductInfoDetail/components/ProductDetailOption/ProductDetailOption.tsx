import { ProductOption, ProductOptionValues } from '@commerce/types/product'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { SelectedOptions } from 'src/utils/types.utils'
import s from './ProductDetailOption.module.scss'
interface Props {
  option: ProductOption
  onChane: (values: SelectedOptions) => void
  defaultOption:SelectedOptions
}

const ProductDetailOption = ({ option, onChane, defaultOption }: Props) => {
  const [selected, setSelected] = useState<string>("")
  useEffect(() => {
    if (option) {
      let defaultSelected =defaultOption[option.displayName]
      if(defaultSelected){
        setSelected(defaultSelected)
      }
    }
  }, [option, defaultOption])
  const handleClick = (value:string) => {
		setSelected(value)
    onChane && onChane({[option.displayName]:value})
  }
  return (
    <div className={s.warpper}>
      <div className={s.name}>{option.displayName}:</div>
      <div className={s.option}>
        {option.values.map((value) => {
          return <ProductDetailOptionButton value={value} selected={selected} onClick={handleClick} key={value.label}/>
        })}
      </div>
    </div>
  )
}
interface ProductDetailOptionButtonProps {
  value: ProductOptionValues
  selected: string
  onClick: (value: string) => void
}
const ProductDetailOptionButton = ({
  value,
  selected,
  onClick,
}: ProductDetailOptionButtonProps) => {
  const handleClick = () => {
    onClick && onClick(value.label)
  }
  return (
    <div className={s.button}>
    <div onClick={handleClick} className={classNames({ [s.active]: selected === value.label })}>
      {value.label}
    </div>
</div>
  )
}

export default ProductDetailOption
