import s from './CollapseChild.module.scss'
import { useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

interface CollapseProps{
    title?: string,
    content: string,
    isToggle?: boolean,
    link?: string,
}
const CollapseChild = ({title, content, isToggle=false, link="/"}: CollapseProps) => {
    const [isActive, changeActive] = useState(isToggle)

    const handleToggle = () => {
        changeActive(!isActive)
    }
    return(
        <div className={classNames({
            [s.collapseWrapper] : true,
            [s.isActive] : isActive 
        })}
            onClick = { handleToggle }
        >    
            <div className={s.title}>
                <Link href={link}>
                    <a>{title}</a>
                </Link>
                <div className={s.toggle}></div>
            </div>
            <div className={s.contentContainer}>
                {content}
            </div>
        </div>
    )
}

export default CollapseChild