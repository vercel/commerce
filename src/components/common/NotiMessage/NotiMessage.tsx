import React from 'react'
import s from './NotiMessage.module.scss'

interface Props {
    children?: React.ReactNode
}

const NotiMessage = ({ children }: Props) => {
    return (
        <div className={s.notiMessage}>
            {children}
        </div>
    )
}

export default NotiMessage