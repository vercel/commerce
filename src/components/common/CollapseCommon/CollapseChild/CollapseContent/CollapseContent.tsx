import classNames from 'classnames'
import s from './CollapseContent.module.scss'

interface CollapseContentProps{
    content: string
}

const CollapseContent = ({content}: CollapseContentProps) => {
    return (
        <div className={s.content}>
            {content}
        </div>
    )
}

export default CollapseContent