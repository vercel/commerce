import classNames from 'classnames';
import { TOptionsEvents } from 'keen-slider';
import React from 'react';
import { ResponsiveType } from 'react-multi-carousel';
import CarouselCommon from '../CarouselCommon/CarouselCommon';
import ProductCard, { ProductCardProps } from '../ProductCard/ProductCard';
import InfoProducts from './InfoProducts/InfoProducts';
import s from './ListProductWithInfo.module.scss';

interface Props {
    data: ProductCardProps[],
    title: string,
    subtitle?: string,
    hasBorderBottomMobile?: boolean,
}
const OPTION_DEFAULT: TOptionsEvents = {
    slidesPerView: 2,
    mode: 'free',
    breakpoints: {
        '(min-width: 640px)': {
            slidesPerView: 3,
        },
        '(min-width: 768px)': {
            slidesPerView: 3,
        },
        '(min-width: 1008px)': {
            slidesPerView: 3.5,
        },
        '(min-width: 1024px)': {
            slidesPerView: 2.5,
        },
        '(min-width: 1280px)': {
            slidesPerView: 3.5,
        },
        '(min-width: 1440px)': {
            slidesPerView: 4.5,
        },
    },
}
const RESPONSIVE:ResponsiveType = {
    xxl: {
        breakpoint: { max: 9999, min: 1440 },
        items: 4.5,
        slidesToSlide: 1 // optional, default to 1.
      },
    lg: {
        breakpoint: { max: 1440, min: 1280 },
        items: 3.5,
        slidesToSlide: 1 // optional, default to 1.
      },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 2.5,
      slidesToSlide: 1 // optional, default to 1.
    },
    lap: {
        breakpoint: { max: 1024, min: 1008 },
        items: 3.5,
      },
    tablet: {
      breakpoint: { max: 1008, min: 640 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    }
  };
const ListProductWithInfo = ({ data, title, subtitle, hasBorderBottomMobile }: Props) => {
    return (
        <div className={classNames({
            [s.listProductWithInfo]: true,
            [s.borderBottom]: hasBorderBottomMobile,
        })}>
            <InfoProducts
                title={title}
                subtitle={subtitle}
            />
            <div className={s.productsWrap}>
                <CarouselCommon<ProductCardProps>
                    data={data}
                    Component={ProductCard}
                    // draggable={true} infinite={true}
                    itemKey={title}
                    responsive={RESPONSIVE}
                />
            </div>
        </div>
    );
};

export default ListProductWithInfo;