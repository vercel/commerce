import classNames from 'classnames'
import Link from 'next/link'
import React, { memo } from 'react'
import { IconArrowRight } from 'src/components/icons'
import { ROUTE } from 'src/utils/constanst.utils'
import { LANGUAGE } from 'src/utils/language.utils'
import ButtonCommon from '../ButtonCommon/ButtonCommon'
import s from './Banner.module.scss'

interface Props {
    imgLink: string,
    title: string,
    subtitle: string,
    buttonLabel?: string,
    linkButton?: string,
    size?: 'small' | 'large',
}

const Banner = memo(({ imgLink, title, subtitle, buttonLabel = LANGUAGE.BUTTON_LABEL.SHOP_NOW, linkButton = ROUTE.HOME, size = 'large' }: Props) => {
    return (
        <div className={classNames({
            [s.banner]: true,
            [s.size]: true,
        })}>
            <div className={s.inner} style={{ backgroundImage: `url(${imgLink})` }}>
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

export default Banner
