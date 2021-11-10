import classNames from 'classnames'
import Link from 'next/link'
import React, { memo } from 'react'
import { IconArrowRight } from 'src/components/icons'
import { ROUTE } from 'src/utils/constanst.utils'
import { LANGUAGE } from 'src/utils/language.utils'
import ButtonCommon from '../../ButtonCommon/ButtonCommon'
import s from './BannerItem.module.scss'

export interface BannerItemProps {
    imgLink: string,
    title: string,
    subtitle?: string,
    buttonLabel?: string,
    linkButton?: string,
    size?: 'small' | 'large',
}

const BannerItem = memo(({ imgLink, title, subtitle, buttonLabel = LANGUAGE.BUTTON_LABEL.SHOP_NOW, linkButton = ROUTE.HOME, size = 'large' }: BannerItemProps) => {
    console.log(imgLink.split("\\"));
    return (
        <div className={classNames({
            [s.bannerItem]: true,
            [s[size]]: true,
        })}>
            <div className={s.inner} style={{ backgroundImage: `url(${imgLink.split('\\').join("/")})`}}>
                <div className={s.content}>
                    <div className={s.top}>
                        <h1 className={s.heading}>
                            {title}
                        </h1>
                        <div className={s.subHeading}>
                            {subtitle}
                        </div>
                    </div>
                    <div className={s.bottom}>
                        <Link href={linkButton}>
                            <a>
                                <ButtonCommon icon={<IconArrowRight />} isIconSuffix={true}>{buttonLabel}</ButtonCommon>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
})

BannerItem.displayName = 'BannerItem'
export default BannerItem
