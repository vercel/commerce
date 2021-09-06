import React, { memo } from 'react'
import CarouselCommon from '../CarouselCommon/CarouselCommon'
import BannerItem, { BannerItemProps } from './BannerItem/BannerItem'

interface Props {
    data: BannerItemProps[],
}

const option = {
    slidesPerView: 1,
    breakpoints: {}
}
const Banner = memo(({ data }: Props) => {
    return (
        <CarouselCommon<BannerItemProps>
            data={data}
            itemKey="banner"
            Component={BannerItem}
            option={option}
            isDot = {true}
        />
    )
})

export default Banner
