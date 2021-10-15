import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { PRODUCT_SORT_OPTION_VALUE, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
import s from './MenuSort.module.scss';
import MenuSortItem from './MenuSortItem/MenuSortItem';

interface Props {
    children?: any,
    heading: string,
    options: {name: string, value: string}[]
    value?: string,
    onChange: (value: string) => void
}

const MenuSort = ({ heading, value, onChange, options }: Props) => {
    return (
        <section className={classNames(s.menuSortWrapper)}>
            <h2 className={classNames(s.menuSortHeading)}>{heading}</h2>
            <ul className={s.menuSortList}>
                {
                    options.map(item => <MenuSortItem
                        key={item.value}
                        name={item.name}
                        value={item.value}
                        currentValue={value}
                        onChange={onChange}
                    />)
                }
            </ul>
        </section>
    )
}

export default MenuSort
