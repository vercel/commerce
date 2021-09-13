import Link from 'next/link';
import React from 'react';
import { ImgWithLink } from 'src/components/common';
import s from './RecipesItem.module.scss';
interface RecipesItem {
    image:string,
    name: string,
    description:string,
    link: string
}

const RecipesItem = ({ image, name,description, link }: RecipesItem) => {
    return (
        <div className={s.recipesItem}>
            <div className={s.recipesItemImage}>
                <Link href={link}>
                    <a>
                        <ImgWithLink src={image} alt="author" />
                    </a>
                </Link>
            </div>
            <Link href={link}>
                <a className={s.recipesItemText}>
                    <div className={s.recipesItemName}>{name}</div>
                    <div className={s.recipesItemDescription}>{description}</div>
                </a>
            </Link>
        </div >
    )
}

export default RecipesItem
