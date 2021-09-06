import s from './SelectOption.module.scss'
import classNames from 'classnames'
import { useState } from 'react'

interface Props{
    onClick: (name: string, value: string) => void,
    itemName: string,
    size: 'base' | 'large',
    value: string,
    selected?: boolean,
}

const SelectOption = ({onClick, itemName, size, value, selected} : Props) => {
    const changeName  = () => {
        onClick(itemName, value)
    }
    return(
        <div className={classNames({
            [s.selectOption] : true,
            [s[size]] : !!size,
            [s.isChoose] : selected ,
        })}
            onClick = {changeName}
        >{itemName}</div>
    )
}

export default SelectOption