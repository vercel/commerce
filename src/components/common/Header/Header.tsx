import { FC } from 'react'
import s from './Header.module.scss'

interface Props {
    className?: string
    children?: any
}

const Header: FC<Props> = ({ }:Props ) => {
    return (
        <div className={s.header}>
            This is Header
            <button className={s.btnBlue}>
                Button
            </button>
            <div className={s.link}>
                Test link style
            </div>
        </div>
    )
}

export default Header
