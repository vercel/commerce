import { memo } from 'react'
import s from './HeaderSubMenu.module.scss'

interface Props {
    className?: string
    children?: any
}

const HeaderSubMenu = memo(({ }: Props) => {
    return (
       <section className={s.headerSubMenu}>

       </section>
    )
})

export default HeaderSubMenu
