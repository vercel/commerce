import classNames from 'classnames';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import s from './MenuFilterItem.module.scss';

interface Props {
    name: string,
    value: string,
    type: string,
    isActive?: boolean
    onChange: (value: string, isSellect: boolean) => void
}

const MenuFilterItem = ({ name, value, type, isActive, onChange }: Props) => {
    const router = useRouter()
    const [isSelected, setIsSelected] = useState<boolean>()

    useEffect(() => {
        setIsSelected(isActive)
    }, [isActive])

    useEffect(() => {
        const rs = (router.query[type] || []).includes(value)
        setIsSelected(rs)
    }, [type, router.query, value])

    function handleClick() {
        onChange(value, !isSelected)
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
