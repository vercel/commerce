import { FC, useRef, useEffect } from 'react'
import s from './ButtonCommon.module.css'

interface Props {
    className?: string
    children?: any
}

const ButtonCommon: FC<Props> = ({ }) => {
    return (
        <div className={s.buttonCommon}>This is button common</div>
    )
}

export default ButtonCommon
