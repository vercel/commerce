import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import s from './MenuDropdown.module.scss';

interface Props {
    children?: React.ReactNode,
    options: { link: string, name: string }[],
    isHasArrow?: boolean,
}

const MenuDropdown = ({ options, children, isHasArrow = true }: Props) => {
    return (
        <div className={classNames({
            [s.menuDropdown]: true,
            [s.arrow]: isHasArrow,
        })}>
            <span className={s.label}>
                {children}
            </span>
            <section className={s.menu}>
                <ul className={s.menuIner}>
                    {
                        options.map(item => <li key={item.name}>
                            <Link href={item.link}>
                                <a >
                                    {item.name}
                                </a>
                            </Link>
                        </li>)
                    }
                </ul>
            </section>
        </div>
    );
};

export default MenuDropdown;