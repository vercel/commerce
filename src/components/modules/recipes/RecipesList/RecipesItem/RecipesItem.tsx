import Link from 'next/link';
import React from 'react';
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
                        <img src={image} />
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
