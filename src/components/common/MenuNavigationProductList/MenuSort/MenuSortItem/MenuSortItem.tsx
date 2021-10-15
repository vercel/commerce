import classNames from 'classnames';
import s from './MenuSortItem.module.scss';

interface Props {
    name: string,
    value: string,
    currentValue?: string,
    onChange: (value: string) => void
}

const MenuSortItem = ({ onChange, name, value, currentValue }: Props) => {
    const handleChange = () => {
        onChange(value)
    }
    return (
        <li className={s.menuSortItem}>
            <div onClick={handleChange} className={classNames({ [s.active]: value === currentValue })}>
                {name}
            </div>
        </li>
    )
}

export default MenuSortItem
