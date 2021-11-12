import React from 'react'
import { IconLocation, IconPeople, IconTime } from 'src/components/icons'
import s from './RecipeBriefInfo.module.scss'

interface Props {
    className?: string
    children?: any,
    time:string,
    people:string,
    country:string
}

const RecipeBriefInfo = ({time, people, country }: Props) => {
    return (
        <section className={s.recipeBriefInfo}>
            <div className={s.item}>
                <IconTime />
                <div className={s.content}>{time}</div>
            </div>
            <div className={s.item}>
                <IconPeople />
                <div className={s.content}>{people}</div>
            </div>
            <div className={s.item}>
                <IconLocation />
                <div className={s.content}>{country}</div>
            </div>
        </section >
    )
}

export default RecipeBriefInfo
