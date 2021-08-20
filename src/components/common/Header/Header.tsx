import { FC, useRef, useEffect } from 'react'
import s from './Header.module.css'

interface Props {
    className?: string
    children?: any
}

const Header: FC<Props> = ({ }) => {
    return (
        <div className={s.header}>This is Header</div>
    )
}

export default Header
