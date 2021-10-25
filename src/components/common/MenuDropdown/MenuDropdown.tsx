import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import s from './MenuDropdown.module.scss';
import { QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
interface Props {
    children?: React.ReactNode,
    options: { slug?: string, name: string, onClick?: () => void }[],
    isHasArrow?: boolean,
    align?: 'left'
}

const MenuDropdown = ({ options, children, isHasArrow = true, align }: Props) => {
    return (
        <div className={classNames({
            [s.menuDropdown]: true,
            [s.arrow]: isHasArrow,
        })}>
            <button className={s.label}>
                {children}
            </button>
            <section className={classNames({
                [s.menu]: true,
                [s.left]: align === 'left',
            })} >
                <ul className={s.menuIner}>
                    {
                        options.map(item => <li key={item.name}>
                            {item.onClick ?
                                <button onClick={item.onClick}>
                                    {item.name}
                                </button>
                                :
                                <Link href={`${ROUTE.PRODUCTS}?${QUERY_KEY.CATEGORY}=${item.slug}` || ''}>
                                    <a >
                                        {item.name}
                                    </a>
                                </Link>}
                        </li>)
                    }
                </ul>
            </section>
        </div>
    );
};

export default MenuDropdown;