import { FC } from 'react'
import s from './Header.module.scss'

interface Props {
    className?: string
    children?: any
}

const Header: FC<Props> = ({ }: Props) => {
    return (
        <div className={s.header}>
            This is Header
            <h1 className={s.heading}>This is heading</h1>
            <div className={s.logo}>This is logo text</div>
        </div>
    )
}

export default Header
