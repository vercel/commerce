import React from 'react';

import s from './RecipesItem.module.scss'
import classNames from 'classnames';
import Image from "next/image";
import Link from 'next/link';

interface RecipesItem {
    image:StaticImageData,
    name: string,
    description:string,
    link: string
}

const RecipesItem = ({ image, name,description, link }: RecipesItem) => {
    return (
        <div className={classNames(s.recipesItem)}>
            <div className={classNames(s.recipesItemImage)}>
                <Link href={link}>
                    <a>
                        <Image src={image} />
                    </a>
                </Link>
            </div>
            <Link href={link}>
                <a className={classNames(s.recipesItemText)}>
                    <div className={classNames(s.recipesItemName)}>{name}</div>
                    <div className={classNames(s.recipesItemDescription)}>{description}</div>
                </a>
            </Link>
        </div >
    )
}

export default RecipesItem
