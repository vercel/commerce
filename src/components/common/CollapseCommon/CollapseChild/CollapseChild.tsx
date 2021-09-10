import s from './CollapseChild.module.scss'
import { useState } from 'react'
import classNames from 'classnames'

interface CollapseProps{
    title?: string,
    content: string,
    isToggle?: boolean,
}
const CollapseChild = ({title, content, isToggle=false}: CollapseProps) => {
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
                <h4>{title}</h4>
                <div className={s.toggle}></div>
            </div>
            <div className={s.contentContainer}>
                {content}
            </div>
        </div>
    )
}

export default CollapseChild