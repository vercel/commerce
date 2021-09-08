import React from 'react'
import { IconLocation, IconPeople, IconTime } from 'src/components/icons'
import s from './RecipeBriefInfo.module.scss'

interface Props {
    className?: string
    children?: any,
}

const RecipeBriefInfo = ({ }: Props) => {
    return (
        <section className={s.recipeBriefInfo}>
            <div className={s.item}>
                <IconTime />
                <div className={s.content}>15 minutes</div>
            </div>
            <div className={s.item}>
                <IconPeople />
                <div className={s.content}>4 People</div>
            </div>
            <div className={s.item}>
                <IconLocation />
                <div className={s.content}>15 minutes</div>
            </div>
        </section >
    )
}

export default RecipeBriefInfo
