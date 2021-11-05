import classNames from 'classnames';
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

const RESPONSIVE: ResponsiveType = {
  xxl: {
    breakpoint: { max: 9999, min: 1440 },
    items: 4.5,
    slidesToSlide: 4.5
  },
  lg: {
    breakpoint: { max: 1440, min: 1280 },
    items: 3.5,
    slidesToSlide: 3.5
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 2.5,
    slidesToSlide: 2.5
  },
  lap: {
    breakpoint: { max: 1024, min: 1008 },
    items: 3.5,
    slidesToSlide: 2.5
  },
  tablet: {
    breakpoint: { max: 1008, min: 640 },
    items: 3,
    slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
    slidesToSlide: 2
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
          draggable={true} infinite={true}
          itemKey={title}
          responsive={RESPONSIVE}
        />
      </div>
    </div>
  );
};

export default ListProductWithInfo;