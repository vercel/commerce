import React from 'react';

import s from './CategoryItem.module.scss'
import classNames from 'classnames';
import Image from "next/image";
import Link from 'next/link';

interface CategoryItem {
    image: string,
    name: string,
    link: string
}

const CategoryItem = ({image,name,link}:CategoryItem) => {
    return (
        <div className={classNames(s.categoryItem)}>
            <div className={classNames(s.categoryItemImage)}> 
                <Link href="#">
                    <Image src={image}  />
                </Link>
            </div>
            <Link href="#">
                <div className={classNames(s.categoryItemText)}>{name}</div>
            </Link>
        </div>
    )
}

export default CategoryItem
