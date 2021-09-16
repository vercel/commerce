import classNames from 'classnames';
import React from 'react';
import s from './HomeRecipeTab.module.scss'

interface Props {
    activeValue: string
    name: string
    value: string
    onClick: (value: string) => void
}


const HomeRecipeTab = ({ activeValue, name, value, onClick }: Props) => {
    const handleClick = () => {
        onClick(value)
    }

    return (
        <button onClick={handleClick} className={classNames(s.tab, {
            [s.active]: activeValue === value
        })}>{name}</button>

    );
};

export default HomeRecipeTab;