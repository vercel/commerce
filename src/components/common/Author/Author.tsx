import React from 'react';
import s from './Author.module.scss';
import classNames from 'classnames';

interface Props {
    image:string,
    name: string
}

const Author = ({image,name}:Props) =>{

    return (
        <div className={classNames(s.authorWarper)}>
            <img className={classNames(s.authorImage)}  src={image}  alt=""/>
            <div className={classNames(s.authorName)}>{name}</div>
        </div>
    )
}

export default Author;