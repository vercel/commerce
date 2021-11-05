import s from './SelectOption.module.scss'
import classNames from 'classnames'

interface Props{
    onChange: (value: string) => void,
    itemName: string,
    size: 'base' | 'large',
    value?: string,
    selected?: boolean,
}

const SelectOption = ({onChange, itemName, size, value, selected} : Props) => {
    const handleChange = () => {
        onChange(value ?? "")
    }
    return(
        <div className={classNames({
            [s.selectOption] : true,
            [s[size]] : !!size,
            [s.isChoose] : selected ,
        })}
            onClick = {handleChange}
        >{itemName}</div>
    )
}

export default SelectOption