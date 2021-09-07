import React from 'react';
import { IconInfo } from 'src/components/icons';
import ImgWithLink from '../../ImgWithLink/ImgWithLink';
import s from './ProductNotSell.module.scss';

export interface Props {
    name: string,
    imageSrc: string,
}

const ProductNotSell = ({ name, imageSrc }: Props) => {
    return (
        <>
            <div className={s.imgWrap}>
                <ImgWithLink src={imageSrc} alt={name} />
            </div>
            <div className={s.name}>{name}</div>
            <div className={s.info}>
                <IconInfo />
                <div className={s.text}>
                    Not Sell
                </div>
            </div>
        </>
    );
};

export default ProductNotSell;