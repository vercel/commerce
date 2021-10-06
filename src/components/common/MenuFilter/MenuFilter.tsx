import classNames from 'classnames'
import { useEffect, useState } from 'react';

import s from './MenuFilter.module.scss'
import MenuFilterItem from './MenuFilterItem/MenuFilterItem';
interface Props {
    children?: any,
    heading?: string,
    categories: { name: string, slug?: string, code?: string }[],
    type: string,
    onChangeValue?: (value: Object) => void
}

const MenuFilter = ({ heading, categories, type, onChangeValue }: Props) => {
    function handleClick(value: string) {

    }

    return (
        <section className={s.menuFilterWrapper}>
            <h2 className={s.menuFilterHeading}>{heading}</h2>
            <ul className={s.menuFilterList}>
                {
                    categories.map(item => <MenuFilterItem
                        key={item.slug || item.code}
                        name={item.name}
                        value={item.slug || item.code || ''}
                        onClick={handleClick}
                    />)
                }
            </ul>
        </section>
    )
}

export default MenuFilter
