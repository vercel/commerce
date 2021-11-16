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
    backgroundColor?: string,
}

const BannerItem = memo(({ backgroundColor, imgLink, title, subtitle, buttonLabel = LANGUAGE.BUTTON_LABEL.SHOP_NOW, linkButton = ROUTE.HOME, size = 'large' }: BannerItemProps) => {

    return (
        <div className={classNames({
            [s.bannerItem]: true,
            [s[size]]: true,
        })}>
            <div className={s.inner} style={{ backgroundImage: `url(${imgLink.split('\\').join("/")})` }}>
                <div className={s.content} style={{ backgroundImage: `linear-gradient(to right, ${backgroundColor} 63%, rgb(227, 242, 233, 0))` }}>
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
