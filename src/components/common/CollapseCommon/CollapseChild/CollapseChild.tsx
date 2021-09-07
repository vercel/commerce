import s from './CollapseChild.module.scss'
import { useState } from 'react'
import classNames from 'classnames'
import CollapseContent from './CollapseContent/CollapseContent'

interface CollapseProps{
    title?: string,
    content: Array<string>,
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
                <a>{title}</a>
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