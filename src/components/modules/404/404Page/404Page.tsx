import React from 'react'
import { Logo } from 'src/components/common'
import s from './404Page.module.scss'

interface Props {
}

const NotFoundPage = ({ }: Props) => {
    return (
       
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.logo}>
                    <Logo/>
                </div>

                <div className={s.text}>
                    <h1>
                        404
                    </h1>
                </div>
            </div>
        </div >
    )
}

export default NotFoundPage
