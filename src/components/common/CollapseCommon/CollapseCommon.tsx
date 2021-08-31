import s from './CollapseCommon.module.scss'
import { useState } from 'react'
import classNames from 'classnames'
import { IconPlus, IconMinus } from 'src/components/icons'
import CollapseContent from './CollapseContent/CollapseContent'

interface CollapseProps{
    title?: string,
    content: Array<string>,
    isToggle?: boolean,
}
const CollapseCommon = ({title, content, isToggle}: CollapseProps) => {
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
                {title}{isActive ? <IconMinus /> : <IconPlus />}
            </div>
            <div className={s.contentContainer}>
                {
                    content.map(item => <CollapseContent content={item} />)
                }
            </div>
        </div>
    )
}

export default CollapseCommon