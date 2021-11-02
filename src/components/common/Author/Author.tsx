import classNames from 'classnames';
import React from 'react';
import ImgWithLink from "../ImgWithLink/ImgWithLink";
import s from './Author.module.scss';

interface Props {
    image:string,
    name: string
}

const Author = ({image,name}:Props) =>{

    return (
        <div className={classNames(s.authorWarper)}>
            <div className={classNames(s.authorImage)}  >
                <ImgWithLink src={image} alt="author" />
            </div>
            <div className={classNames(s.authorName)}>{name}</div>
        </div>
    )
}

export default Author;