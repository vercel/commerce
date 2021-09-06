import React from 'react';
import { ROUTE } from 'src/utils/constanst.utils';
import HeadingCommon from '../../HeadingCommon/HeadingCommon';
import ViewAllItem from '../../ViewAllItem/ViewAllItem';
import s from './InfoProducts.module.scss'
interface Props {
    title: string,
    subtitle?: string,
}

const InfoProducts = ({ title, subtitle }: Props) => {
    return (
        <div className={s.infoProducts}>
            <div className={s.top}>
                <HeadingCommon>{title}</HeadingCommon>
                <div className={s.sub}>
                    {subtitle}
                </div>
            </div>
            <ViewAllItem link={ROUTE.PRODUCTS} />

        </div>
    );
};

export default InfoProducts;