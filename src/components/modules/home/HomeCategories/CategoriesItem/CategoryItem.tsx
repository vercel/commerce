import React from 'react';

import s from './CategoryItem.module.scss'
import classNames from 'classnames';
import Image from "next/image";
import Link from 'next/link';
import { StaticImage } from 'src/components/common';

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
                        <StaticImage src={image} />
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
