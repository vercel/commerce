import s from './SelectOption.module.scss'
import classNames from 'classnames'

interface Props{
    onClick: (value: string) => void,
    itemName: string,
    size: 'base' | 'large',
}

const SelectOption = ({onClick, itemName, size}: Props) => {

    const changeName  = () => {
        onClick(itemName)
    }
    return(
        <div className={classNames({
            [s.selectOption] : true,
            [s[size]] : !!size,
        })}
            onClick = {changeName}
        >{itemName}</div>
    )
}

export default SelectOption