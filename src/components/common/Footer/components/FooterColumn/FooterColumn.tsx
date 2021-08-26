import Link from 'next/link';
import React from 'react';
import s from './FooterColumn.module.scss'

interface Props {
    title: string,
    items: { link: string, name: string, isOpenNewTab?: boolean }[],
}

const FooterColumn = ({ title, items }: Props) => {
    return (
        <section className={s.footerColumn}>
            <h4 className={s.title}>
                {title}
            </h4>
            <ul>
                {
                    items.map(item => <li key={item.name}>
                        {
                            item.isOpenNewTab ?
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    {item.name}
                                </a>
                                :
                                <Link href={item.link}>
                                    <a >
                                        {item.name}
                                    </a>
                                </Link>
                        }
                    </li>)
                }
            </ul>
        </section>
    );
};

export default FooterColumn;