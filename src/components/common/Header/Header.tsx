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
        </div>
    )
}

export default Header
