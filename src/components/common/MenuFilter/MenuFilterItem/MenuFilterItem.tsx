import classNames from 'classnames';
import { useState } from 'react';
import s from './MenuFilterItem.module.scss';

interface Props {
    name: string,
    value: string,
    onClick: (value: string) => void
}

const MenuFilterItem = ({ name, value, onClick }: Props) => {
    const [isSelected, setIsSelected] = useState(false)

    function handleClick() {
        // todo
        setIsSelected(!isSelected)
    }

    return (
        <li className={s.menuFilterItem}>
            <div onClick={handleClick} className={classNames({ [s.active]: isSelected })}>
                {name}
            </div>
        </li>
    )
}

export default MenuFilterItem
