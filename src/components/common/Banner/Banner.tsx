import React, { memo } from 'react'
import { ResponsiveType } from 'react-multi-carousel'
import CarouselCommon from '../CarouselCommon/CarouselCommon'
import BannerItem, { BannerItemProps } from './BannerItem/BannerItem'
import s from './Banner.module.scss'

interface Props {
    data: BannerItemProps[],
}

const RESPONSIVE:ResponsiveType = {
    desktop: {
      breakpoint: { max: 9999, min: 0 },
      items: 1,
      slidesToSlide:1
    },
};

const Banner = memo(({ data }: Props) => {
    if (data.length === 1) {
        const item = data[0]
        return <BannerItem
            title={item.title}
            imgLink={item.imgLink}
            subtitle={item.subtitle}
            buttonLabel={item.buttonLabel}
            linkButton={item.linkButton}
            size={item.size}
        />
    }
    return (
        <div className={s.bannerWrap}>
            <CarouselCommon<BannerItemProps>
                data={data}
                itemKey="banner"
                Component={BannerItem}
                responsive={RESPONSIVE}
                showDots={true}
                infinite={true}
            />
        </div>
    )
})

Banner.displayName = 'Banner'
export default Banner
