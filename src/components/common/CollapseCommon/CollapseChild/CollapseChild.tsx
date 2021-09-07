import s from './CollapseChild.module.scss'
import { useState } from 'react'
import classNames from 'classnames'
import CollapseContent from './CollapseContent/CollapseContent'
import Link from 'next/link'

interface CollapseProps{
    title?: string,
    content: Array<string>,
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
                {
                    content.map(item => <CollapseContent key={item} content={item} />)
                }
            </div>
        </div>
    )
}

export default CollapseChild