import React, { memo } from 'react'
import CarouselCommon from '../CarouselCommon/CarouselCommon'
import BannerItem, { BannerItemProps } from './BannerItem/BannerItem'

interface Props {
    data: BannerItemProps[],
}

const option = {
    slidesPerView: 1,
}
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
        <CarouselCommon<BannerItemProps>
            data={data}
            itemKey="banner"
            Component={BannerItem}
            option={option}
            isDot={true}
        />
    )
})

export default Banner
