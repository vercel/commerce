import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { StaticImage } from 'src/components/common';
import s from './CategoryItem.module.scss';


interface CategoryItem {
    image: StaticImageData,
    name: string,
    link: string
}

const CategoryItem = ({ image, name, link }: CategoryItem) => {
    return (
        <div className={classNames(s.categoryItem)}>
            <div className={classNames(s.categoryItemImage)}>
                <Link href={link}>
                    <a>
                        <StaticImage src={image} alt={name}/>
                    </a>
                </Link>
            </div>
            <Link href={link}>
                <a>
                    <div className={classNames(s.categoryItemText)}>{name}</div>
                </a>
            </Link>
        </div >
    )
}

export default CategoryItem
