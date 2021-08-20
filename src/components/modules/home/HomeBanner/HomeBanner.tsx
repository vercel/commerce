import { FC } from 'react'
import s from './HomeBanner.module.css'

interface Props {
    className?: string
    children?: any
}

const HomeBanner: FC<Props> = ({ }) => {
    return (
        <div className={s.homeBanner}>This is HomeBanner</div>
    )
}

export default HomeBanner
